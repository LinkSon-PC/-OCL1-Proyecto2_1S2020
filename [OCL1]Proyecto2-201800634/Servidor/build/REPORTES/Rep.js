"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClaseCopia_1 = require("./ClaseCopia");
const FuncionCopia_1 = require("./FuncionCopia");
const Variable_1 = require("./Variable");
const VariableCopia_1 = require("./VariableCopia");
class Rep {
    constructor() {
    }
    static getHTML() {
        let definitiva = "";
        definitiva += this.getCopiasClases();
        definitiva += "\n\n\n\n\n";
        definitiva += this.getCopiasFunciones();
        definitiva += "\n\n\n\n\n";
        definitiva += this.getCopiasVariables();
        definitiva += "\n\n\n\n\n";
        return definitiva;
    }
    static addClase(c) {
        if (Rep.t1 == true) {
            Rep.ListaClases1.push(c);
        }
        if (Rep.t2 == true) {
            Rep.ListaClases2.push(c);
        }
    }
    static addMetodo(key, m) {
        if (Rep.t1 == true) {
            for (let i = 0; i < Rep.ListaClases1.length; i++) {
                if (key == Rep.ListaClases1[i].id) {
                    Rep.ListaClases1[i].addMetodo(m);
                    break;
                }
            }
        }
        if (Rep.t2 == true) {
            for (let i = 0; i < Rep.ListaClases2.length; i++) {
                if (key == Rep.ListaClases2[i].id) {
                    Rep.ListaClases2[i].addMetodo(m);
                    break;
                }
            }
        }
    }
    static addVariable(nombreMetodo, idVar, tipo) {
        if (Rep.t1 == true) {
            let metodo = Rep.claseActual.getMETODO(nombreMetodo); // ya se en que clase estoy 
            metodo.listVariables.push(new Variable_1.Variable(idVar, tipo));
        }
        if (Rep.t2 == true) {
            let metodo = Rep.claseActual.getMETODO(nombreMetodo);
            metodo.listVariables.push(new Variable_1.Variable(idVar, tipo));
        }
    }
    static getCLASE(id) {
        if (Rep.t1 == true) {
            for (let i = 0; i < Rep.ListaClases1.length; i++) {
                if (id == Rep.ListaClases1[i].id) {
                    return Rep.ListaClases1[i];
                }
            }
        }
        if (Rep.t2 == true) {
            for (let i = 0; i < Rep.ListaClases2.length; i++) {
                if (id == Rep.ListaClases2[i].id) {
                    return Rep.ListaClases2[i];
                }
            }
        }
    } // fin metodo 
    static addPARAMETROS(nombreMetodo, listaParametros) {
        if (Rep.t1 == true) {
            let metodo = Rep.claseActual.getMETODO(nombreMetodo);
            metodo.listaParametros = listaParametros;
        }
        if (Rep.t2 == true) {
            let metodo = Rep.claseActual.getMETODO(nombreMetodo);
            metodo.listaParametros = listaParametros;
        }
    } // fin metodo 
    static addTIPO_RETORNO(nombreMetodo, tipo) {
        if (Rep.t1 == true) {
            let metodo = Rep.claseActual.getMETODO(nombreMetodo);
            metodo.tipoDeRetorno = tipo;
        }
        if (Rep.t2 == true) {
            let metodo = Rep.claseActual.getMETODO(nombreMetodo);
            metodo.tipoDeRetorno = tipo;
        }
    } // fin metodo
    static clear() {
        // CUIADO CON LOS PUNTEROS  QUE SE PUEDE APUNTAR A LA MISMA LISTA 
        let vacio = [];
        Rep.ListaClases1 = vacio;
        let vacio2 = [];
        Rep.ListaClases2 = vacio2;
        this.t1 = false;
        this.t2 = false;
        let vacio3 = [];
        Rep.ListaClasesCopia = vacio3;
        let vacio4 = [];
        Rep.ListaFuncionesCopia = vacio4;
        Rep.nombreMetodoActual = "";
        let vacio5 = [];
        Rep.ListaVariablesCopia = vacio5;
    }
    static get2() {
        return Rep.ListaClases2;
    }
    static get1() {
        return Rep.ListaClases1;
    }
    static printClases1() {
        console.log("************ARCHIVO 1****************");
        for (let i = 0; i < Rep.ListaClases1.length; i++) {
            console.log("||| CLASE " + Rep.ListaClases1[i].id + "|||");
            Rep.ListaClases1[i].printMetodos();
        }
        console.log("*************************************");
    }
    static printClases2() {
        console.log("************ARCHIVO 2****************");
        for (let i = 0; i < Rep.ListaClases2.length; i++) {
            console.log("||| CLASE " + Rep.ListaClases2[i].id + "|||");
            Rep.ListaClases2[i].printMetodos();
        }
        console.log("*************************************");
    }
    static DeterminarCopiaClases() {
        if (this.ListaClases1.length != 0 && this.ListaClases2.length != 0) {
            for (let i = 0; i < this.ListaClases1.length; i++) {
                // cada clase del  1 la comparo con la clase  del 2 
                for (let j = 0; j < this.ListaClases2.length; j++) {
                    if (this.ListaClases1[i].id == this.ListaClases2[j].id) {
                        /* COINCIDE EL NOMBRE SOSPECHOSO ENTONCES MIRAMOS EL NOMBRE DE LOS METODOS SI COINCIDEN */
                        console.log("sospechoso el nombre es igual : " + this.ListaClases1[i].id);
                        // ESTOY EN LA MISMA CLASE ENTONCES DEBO DE BUSCAR SI HAY UNA MISMA FUNCION 
                        this.buscarFucionesMetodosCopia(this.ListaClases1[i].getMetodos(), this.ListaClases2[j].getMetodos(), this.ListaClases1[i].id);
                        let res = this.comparaMetodos(this.ListaClases1[i].getMetodos(), this.ListaClases2[j].getMetodos()); // para clases copia
                        if (res[0] == true) { // si es copia
                            console.log("encontro una clase copia");
                            this.toCopiaClase(this.ListaClases1[i].id, res[1]); // metodo que agrega a una lista 
                        }
                    }
                }
            }
        }
        else {
            console.log("no hay elementos :( ");
        }
    }
    static comparaMetodos(metodos1, metodos2) {
        let res = [];
        let cont = 0;
        if (metodos1.length == 0 && metodos2.length == 0) {
            // si es copia porque solo tienen los nombres 
            res.push(true); // si es copia 
            res.push(0); // metodos repetidos 0 
            return res;
        }
        if (metodos1.length != metodos2.length) {
            // si no tienen la misma cantidad de metodos se descarta de una vez 
            console.log("descartado por no tener la misma cantidad de metodos/funciones");
            res.push(false);
            res.push(0);
        }
        for (let i = 0; i < metodos1.length; i++) {
            for (let j = 0; j < metodos2.length; j++) {
                // tengo que ver que los nombres sean los mismos 
                if (metodos1[i].id == metodos2[j].id) {
                    cont++;
                }
            }
        }
        // tiene que coincidir la longitud del vector con el contador para determinar que es copia 
        if (cont == metodos1.length) {
            res.push(true);
            res.push(cont);
            return res;
        }
        else {
            res.push(false);
            res.push(cont);
            return res;
        }
    }
    static toCopiaClase(nombre, cantidad) {
        Rep.ListaClasesCopia.push(new ClaseCopia_1.ClaseCopia(nombre, cantidad));
    }
    static getCopiasClases() {
        var cad = "";
        if (this.ListaClasesCopia.length != 0) {
            cad += "<body class=\"MIfondo\">\n";
            cad += "<div align=\"center\"  class=\"MIfondo\"> \n";
            cad += "<h1 class = \"tituloTb\">REPORTE DE CLASES COPIA </h1>\n";
            cad += "<table border=\"2\" align=\"center\" class=\"tabl\">\n";
            cad += "<tr>\n";
            cad += "<th>#</th><th> NOMBRE DE LA CLASE </th><th> CANTIDAD DE METODOS</th>\n";
            cad += "</tr>\n";
            for (var i = 0; i < this.ListaClasesCopia.length; i++) {
                cad += "<tr>\n";
                cad += "<td>" + (i + 1) + "</td><td>" +
                    "  " + this.ListaClasesCopia[i].id + "  </td><td>" +
                    this.ListaClasesCopia[i].cantidaMetodos + "</td>\n";
                cad += "</tr>\n";
            }
            cad += "</table>\n";
            cad += "</div>\n";
            cad += "</body>\n";
            cad += "<br><br><br><br><br>";
        }
        else {
            console.log("no hay clases copia");
        }
        return cad;
    }
    static getCopiasFunciones() {
        /*
        mostrará el tipo de retorno del método y/o función, nombre del mismo, listado de sus
       parámetros con tipo y nombre, nombre de la clase al que pertenece.
        
        */
        var cad = "";
        if (this.ListaFuncionesCopia.length != 0) {
            cad += "<body class=\"MIfondo\">\n";
            cad += "<div align=\"center\"  class=\"MIfondo\"> \n";
            cad += "<h1 class = \"tituloTb\">REPORTE DE FUNCIONES  COPIA </h1>\n";
            cad += "<table border=\"2\" align=\"center\" class=\"tabl\">\n";
            cad += "<tr>\n";
            cad += "<th>#</th><th>Nombre de la clase</th><th>Nombre Metodo/funcion </th><th>TIPO</th><th> Lista de Parametros </th><th>Tipo de retorno</th>\n";
            cad += "</tr>\n";
            for (var i = 0; i < this.ListaFuncionesCopia.length; i++) {
                cad += "<tr>\n"; // abre fila 
                cad += "<td>" + (i + 1) + "</td><td>" + "  " + this.ListaFuncionesCopia[i].nombreClase + "  </td><td>" + this.ListaFuncionesCopia[i].nombreFuncion + "</td><td>" + this.ListaFuncionesCopia[i].tipo + "</td><td>" + this.ListaFuncionesCopia[i].listaDeParametros + "</td>" + "<td>" + this.ListaFuncionesCopia[i].tipoDeRetorno + " :" + this.ListaFuncionesCopia[i].tipo + "</td>";
                cad += "</tr>\n"; // cierra fila 
            }
            cad += "</table>\n";
            cad += "</div>\n";
            cad += "</body>\n";
            cad += "<br><br><br><br><br>";
        }
        else {
            console.log("no hay clases copia");
        }
        return cad;
    }
    static buscarFucionesMetodosCopia(metodos1, metodos2, nombreclase) {
        if (metodos1.length == 0 || metodos2.length == 0) {
            console.log("NO TIENE METODOS una de esas clases entonces no puedo comparar los metodos/funciones asi  ");
            return;
        }
        else {
            for (let i = 0; i < metodos1.length; i++) {
                for (let j = 0; j < metodos2.length; j++) {
                    // tengo que ver que los nombres sean los mismos 
                    if (metodos1[i].id == metodos2[j].id) {
                        console.log("mismo nombre de metodo mas sospechoso");
                        // el nombre cumple  , en clase y nombre del metodo 
                        /*
                        en este ambito busco variables copia
                        */
                        this.buscarVariablesCopia(nombreclase, metodos1[i].id, metodos1[i].listVariables, metodos2[j].listVariables);
                        if (metodos1[i].tipo == metodos2[j].tipo) {
                            // veamos el tipo ya verficado 
                            console.log("mismo Tipo en la funcion bai bai :)");
                            if (metodos1[i].ParametrostoStringVERIFICACION() == metodos2[j].ParametrostoStringVERIFICACION()) {
                                console.log("BAI BAI HAY UNA COPIA DE METODO");
                                // creo mi objeto copia de funcion 
                                Rep.ListaFuncionesCopia.push(new FuncionCopia_1.FuncionCopia(metodos1[i].id, metodos1[i].tipo, metodos1[i].tipoDeRetorno, nombreclase, metodos1[i].toReportCopiaFuncion()));
                            }
                        }
                    }
                }
            }
        }
    }
    static buscarVariablesCopia(nombreClase, nombreMetodo, listaVar1, listaVar2) {
        console.log("-----------°°-------------");
        console.log(listaVar1);
        console.log(listaVar2);
        console.log("------------°°------------");
        for (let i = 0; i < listaVar1.length; i++) {
            for (let j = 0; j < listaVar2.length; j++) { // j es el puntero de las lista de variables 2 
                if (listaVar1[i].id == listaVar2[j].id) {
                    if (listaVar1[i].tipo == listaVar2[j].tipo) {
                        console.log("coincide el tipo bai bai tenemos una copia de una variable.:!!!");
                        //    constructor(tipo:any, id:any , nMetodo:string , nClase: string){
                        this.ListaVariablesCopia.push(new VariableCopia_1.VariableCopia(listaVar1[i].tipo, listaVar2[j].id, nombreMetodo, nombreClase));
                    }
                }
            }
        }
    }
    /*             REPORTE DE VARIABLES COPIA        */
    static getCopiasVariables() {
        /*
        Este reporte deberá mostrar un listado de las variables que se consideran copia, para
        considerar una variable como copia deberá pertenecer al mismo métodos y/o función y a la
        misma clase, así como el mismo tipo. Este reporte mostrará el tipo de la variable, nombre, la
        función y/o método al que pertenece, la clase a la que pertenece.
        */
        var cad = "";
        if (this.ListaVariablesCopia.length != 0) {
            cad += "<body class=\"MIfondo\">\n";
            cad += "<div align=\"center\"  class=\"MIfondo\"> \n";
            cad += "<h1 class = \"tituloTb\">REPORTE DE VARIABLES COPIA </h1>\n";
            cad += "<table border=\"2\" align=\"center\" class=\"tabl\">\n";
            cad += "<tr>\n";
            cad += "<th>#</th><th>TIPO</th><th>ID</th><th>NOMBRE METODO </th><th>NOMBRE CLASE </th>\n";
            cad += "</tr>\n";
            for (var i = 0; i < this.ListaVariablesCopia.length; i++) {
                cad += "<tr>\n"; // abre fila 
                cad += "<td>" + (i + 1) + "</td><td>" + "  " + this.ListaVariablesCopia[i].tipo + "  </td><td>" + this.ListaVariablesCopia[i].id + "</td><td>" + this.ListaVariablesCopia[i].nombreMetodo + "</td><td>" + this.ListaVariablesCopia[i].nameClase + "</td>\n";
                cad += "</tr>\n"; // cierra fila 
            }
            cad += "</table>\n";
            cad += "</div>\n";
            cad += "</body>\n";
            cad += "<br><br><br><br><br>";
        }
        else {
            console.log("no hay clases copia");
        }
        return cad;
    }
} // END ARCHIVO 
exports.Rep = Rep;
Rep.ListaClases1 = [];
Rep.ListaClases2 = [];
Rep.t1 = false;
Rep.t2 = false;
Rep.ListaClasesCopia = [];
Rep.ListaFuncionesCopia = [];
Rep.ListaVariablesCopia = [];
