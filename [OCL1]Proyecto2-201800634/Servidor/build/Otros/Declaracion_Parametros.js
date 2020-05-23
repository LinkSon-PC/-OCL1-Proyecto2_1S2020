"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
class Declaracion_Parametros extends Node_1.Node {
    /**
      TIPO id Declaracion_Parametros
     */
    constructor(type, identifier, value, line, column) {
        super(type, line, column);
        this.Lista_ids = identifier;
        this.value = value;
    }
    execute(table, tree) {
    }
}
exports.Declaracion_Parametros = Declaracion_Parametros;
