"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
class DeclaracionGlobales extends Node_1.Node {
    /**
      TIPO id DECLARACION_ADENTRO_DE_METODOS_FUNCIONESP
     */
    constructor(type, ids, value, line, column) {
        super(type, line, column);
        this.identificadores = ids;
        this.value = value;
    }
    execute(table, tree) {
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>DeclaracionGlobal");
        // PRIMITIVOS Y ESAS ONDAS 
        if (this.identificadores.length == 1) {
            GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
            GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID (" + this.identificadores[0] + ")</li>\n");
            /*EMPAQUETANDO EL VALOR DE LA EXPRESION */
            if (this.value.line != undefined) {
                GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>VALOR EXPRESION\n");
                GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
                this.value.execute(table, tree);
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
            }
            this.type.toAts();
            GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        }
        else {
            GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
            GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>LISTA IDS");
            GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
            for (let x = 0; x < this.identificadores.length; x++) {
                GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID (" + this.identificadores[x] + ")</li>\n");
            }
            /*EMPAQUETANDO EL VALOR DE LA EXPRESION */
            if (this.value.line != undefined) {
                GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>VALOR EXPRESION\n");
                GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
                this.value.execute(table, tree);
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
            }
            // BLOQUE DEL TIPO 
            this.type.toAts();
            GraficaArbolAts_1.GraficaArbolAts.add("\n</ul></li>\n</ul>\n");
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        return null;
    }
}
exports.DeclaracionGlobales = DeclaracionGlobales;
