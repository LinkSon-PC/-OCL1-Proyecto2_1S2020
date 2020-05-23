"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Type_1 = require("../utils/Type");
const Continue_1 = require("../Expresiones/Continue");
const Break_1 = require("../Expresiones/Break");
const Primitive_1 = require("../Expresiones/Primitive");
const Type_2 = require("../utils/Type");
const Return_funcion_1 = require("./Return_funcion");
const Return_metodo_1 = require("./Return_metodo");
/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
class If extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condition Condicion que debe ser tipo boolean
     * @param IfList Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param ElseList Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(condition, IfList, ElseList, line, column) {
        super(null, line, column);
        this.condition = condition;
        this.IfList = IfList;
        this.ElseList = ElseList;
    }
    execute(table, tree) {
        const newtable = new Table_1.Table(table);
        let result;
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>SENTENCIA_IF (linea:" + this.line + ")\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>CONDICION\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        result = this.condition.execute(newtable, tree);
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        result = new Primitive_1.Primitive(new Type_2.Type(Type_1.types.BOOLEAN), true, null, null); // SIEMPRE SE EJECUTA 
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>sentencia_if (linea:" + this.line + ")\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        for (let i = 0; i < this.IfList.length; i++) {
            const res = this.IfList[i].execute(newtable, tree);
            if (res instanceof Continue_1.Continue || res instanceof Break_1.Break || res instanceof Return_funcion_1.Return_funcion || res instanceof Return_metodo_1.Return_metodo) {
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
                return res;
            }
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        for (let i = 0; i < this.ElseList.length; i++) {
            GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Sentencia_Else (linea:" + this.line + ")\n");
            GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
            const res = this.ElseList[i].execute(newtable, tree);
            if (res instanceof Continue_1.Continue || res instanceof Break_1.Break || res instanceof Return_funcion_1.Return_funcion || res instanceof Return_metodo_1.Return_metodo) {
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
                return res;
            }
            GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
            GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        return null;
    }
}
exports.If = If;
