"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodoError {
    constructor(tipo, descripcion, linea) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = (linea);
    }
    gettipo() {
        return this.tipo;
    }
    getdescripcion() {
        return this.descripcion;
    }
    getlinea() {
        return this.linea;
    }
    execute(tabla, tree) {
        return null;
    }
}
exports.NodoError = NodoError;
