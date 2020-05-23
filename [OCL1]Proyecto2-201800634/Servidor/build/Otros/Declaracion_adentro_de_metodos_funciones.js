"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
const Rep_1 = require("../REPORTES/Rep");
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
class Declaracion_adentro_de_metodos_funciones extends Node_1.Node {
    /**
      TIPO id DECLARACION_ADENTRO_DE_METODOS_FUNCIONESP
     */
    constructor(type, identifier, value, line, column) {
        super(type, line, column);
        this.Lista_ids = identifier;
        this.value = value;
    }
    execute(table, tree) {
        if (Rep_1.Rep.t1 == true || Rep_1.Rep.t2 == true) {
            if (this.Lista_ids.length != 0) {
                for (let i = 0; i < this.Lista_ids.length; i++) {
                    Rep_1.Rep.addVariable(Rep_1.Rep.nombreMetodoActual, this.Lista_ids[i], this.type.toString());
                }
            } //if2
        }
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Declaracion_adentro_de_Metodo/Funcion");
        if (this.Lista_ids.length == 1) {
            GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
            GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID (" + this.Lista_ids[0] + ")</li>\n");
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
            for (let x = 0; x < this.Lista_ids.length; x++) {
                GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID (" + this.Lista_ids[x] + ")</li>\n");
            }
            /*EMPAQUETANDO EL VALOR DE LA EXPRESION */
            if (this.value.line != undefined) {
                GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>VALOR EXPRESION\n");
                GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
                this.value.execute(table, tree);
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
            }
            this.type.toAts();
            GraficaArbolAts_1.GraficaArbolAts.add("\n</ul></li>\n</ul>\n");
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        return null;
    }
}
exports.Declaracion_adentro_de_metodos_funciones = Declaracion_adentro_de_metodos_funciones;
