"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GraficaArbolAts {
    constructor() {
    }
    static initHtml() {
        GraficaArbolAts.cadena += "" +
            "<ul>" +
            "<li data-jstree='{ \"opened\" : true }'>Raiz" +
            "<ul>" +
            "<li data-jstree='{ \"opened\" : true }'>LISTA Espresion" +
            "<ul>" +
            "<li data-jstree='{ \"opened\" : true }'>Expresion" +
            "<ul>" +
            "<li data-jstree='{ \"opened\" : true }'>Aritmetica" +
            "<ul>" +
            "<li>Primitivo</li>" +
            "<li>Primitivo</li>" +
            "</ul>" +
            "</li>" +
            "</ul>" +
            "</li>" +
            "</ul>" +
            "</li>" +
            "</ul>" +
            "<ul>" +
            "<li data-jstree='{ \"opened\" : true }'>Lista Instruccion" +
            "<ul>" +
            "<li data-jstree='{ \"opened\" : true }'>Instruccion" +
            "<ul>" +
            "<li data-jstree='{ \"opened\" : true }'>Imprimir" +
            "<ul>" +
            "<li data-jstree='{ \"opened\" : true }'>Lista Espresion" +
            "<ul>" +
            "<li data-jstree='{ \"opened\" : true }'>Expresion" +
            "<ul>" +
            "<li data-jstree='{ \"opened\" : true }'>Aritmetica" +
            "<ul>" +
            "<li>Primitivo</li>" +
            "<li>Primitivo</li>" +
            "</ul>" +
            "</li>" +
            "</ul>" +
            "</li>" +
            "</ul>" +
            "</li>" +
            "</ul>" +
            "</li>" +
            "</ul>" +
            "</li>" +
            "</ul>" +
            "</li>" +
            "</ul>" +
            "</li>" +
            "</ul>" + "\n";
    }
    static clear() {
        GraficaArbolAts.cadena = "";
    }
    static getCadena() {
        return GraficaArbolAts.cadena;
    }
    static add(cadena) {
        GraficaArbolAts.cadena += cadena;
    }
}
exports.GraficaArbolAts = GraficaArbolAts;
GraficaArbolAts.cadena = "";
