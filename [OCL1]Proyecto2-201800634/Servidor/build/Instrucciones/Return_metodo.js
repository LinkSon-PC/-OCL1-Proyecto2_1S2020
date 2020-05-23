"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
const Rep_1 = require("../REPORTES/Rep");
/**
 * @class RETURN PARA LAS METODOS
 */
class Return_metodo extends Node_1.Node {
    /**
     * @constructor Retorna el objeto continue creado
     * @param line Linea del continue
     * @param column Columna del continue
     */
    constructor(nombre, line, column) {
        super(null, line, column);
        this.nombre = nombre;
    }
    execute(table, tree) {
        if (Rep_1.Rep.t1 == true || Rep_1.Rep.t2 == true) {
            Rep_1.Rep.addTIPO_RETORNO(Rep_1.Rep.nombreMetodoActual, "retorno de Metodo (return;)");
        }
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Return_Metodo</li>\n");
        return this;
    }
}
exports.Return_metodo = Return_metodo;
