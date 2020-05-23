"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Clase {
    constructor(nom) {
        this.metodos = [];
        this.id = nom;
    }
    addMetodo(m) {
        this.metodos.push(m);
    }
    printMetodos() {
        console.log("------------- metodos ------------");
        for (let i = 0; i < this.metodos.length; i++) {
            if (this.metodos[i].id != undefined) {
                console.log(this.metodos[i]);
            }
        }
        console.log("----------------------------------");
    }
    getMetodos() {
        return this.metodos;
    }
    getMETODO(id) {
        for (let i = 0; i < this.metodos.length; i++) {
            if (this.metodos[i].id != undefined) {
                if (this.metodos[i].id == id) {
                    return this.metodos[i];
                }
            }
        }
    }
}
exports.Clase = Clase;
