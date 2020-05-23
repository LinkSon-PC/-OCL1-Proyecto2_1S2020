"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Continue_1 = require("../Expresiones/Continue");
const Break_1 = require("../Expresiones/Break");
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
const Rep_1 = require("../REPORTES/Rep");
const Clase_1 = require("../REPORTES/Clase");
/**
 * @class Reasigna el valor de una variable existente
 */
class ClaseInstruccion extends Node_1.Node {
    /**
     * @constructor
     * @param identifier
     * @param value valor de la variable
     * @param line
     * @param column
     */
    constructor(identifier, value, line, column) {
        super(null, line, column);
        this.identifier = identifier;
        this.contenido = value;
        ;
    }
    execute(table, tree) {
        if (Rep_1.Rep.t1 == true || Rep_1.Rep.t2 == true) {
            Rep_1.Rep.addClase(new Clase_1.Clase(this.identifier));
            Rep_1.Rep.claseActual = Rep_1.Rep.getCLASE(this.identifier);
            console.log("static ACTUAL: " + Rep_1.Rep.claseActual);
        }
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>CLASE\n");
        // CIERRA DE UNA VEZ PORQUE NO AVANZA RECURSIVAMENTE 
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>");
        /* UNA CLASE POSEE SU PROPIO AMBITO DE VARIABLES POR ESO LE CREO UNA TABLE */
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID(" + this.identifier + ")</li>\n");
        const newtable = new Table_1.Table(table);
        for (let i = 0; i < this.contenido.length; i++) { // RECORRO CADA COSA DE MI CLASE 
            const res = this.contenido[i].execute(newtable, tree);
            if (res instanceof Continue_1.Continue) {
                console.log("break en continue =?? ");
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>");
                break;
            }
            else if (res instanceof Break_1.Break) {
                console.log("break en clase =?? ");
                GraficaArbolAts_1.GraficaArbolAts.add("</ul>");
                return;
            }
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>");
        return null;
    }
}
exports.ClaseInstruccion = ClaseInstruccion;
