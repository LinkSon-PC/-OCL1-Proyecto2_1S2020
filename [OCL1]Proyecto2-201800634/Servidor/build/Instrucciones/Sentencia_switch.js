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
class Sentencia_switch extends Node_1.Node {
    constructor(exp, cases, line, column) {
        super(null, line, column);
        this.EXPRESION = exp;
        this.cases = cases;
    }
    execute(table, tree) {
        const newtable = new Table_1.Table(table);
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>SENTENCIA_SWITCH \n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        // AHORA LA CARPETA EXPRESSION 
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Expresion\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>");
        this.EXPRESION.execute(table, tree);
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>");
        let res;
        if (this.cases.line != undefined) {
            res = this.cases.execute(newtable, tree);
            if (res instanceof Break_1.Break) {
                // no hay clavo sale y cierra hasta abajo 
            }
            else if (res instanceof Continue_1.Continue) {
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
                return res;
            }
            else if (res instanceof Return_metodo_1.Return_metodo) {
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
                return res;
            }
            else if (res instanceof Return_funcion_1.Return_funcion) {
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
                return res;
            }
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        return null;
    }
}
exports.Sentencia_switch = Sentencia_switch;
