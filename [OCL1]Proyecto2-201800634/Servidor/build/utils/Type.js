"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GraficaArbolAts_1 = require("../ManejoErrores/GraficaArbolAts");
var types;
(function (types) {
    types[types["INT"] = 0] = "INT";
    types[types["STRING"] = 1] = "STRING";
    types[types["BOOLEAN"] = 2] = "BOOLEAN";
    types[types["VOID"] = 3] = "VOID";
    types[types["DOUBLE"] = 4] = "DOUBLE";
    types[types["CHAR"] = 5] = "CHAR";
})(types = exports.types || (exports.types = {}));
/**
 *
 * @class Permite llevar el control de los tipos del lenguaje
 */
class Type {
    /**
     *
     * @constructor Crea un nuevo tipo con el tipo primitivo indicado en el enum
     * @param type Tipo seleccionado para la variable o funcion
     *
     */
    constructor(type) {
        this.type = type;
        this.typeString = this.toString();
    }
    toString() {
        if (this.type === types.BOOLEAN) {
            return "boolean";
        }
        else if (this.type === types.INT) {
            return "int";
        }
        else if (this.type === types.STRING) {
            return "string";
        }
        else if (this.type === types.DOUBLE) {
            return "double";
        }
        else if (this.type == types.VOID) {
            return "void";
        }
        else if (this.type == types.CHAR) {
            return "char";
        }
    }
    toAts() {
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>TIPO\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        if (this.type === types.BOOLEAN) {
            GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>boolean</li>\n");
        }
        else if (this.type === types.INT) {
            GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>int</li>\n");
        }
        else if (this.type === types.STRING) {
            GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>String</li>\n");
        }
        else if (this.type === types.DOUBLE) {
            GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>double</li>\n");
        }
        else if (this.type == types.VOID) {
            GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>void</li>\n");
        }
        else if (this.type == types.CHAR) {
            GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>char</li>\n");
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>");
    }
}
exports.Type = Type;
