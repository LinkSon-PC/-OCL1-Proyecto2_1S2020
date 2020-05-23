import { report } from "process";
import { Clase } from './Clase';
import { Metodo } from "./Metodo";
import { ClaseCopia } from "./ClaseCopia";

import {FuncionCopia } from './FuncionCopia'
import { Variable } from "./Variable";
import { VariableCopia } from "./VariableCopia";
class Reporte {
  public static ListaClases1: Array<Clase> = [];
  public static ListaClases2: Array<Clase> = [];
  public static claseActual: any;
  public static nombreMetodoActual: string; 
  public static t1 = false;
  public static t2 = false;
  public static ListaClasesCopia: Array<ClaseCopia> = [];
  public static ListaFuncionesCopia:Array<FuncionCopia> = [];
  public static ListaVariablesCopia: Array<VariableCopia> = [];
  constructor() {

  }

  public static getHTML():string{
    let definitiva:string = ""; 
    definitiva += this.getCopiasClases(); 
    definitiva += "\n\n\n\n\n";
    definitiva += this.getCopiaFunciones(); 
    definitiva += "\n\n\n\n\n";
    definitiva += this.getRepoteVariablesCopia(); 
    definitiva += "\n\n\n\n\n";
    return definitiva; 
  }

  public static addClase(c: Clase): any {
    if (Reporte.t1 == true) {
      Reporte.ListaClases1.push(c);
    }
    if (Reporte.t2 == true) {
      Reporte.ListaClases2.push(c);
    }
  }

  public static addMetodo(key: string, m: Metodo): any {
    if (Reporte.t1 == true) {
      for (let i = 0; i < Reporte.ListaClases1.length; i++) {
        if (key == Reporte.ListaClases1[i].id) {
          Reporte.ListaClases1[i].addMetodo(m);
          break;
        }
      }
    }

    if (Reporte.t2 == true) {
      for (let i = 0; i < Reporte.ListaClases2.length; i++) {
        if (key == Reporte.ListaClases2[i].id) {
          Reporte.ListaClases2[i].addMetodo(m);
          break;
        }
      }

    }

  }

  public static addVariable(nombreMetodo:string , idVar:any , tipo:string){// necesito el nombre del metodo y de la clase 
    if (Reporte.t1 == true) {
      let metodo = Reporte.claseActual.getMETODO(nombreMetodo); // ya se en que clase estoy 
      metodo.listVariables.push(new Variable(idVar , tipo));
   }

   if (Reporte.t2 == true) {
     let metodo = Reporte.claseActual.getMETODO(nombreMetodo); 
     metodo.listVariables.push(new Variable(idVar , tipo));
   }

  }

  public static getCLASE(id:string):any{
    if (Reporte.t1 == true) {
      for (let i = 0; i < Reporte.ListaClases1.length; i++) {
        if (id == Reporte.ListaClases1[i].id) {
         return Reporte.ListaClases1[i];
        }
      }
    }

    if (Reporte.t2 == true) {
      for (let i = 0; i < Reporte.ListaClases2.length; i++) {
        if (id == Reporte.ListaClases2[i].id) {
          return Reporte.ListaClases2[i];
        }
      }
    }


  }// fin metodo 
  public static addPARAMETROS(nombreMetodo:string , listaParametros:any):any{
    if (Reporte.t1 == true) {
       let metodo = Reporte.claseActual.getMETODO(nombreMetodo); 
        metodo.listaParametros = listaParametros; 
    }

    if (Reporte.t2 == true) {
      let metodo = Reporte.claseActual.getMETODO(nombreMetodo); 
      metodo.listaParametros = listaParametros; 
    }


  }// fin metodo 

  public static addTIPO_RETORNO(nombreMetodo:string , tipo:any):any{
    if (Reporte.t1 == true) {
       let metodo = Reporte.claseActual.getMETODO(nombreMetodo); 
        metodo.tipoDeRetorno = tipo; 
    }

    if (Reporte.t2 == true) {
      let metodo = Reporte.claseActual.getMETODO(nombreMetodo); 
      metodo.tipoDeRetorno = tipo; 
    }


  }// fin metodo





  public static clear() {
    // CUIADO CON LOS PUNTEROS  QUE SE PUEDE APUNTAR A LA MISMA LISTA 
    let vacio: any = [];
    Reporte.ListaClases1 = vacio;
    let vacio2: any = [];
    Reporte.ListaClases2 = vacio2;
    this.t1 = false;
    this.t2 = false;
    let vacio3: any = [];
    Reporte.ListaClasesCopia = vacio3;
    let vacio4: any = [];
    Reporte.ListaFuncionesCopia = vacio4;
    Reporte.nombreMetodoActual =  ""; 
    let vacio5: any = [];
    Reporte.ListaVariablesCopia = vacio5; 
  }
  public static get2() {
    return Reporte.ListaClases2;
  }
  public static get1() {
    return Reporte.ListaClases1;
  }


