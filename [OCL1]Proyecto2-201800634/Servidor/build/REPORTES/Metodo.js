"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Metodo {
    /*
    mostrará el tipo de retorno del método y/o función, nombre del mismo, listado de sus
    parámetros con tipo y nombre, nombre de la clase al que pertenece.
    */
    constructor(id, tipo) {
        this.listaParametros = []; // mismo tipo y el mismo orden los parametros 
        this.listVariables = [];
        this.id = id;
        this.tipo = tipo;
        this.tipoDeRetorno = "no hay";
    }
    ParametrostoStringVERIFICACION() {
        let parametros = "";
        if (this.listaParametros.length != 0) {
            for (let i = 0; i < this.listaParametros.length; i++) {
                // solo necesito los tipo con eso vere el orden y la cantidad si es la misma pues ok es copia 
                parametros += this.listaParametros[i].type.toString() + ",";
            }
        }
        return parametros;
    }
    toReportCopiaFuncion() {
        let parametros = "";
        if (this.listaParametros.length != 0) {
            for (let i = 0; i < this.listaParametros.length; i++) {
                // solo necesito los tipo con eso vere el orden y la cantidad si es la misma pues ok es copia 
                parametros += this.listaParametros[i].type.toString() + " ID " + "\n";
            }
        }
        return parametros;
    }
}
exports.Metodo = Metodo;
