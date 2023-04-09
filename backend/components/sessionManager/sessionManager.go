package sessionManager

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"
	"strings"
	"sync"
	"time"
)

var userSessions map[string]UserSession

type Manager struct {
	headerName   string     //private cookiename
	lock         sync.Mutex // protects session
	lifeDuration time.Duration
}

func NewManager() (*Manager, error) {
	userSessions = make(map[string]UserSession)
	return &Manager{headerName: "Aasessionid", lifeDuration: 15 * time.Second}, nil
}

func (manager *Manager) newSessionId() (string, error) {
	out, err := exec.Command("uuidgen").Output()
	if err != nil {
		log.Fatal(err)
	}
	newId := strings.TrimSpace(string(out))
	log.Printf("[DEBUG] new session ID=[%s]", newId)
	return newId, err
}
func (m *Manager) getUserSession(sessionId string) (*UserSession, error) {
	var err error
	session, hasKey := userSessions[sessionId]
	if !hasKey {
		str := ""
		for sesKey, ses := range userSessions {
			str = fmt.Sprintf("%s userSessions[%s]=[%v]\n", str, sesKey, ses)
		}
		err = fmt.Errorf("[ERROR] cannot find sessionId=[%s]\nDETAILS:%s", sessionId, str)
	} else if time.Now().After(session.lifeTime) {
		err = fmt.Errorf("[ERROR] the sessionId=[%s] was expired lifeTime=[%v]", sessionId, session.lifeTime)
	}
	return &session, err
}
func (m *Manager) newUserSession() (*UserSession, error) {
	sessionId, err := m.newSessionId()
	if err == nil {
		session := UserSession{lifeTime: time.Now().Add(m.lifeDuration), sessionId: sessionId}
		userSessions[sessionId] = session
		return &session, err
	}
	return nil, err
}
func (m *Manager) prolongUserSession(session *UserSession) {
	session.lifeTime = time.Now().Add(m.lifeDuration)
	userSessions[session.sessionId] = *session
}
func (m *Manager) HandleHttpSession(w http.ResponseWriter, r *http.Request) {
	for sesKey, ses := range userSessions {
		if time.Now().After(ses.lifeTime) {
			delete(userSessions, sesKey)
		}
	}

	var session *UserSession
	var err error
	m.lock.Lock()
	defer m.lock.Unlock()
	log.Printf("[DEBUG] r.Header=[%v]\n", r.Header)
	if sessionId, hasSession := r.Header[m.headerName]; hasSession {
		sesId := strings.TrimSpace(sessionId[0])
		log.Printf("[DEBUG] sessionId[0]=[%s]\n", sesId)
		session, err = m.getUserSession(sesId)
		if err != nil {
			log.Println(err)
			session, err = m.newUserSession()
		} else {
			m.prolongUserSession(session)
		}
	} else {
		session, err = m.newUserSession()
	}
	if err != nil {
		log.Println("[ERROR] ", err)
	}
	w.Header().Add(m.headerName, session.sessionId)
}
