"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
/**
 * @class
 */
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
class Llamada_metodo extends Node_1.Node {
    /**
     * @constructor
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column
     */
    constructor(id, List, line, column) {
        super(null, line, column);
        this.Parametros = List;
        this.id = id;
    }
    execute(table, tree) {
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>LLamada_metodo (" + this.id + ")\n");
        if (this.Parametros.length != 0) {
            GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
            GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>LISTA_PARAMETROS\n");
            GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
            for (let i = 0; i < this.Parametros.length; i++) {
                this.Parametros[i].execute(table, tree);
            }
            GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
            GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
            GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        return null;
    }
}
exports.Llamada_metodo = Llamada_metodo;
