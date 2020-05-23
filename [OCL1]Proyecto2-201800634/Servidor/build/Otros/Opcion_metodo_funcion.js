"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Continue_1 = require("../Expresiones/Continue");
const Break_1 = require("../Expresiones/Break");
const Return_funcion_1 = require("../Instrucciones/Return_funcion");
const Return_metodo_1 = require("../Instrucciones/Return_metodo");
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
const Rep_1 = require("../REPORTES/Rep");
let CNodoError = require('../ManejoErrores/NodoError');
let CErrores = require('../ManejoErrores/Errores');
/**
 * @class Reasigna el valor de una variable existente
 */
class Opcion_metodo_funcion extends Node_1.Node {
    /**
     * RECIBE LISTA DE INTRUCCIONES
     * TIPO
     * ID
     * LISTA_PARAMETROS_CON_TIPO
     * FILA
     */
    constructor(listaParams, contenido, line) {
        super(null, line, null);
        this.contenido = contenido;
        this.listaParams = listaParams;
    }
    execute(table, tree) {
        /* UNA CLASE POSEE SU PROPIO AMBITO DE VARIABLES POR ESO LE CREO UNA TABLE */
        if (Rep_1.Rep.t1 == true || Rep_1.Rep.t2 == true) {
            Rep_1.Rep.addPARAMETROS(Rep_1.Rep.nombreMetodoActual, this.listaParams);
        }
        if (this.listaParams.length != 0) {
            GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>LISTA DE PARAMETROS\n");
            GraficaArbolAts_1.GraficaArbolAts.add("<ul>");
            for (let i = 0; i < this.listaParams.length; i++) {
                this.listaParams[i].execute(table, tree);
            }
            GraficaArbolAts_1.GraficaArbolAts.add("</ul>");
            GraficaArbolAts_1.GraficaArbolAts.add("</li>");
        }
        const newtable = new Table_1.Table(table);
        for (let i = 0; i < this.contenido.length; i++) {
            const res = this.contenido[i].execute(newtable, tree);
            if (res instanceof Break_1.Break) {
                console.log("ERROR  BREAK "); // ACA EN ESTE CASO PUEDE VENIR UN BREAK Y SE TOMA EN CUENTA QUE PUEDE SER ERROR 
                CErrores.Errores.add(new CNodoError.NodoError("Semantico", "BREAK fuera de un ciclo   " + "" + " Columna:" + res.column, res.line));
                return res;
            }
            else if (res instanceof Continue_1.Continue) {
                console.log("ERROR  CONTINUE "); // ACA EN ESTE CASO PUEDE VENIR UN BREAK Y SE TOMA EN CUENTA QUE PUEDE SER ERROR 
                CErrores.Errores.add(new CNodoError.NodoError("Semantico", "CONTINUE fuera de un ciclo   " + " Columna:" + res.column, res.line));
                return res;
            }
            else if (res instanceof Return_metodo_1.Return_metodo) {
                console.log("RETURN METODO op/metFun");
                return res;
            }
            else if (res instanceof Return_funcion_1.Return_funcion) {
                console.log("RETURN FUNCION  op/metFun");
                return res;
            }
        }
        return null;
    }
}
exports.Opcion_metodo_funcion = Opcion_metodo_funcion;
