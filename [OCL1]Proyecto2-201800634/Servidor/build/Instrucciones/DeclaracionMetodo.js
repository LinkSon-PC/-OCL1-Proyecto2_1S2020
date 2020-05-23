"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Type_1 = require("../utils/Type");
const Return_funcion_1 = require("./Return_funcion");
let CNodoError = require('../ManejoErrores/NodoError');
let CErrores = require('../ManejoErrores/Errores');
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
const Rep_1 = require("../REPORTES/Rep");
const Metodo_1 = require("../REPORTES/Metodo");
class DeclaracionMetodo extends Node_1.Node {
    constructor(type, identifier, value, line, column) {
        super(new Type_1.Type(Type_1.types.VOID), line, column);
        this.identifier = identifier;
        this.value = value;
    }
    execute(table, tree) {
        if (Rep_1.Rep.t1 == true || Rep_1.Rep.t2 == true) {
            Rep_1.Rep.nombreMetodoActual = this.identifier;
            Rep_1.Rep.addMetodo(Rep_1.Rep.claseActual.id, new Metodo_1.Metodo(this.identifier, this.type.toString()));
        }
        console.log(this.type.toString());
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>DeclaracionMetodos\n");
        let res;
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID(" + this.identifier + ")</li>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>TIPO(" + this.type.toString() + ")</li>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>INSTRUCCIONES\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        res = this.value.execute(table, tree);
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        if (res instanceof Return_funcion_1.Return_funcion) {
            console.log("ERROR RETURN DE FUNCION ADENTRO DE UN METODO ");
            CErrores.Errores.add(new CNodoError.NodoError("Semantico", " RETURN DE FUNCION ADENTRO DE UN METODO    " + " Columna:" + res.column, res.line));
            GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
            return res;
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        return null;
    }
}
exports.DeclaracionMetodo = DeclaracionMetodo;
