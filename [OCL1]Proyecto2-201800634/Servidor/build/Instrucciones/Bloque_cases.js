"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Break_1 = require("../Expresiones/Break");
const Continue_1 = require("../Expresiones/Continue");
const Return_metodo_1 = require("./Return_metodo");
const Return_funcion_1 = require("./Return_funcion");
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
let CNodoError = require('../ManejoErrores/NodoError');
let CErrores = require('../ManejoErrores/Errores');
class Bloque_cases extends Node_1.Node {
    constructor(casos, defa) {
        super(null, 0, 0);
        this.lista_cases = [];
        casos.map((m) => {
            this.lista_cases.push(m);
        });
        this.lista_cases.push(defa);
    }
    execute(table, tree) {
        console.log("ejecutando sentencias de un case en BLOQUE_CASES   son: " + this.lista_cases.length);
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>BLOQUE_CASES\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        const newtable = new Table_1.Table(table);
        for (let i = 0; i < this.lista_cases.length; i++) {
            if (this.lista_cases[i].line != undefined) {
                const res = this.lista_cases[i].execute(newtable, tree);
                if (res instanceof Break_1.Break) {
                    // se acepta , no hay clavo 
                    console.log("un break se acepta adentro de un case :) ");
                }
                else if (res instanceof Continue_1.Continue) {
                    console.log("viene un continue sera que esta adentro de un ciclo ?");
                    GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                    GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
                    return res;
                }
                else if (res instanceof Return_metodo_1.Return_metodo) {
                    console.log("RETURN METODO");
                    GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                    GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
                    return res;
                }
                else if (res instanceof Return_funcion_1.Return_funcion) {
                    console.log("RETURN FUNCION");
                    GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                    GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
                    return res;
                }
            }
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        return null;
    }
}
exports.Bloque_cases = Bloque_cases;