  public static printClases1() {
    console.log("************ARCHIVO 1****************");
    for (let i = 0; i < Reporte.ListaClases1.length; i++) {
      console.log("||| CLASE " + Reporte.ListaClases1[i].id + "|||")
      Reporte.ListaClases1[i].printMetodos();
    }
    console.log("*************************************");
  }

  public static printClases2() {
    console.log("************ARCHIVO 2****************");
    for (let i = 0; i < Reporte.ListaClases2.length; i++) {
      console.log("||| CLASE " + Reporte.ListaClases2[i].id + "|||")
      Reporte.ListaClases2[i].printMetodos();
    }
    console.log("*************************************");
  }



  public static DeterminarCopiaClases() {

    if (this.ListaClases1.length != 0 && this.ListaClases2.length != 0) {
      for (let i = 0; i < this.ListaClases1.length; i++) {
        // cada clase del  1 la comparo con la clase  del 2 
        for (let j = 0; j < this.ListaClases2.length; j++) {
          if (this.ListaClases1[i].id == this.ListaClases2[j].id) {
            
            /* COINCIDE EL NOMBRE SOSPECHOSO ENTONCES MIRAMOS EL NOMBRE DE LOS METODOS SI COINCIDEN */
            console.log("sospechoso el nombre es igual : "+this.ListaClases1[i].id);
            // ESTOY EN LA MISMA CLASE ENTONCES DEBO DE BUSCAR SI HAY UNA MISMA FUNCION 
            this.METODO_FUNCION_COPIA(this.ListaClases1[i].getMetodos(), this.ListaClases2[j].getMetodos()  , this.ListaClases1[i].id);

            let res: any = this.comparaMetodos(this.ListaClases1[i].getMetodos(), this.ListaClases2[j].getMetodos());// para clases copia


            if (res[0] == true) {// si es copia
              console.log("encontro una clase copia");
              this.toCopiaClase(this.ListaClases1[i].id, res[1]); // metodo que agrega a una lista 
            }

          }
        }

      }

    } else {

      console.log("no hay elementos :( ");
    }
  }

  private static comparaMetodos(clase1: Array<Metodo>, clase2: Array<Metodo>): any {
    let res: any = [];
    let cont = 0;
    if (clase1.length == 0 && clase2.length == 0) {
      // si es copia porque solo tienen los nombres 
      res.push(true); // si es copia 
      res.push(0); // metodos Reporteetidos 0 
      return res;
    }


    if (clase1.length != clase2.length) {
      // si no tienen la misma cantidad de metodos se descarta de una vez 
      console.log("descartado por no tener la misma cantidad de metodos/funciones");
      res.push(false);
      res.push(0);
    }



    for (let i = 0; i < clase1.length; i++) {
      for (let j = 0; j < clase2.length; j++) {
        // tengo que ver que los nombres sean los mismos 
        if (clase1[i].id == clase2[j].id) {
          cont++;
        }
        
      }
    }

    // tiene que coincidir la longitud del vector con el contador para determinar que es copia 
    if (cont == clase1.length) {
      res.push(true); 
      res.push(cont); 
      return res;
    } else {
      res.push(false); 
      res.push(cont);  
      return res;
    }

  }



  public static toCopiaClase(nombre: string, cantidad: any) {
    Reporte.ListaClasesCopia.push(new ClaseCopia(nombre, cantidad));
  }



  public static getCopiasClases(): string {
    var cad: string = "";
    if (this.ListaClasesCopia.length != 0) {


      
      cad += "<div align=\"center\" > \n";
      cad += "<h1 class = \"tituloTb\"> REPORTE CLASES </h1>\n";
      cad += "<table border=\"2\" align=\"center\" class=\"tabl\">\n";
      cad += "<tr>\n";
      cad += "<th>#</th><th> CLASE </th><th> METODOS/FUNCIONES </th>\n";
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
      cad+= "<br><br><br><br><br>";

    } else {
      console.log("no hay clases copia");
    }
    return cad;
  }


