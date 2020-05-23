"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Return_metodo_1 = require("./Return_metodo");
let CNodoError = require('../ManejoErrores/NodoError');
let CErrores = require('../ManejoErrores/Errores');
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
const Reporte_1 = require("../Reportes/Reporte");
const Metodo_1 = require("../Reportes/Metodo");
class DeclaracionFuncion extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(type, identifier, OpcionMetodoFUncion, line, column) {
        super(type, line, column);
        this.identifier = identifier;
        this.value = OpcionMetodoFUncion;
    }
    execute(table, tree) {
        if (Reporte_1.Reporte.t1 == true || Reporte_1.Reporte.t2 == true) {
            Reporte_1.Reporte.nombreMetodoActual = this.identifier;
            Reporte_1.Reporte.addMetodo(Reporte_1.Reporte.claseActual.id, new Metodo_1.Metodo(this.identifier, this.type.toString()));
        }
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>DeclaracionFunciones\n");
        /*ACA HAY UN AMBITO NUEVO */
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
        if (res instanceof Return_metodo_1.Return_metodo) {
            console.log("ERROR RETURN DE METODO ADENTRO DE UNA FUNCION ");
            CErrores.Errores.add(new CNodoError.NodoError("Semantico", " RETURN DE METODO ADENTRO DE UNA FUNCION       " + " Columna:" + res.column, res.line));
            GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
            return res;
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        return null;
    }
}
exports.DeclaracionFuncion = DeclaracionFuncion;
