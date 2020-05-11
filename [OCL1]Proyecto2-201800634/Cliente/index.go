package main

import(
	"fmt"
	"html/template"
	"log"
	"net/http"
)

func main(){
	println("HELLOW WORD")
	http.ListenAndServe(":3000",nil)
}