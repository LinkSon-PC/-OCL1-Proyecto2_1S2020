"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Continue_1 = require("../Expresiones/Continue");
const Break_1 = require("../Expresiones/Break");
const Return_funcion_1 = require("./Return_funcion");
const Return_metodo_1 = require("./Return_metodo");
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
/**
 * @class
 */
class For extends Node_1.Node {
    /**
     * @constructor
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column
     */
    constructor(Dec_for, condition, Incre_decre, List, line, column) {
        super(null, line, column);
        this.Dec_for = Dec_for;
        this.Incre_decre = Incre_decre;
        this.condition = condition;
        this.List = List;
    }
    execute(table, tree) {
        const newtable = new Table_1.Table(table);
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>SENTENCIA_FOR \n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        this.Dec_for.execute(table, tree);
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>CONDICION\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        this.condition.execute(newtable, tree);
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        this.Incre_decre.execute(table, tree);
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        /* ABRO EL AMBITO DE INSTRUCCIONES */
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>BLOQUE_INSTRUCCIONES\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        for (let i = 0; i < this.List.length; i++) {
            const res = this.List[i].execute(newtable, tree);
            if (res instanceof Continue_1.Continue) {
                break; // frena el for y pues sale y abajo se cierra su etiqueta 
            }
            else if (res instanceof Break_1.Break) {
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
                return;
            }
            if (res instanceof Return_funcion_1.Return_funcion || res instanceof Return_metodo_1.Return_metodo) {
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
                return res;
            }
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        /* CIERRO EL AMBITO DE INSTRUCCIONES */
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        return null;
    }
}
exports.For = For;
