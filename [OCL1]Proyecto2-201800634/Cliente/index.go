package main

import (
	"fmt"
	"html/template"
	"net/http"
)

func main() {
	//ROUTS
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/mostrar", homeMostrar)

	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css/"))))
	http.Handle("/codemirror/", http.StripPrefix("/codemirror/", http.FileServer(http.Dir("codemirror/"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js/"))))
	http.Handle("/website/", http.StripPrefix("/website/", http.FileServer(http.Dir("website/"))))
	http.Handle("/jstree/", http.StripPrefix("/jstree/", http.FileServer(http.Dir("jstree/"))))

	fmt.Printf("Servidor escuchando en: http://localhost:3000/")
	http.ListenAndServe(":3000", nil)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func homeMostrar(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hellow Mostrar"))
}