  public static getCopiaFunciones(): string {
    var cad: string = "";
    if (this.ListaFuncionesCopia.length != 0) {


      cad += "<div > \n";
      cad += "<h1 class = \"tituloTb\"> REPORTE DE FUNCIONES </h1>\n";
      cad += "<table border=\"2\" align=\"center\" class=\"tabl\">\n";
      cad += "<tr>\n";
      cad += "<th>#</th><th>CLASE</th><th> METODO/FUNCION </th><th>TIPO</th><th> LISTA DE PARAMETROS </th><th> TIPO RETORNO </th>\n";
      cad += "</tr>\n";
      
      for (var i = 0; i < this.ListaFuncionesCopia.length; i++) {
        cad += "<tr>\n";// abre fila 


        cad += "<td>" + (i + 1) + "</td><td>" + "  " + this.ListaFuncionesCopia[i].nombreClase + "  </td><td>" + this.ListaFuncionesCopia[i].nombreFuncion + "</td><td>"+this.ListaFuncionesCopia[i].tipo+"</td><td>" + this.ListaFuncionesCopia[i].listaDeParametros + "</td>"+"<td>" + this.ListaFuncionesCopia[i].tipoDeRetorno +" :"+this.ListaFuncionesCopia[i].tipo+ "</td>";
        
        
        cad += "</tr>\n";// cierra fila 
      }

      cad += "</table>\n";
      cad += "</div>\n";
      
      cad += "<br><br><br><br><br>"; 

    } else {
      console.log("no hay clases copia");
    }
    return cad;
  }


  public static METODO_FUNCION_COPIA(clase1: Array<Metodo>, clase2: Array<Metodo> , nombreclase:string):any{

    if(clase1.length == 0 || clase2.length == 0){
      console.log("COMPARA LA CANTIDAD DE MÉTODOS DENTRO DE UNA CLASE");
      return;
    }else{

      for (let i = 0; i < clase1.length; i++) {
        for (let j = 0; j < clase2.length; j++) {
          // tengo que ver que los nombres sean los mismos 
          if (clase1[i].id == clase2[j].id) {
            console.log("mismo nombre de metodo mas sospechoso");
            
           this.VARIABLES_COPIA(nombreclase , clase1[i].id ,clase1[i].listVariables , clase2[j].listVariables);

            if(clase1[i].tipo == clase2[j].tipo){
              // veamos el tipo ya verficado 
              console.log("mismo Tipo en la funcion bai bai :)");
             if(clase1[i].ParametrostoStringVERIFICACION() == clase2[j].ParametrostoStringVERIFICACION()){
              console.log("BAI BAI HAY UNA COPIA DE METODO");
              // creo mi objeto copia de funcion 
              Reporte.ListaFuncionesCopia.push(new FuncionCopia(clase1[i].id, clase1[i].tipo , clase1[i].tipoDeRetorno  , nombreclase , clase1[i].toReportCopiaFuncion()));
             }  
            }
          }
        }
      }


    }



  }



  public static VARIABLES_COPIA(nombreClase:string , nombreMetodo:string , listaVar1:Array<Variable> , listaVar2:Array<Variable>):any{// necesito la clase , el metodo donde estoy y el arreglo de las variables 
   //console.log("-----------°°-------------");
   //console.log(listaVar1);
   //console.log(listaVar2);
   //onsole.log("------------°°------------");
    for(let i = 0 ; i <listaVar1.length ; i++){
      for(let j = 0 ; j < listaVar2.length ; j++){// j es el puntero de las lista de variables 2 

        if(listaVar1[i].id == listaVar2[j].id){
          
          if(listaVar1[i].tipo == listaVar2[j].tipo){
            
              //    constructor(tipo:any, id:any , nMetodo:string , nClase: string){
              this.ListaVariablesCopia.push(new VariableCopia(listaVar1[i].tipo , listaVar2[j].id ,nombreMetodo ,nombreClase ));
          }
          
        }

      }
    }

}


public static getRepoteVariablesCopia(): string {



  var cad: string = "";
  if (this.ListaVariablesCopia.length != 0) {


    cad += "<div > \n";
    cad += "<h1 class = \"tituloTb\"> REPORTE DE VARIABLES COPIADAS </h1>\n";
    cad += "<table border=\"2\" align=\"center\" >\n";
    cad += "<tr>\n";
    cad += "<th>#</th><th>TIPO</th><th>ID</th><th>NOMBRE </th><th> AMBITO/CLASE </th>\n";
    cad += "</tr>\n";
    
    for (var i = 0; i < this.ListaVariablesCopia.length; i++) {
      cad += "<tr>\n";// abre fila 


    cad += "<td>" + (i + 1) + "</td><td>" + "  " + this.ListaVariablesCopia[i].tipo + "  </td><td>" + this.ListaVariablesCopia[i].id + "</td><td>"+this.ListaVariablesCopia[i].nombreMetodo+"</td><td>" + this.ListaVariablesCopia[i].nameClase + "</td>\n";
      
      
      cad += "</tr>\n";// cierra fila 
    }

    cad += "</table>\n";
    cad += "</div>\n";
    
    cad += "<br><br><br><br><br>"; 

  } else {
    console.log("no hay clases copia");
  }
  return cad;
}


}
export { Reporte };