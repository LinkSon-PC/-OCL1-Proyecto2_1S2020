"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
/**
 * @class Reasigna el valor de una variable existente
 */
class Importe extends Node_1.Node {
    /**
     * @constructor
     * @param identifier
     * @param value valor de la variable
     * @param line
     * @param column
     */
    constructor(identifier, value, line, column) {
        super(null, line, column);
        this.identifier = identifier;
        this.value = null;
        this.tipoInstruccion = "IMPORT";
    }
    execute(table, tree) {
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>IMPORT\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>");
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID(" + this.identifier + ")\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>"); // CIERRA DE UNA VEZ PORQUE NO AVANZA RECURSIVAMENTE 
        return null;
    }
}
exports.Importe = Importe;
