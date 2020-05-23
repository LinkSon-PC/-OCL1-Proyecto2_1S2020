"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
/**
 * @class RETURN PARA LAS FUNCIONES
 */
class R_Funcion extends Node_1.Node {
    /**
     * @constructor Retorna el objeto continue creado
     * @param line Linea del continue
     * @param column Columna del continue
     */
    constructor(nombre, exp, line, column) {
        super(null, line, column);
        this.nombre = nombre;
        this.expresion = exp;
    }
    execute(table, tree) {
        /*
         return this;
         */
    }
}
exports.R_Funcion = R_Funcion;
