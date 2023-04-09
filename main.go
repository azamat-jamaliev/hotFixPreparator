package main

import (
	"encoding/json"
	"fmt"
	"hotFixPreparator/backend/components/archivarius"
	"hotFixPreparator/backend/components/sessionManager"
	"log"
	"net/http"
	"os"
	"path"
	"time"
)

var manager *sessionManager.Manager

const LISTEN_PORT = 3000

func main() {
	fmt.Printf("Started: http://localhost:%d/\n", LISTEN_PORT)
	f, err := os.OpenFile(path.Join("./logs/server.log"), os.O_RDWR|os.O_CREATE, 0666)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	log.SetOutput(f)
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	manager, err = sessionManager.NewManager()
	if err != nil {
		log.Panicln("[ERROR] cannot create sessionManager. Error=", err)
	}

	http.HandleFunc("/api/session", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("[DEBUG] /api/session received request: [%v]", r)
		manager.HandleHttpSession(w, r)
	})
	// http.Handle("/", )
	http.HandleFunc("/api/test/hf", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		cds := []archivarius.CD{
			{
				Name: "CD01",
				Content: []archivarius.HF{
					{
						Name:        "HF01",
						ReleaseDate: time.Now(),
						Content:     []string{"firstfile.class", "secondfile.class"},
					},
					{
						Name:        "HF02",
						ReleaseDate: time.Now(),
						Content:     []string{"hf02_firstfile.class", "hf02_secondfile.class"},
					}},
			},
			{
				Name: "CD02",
				Content: []archivarius.HF{
					{
						Name:        "HF03",
						ReleaseDate: time.Now(),
						Content:     []string{"CD02_firstfile.class", "CD02_secondfile.class"},
					},
					{
						Name:        "HF04",
						ReleaseDate: time.Now(),
						Content:     []string{"CD02_hf04_firstfile.class", "CD02_hf04_secondfile.class"},
					}},
			}}
		json.NewEncoder(w).Encode(cds)
	})
	http.Handle("/", http.FileServer(http.Dir("./public/")))
	http.ListenAndServe(fmt.Sprintf(":%d", LISTEN_PORT), nil)

	// Routing
	// app.Get("/api/tasks", controllers.FetchTasks)
	// app.Post("/api/tasks", controllers.CreateTask)
	// app.Get("/api/tasks/:id", controllers.FetchTask)
	// app.Delete("/api/tasks/:id", controllers.DeleteTask)

}
