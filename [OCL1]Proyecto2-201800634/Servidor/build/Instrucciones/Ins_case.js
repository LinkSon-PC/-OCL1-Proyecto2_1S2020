"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Continue_1 = require("../Expresiones/Continue");
const Break_1 = require("../Expresiones/Break");
const Return_metodo_1 = require("./Return_metodo");
const Return_funcion_1 = require("./Return_funcion");
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
let CNodoError = require('../ManejoErrores/NodoError');
let CErrores = require('../ManejoErrores/Errores');
class Ins_case extends Node_1.Node {
    constructor(n, ins, ins_break, line, column) {
        super(null, line, column);
        this.EXPRESION = n;
        this.INSTRUCCIONES = ins; /* GENERA UN VECTOR */
        this.Ins_break = ins_break;
    }
    execute(table, tree) {
        console.log(" ejecutando un caso , el cual tiene instrucciones adentro  ");
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>case\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        const newtable = new Table_1.Table(table);
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Instrucciones\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        for (let i = 0; i < this.INSTRUCCIONES.length; i++) {
            const res = this.INSTRUCCIONES[i].execute(newtable, tree);
            if (res instanceof Break_1.Break) {
                // se acepta 
                console.log("un break se acepta adentro de un case :) ");
            }
            else if (res instanceof Continue_1.Continue) {
                return res;
            }
            else if (res instanceof Return_metodo_1.Return_metodo) {
                console.log("RETURN METODO"); // NO PUEDO DETERMINAR AUN SI ES ERROR O NO ASI QUE LO DEVUELVO 
                return res;
            }
            else if (res instanceof Return_funcion_1.Return_funcion) {
                console.log("RETURN FUNCION");
                return res;
            }
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        console.log("OK todo ");
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        return null;
    }
}
exports.Ins_case = Ins_case;
