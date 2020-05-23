"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VariableCopia {
    /*
        Este reporte deberá mostrar un listado de las variables que se consideran copia, para
        considerar una variable como copia deberá pertenecer al mismo métodos y/o función y a la
        misma clase, así como el mismo tipo. Este reporte mostrará el tipo de la variable, nombre, la
        función y/o método al que pertenece, la clase a la que pertenece.
        */
    constructor(tipo, id, nMetodo, nClase) {
        this.id = id;
        this.tipo = tipo;
        this.nameClase = nClase;
        this.nombreMetodo = nMetodo;
    }
}
exports.VariableCopia = VariableCopia;
