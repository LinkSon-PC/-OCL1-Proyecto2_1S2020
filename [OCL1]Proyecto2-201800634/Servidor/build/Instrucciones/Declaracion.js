"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
class Declaracion extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(type, identifier, value, line, column) {
        super(type, line, column);
        this.identifier = identifier;
        this.value = value;
    }
    execute(table, tree) {
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>DECLARACION\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        this.type.toAts();
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID (" + this.identifier + ")</li>\n");
        if (this.value.line != undefined) {
            GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>VALOR_Expresion\n");
            GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
            this.value.execute(table, tree);
            GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
            GraficaArbolAts_1.GraficaArbolAts.add("</li>");
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>");
        return null;
    }
}
exports.Declaracion = Declaracion;
