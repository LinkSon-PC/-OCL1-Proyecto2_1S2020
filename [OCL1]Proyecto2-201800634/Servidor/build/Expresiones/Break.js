"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */
class Break extends Node_1.Node {
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     */
    constructor(line, column) {
        console.log("linea break" + line);
        super(null, line, column);
    }
    execute(table, tree) {
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Sentencia_break</li>\n");
        return this;
    }
}
exports.Break = Break;
