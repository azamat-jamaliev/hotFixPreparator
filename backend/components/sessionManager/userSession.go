package sessionManager

import "time"

type UserSession struct {
	lifeTime  time.Time
	sessionId string
}
