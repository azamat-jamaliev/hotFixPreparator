package main

import (
	"encoding/json"
	"fmt"
	"hotFixPreparator/backend/components/archivarius"
	"log"
	"net/http"
	"os"
	"path"
	"time"
)

func main() {
	fmt.Print("Started")
	f, err := os.OpenFile(path.Join("./logs/server.log"), os.O_RDWR|os.O_CREATE, 0666)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	log.SetOutput(f)
	log.SetFlags(log.LstdFlags | log.Lshortfile)

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
	http.ListenAndServe(":3000", nil)

	// Routing
	// app.Get("/api/tasks", controllers.FetchTasks)
	// app.Post("/api/tasks", controllers.CreateTask)
	// app.Get("/api/tasks/:id", controllers.FetchTask)
	// app.Delete("/api/tasks/:id", controllers.DeleteTask)

}
