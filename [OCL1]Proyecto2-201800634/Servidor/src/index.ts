import express from 'express';
import { Table } from './Simbols/Table';
import { Break } from './Expresiones/Break';
import { Continue } from './Expresiones/Continue';
import { Exception } from './utils/Exception';
import { Errores } from "./ManejoErrores/Errores";
import { GraficaArbolAts } from './ManejoErrores/GraficaArbolAts';
import { Clase } from './Reportes/Clase';
import { Reporte } from "./Reportes/Reporte";
import { KeyObject } from 'crypto';
import { json } from 'body-parser';
import { parse } from 'querystring';

//const parser = require('./Grammar/Grammar.js');
const parser = require('./Grammar/graProyecto.js');

const cors = require('cors');
const app = express();
const port = 7000;
app.use(cors());

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.set('views', __dirname);
app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
  res.render('views/index', {
    entrada: '',
    consola: [],
    errores: []
  });
}).get('/enviar', (req, res) => {
  res.render('views/index', {
    entrada: '',
    consola: [],
    errores: []
  });
});

/*
app.post('/enviar', (req, res) => {
  const { entrada, consola } = req.body;
  if (!entrada) {
    return res.redirect('/');
  }
  const tree = parser.parse(entrada);
  const tabla = new Table(null);

  
  tree.instructions.map((m: any) => {
    const res = m.execute(tabla, tree);
    if (res instanceof Break) {
      const error = new Exception('Semantico',
        `Sentencia break fuera de un ciclo`,
        res.line, res.column);
      tree.excepciones.push(error);
      tree.console.push(error.toString());
    } else if (res instanceof Continue) {
      const error = new Exception('Semantico',
        `Sentencia continue fuera de un ciclo`,
        res.line, res.column);
      tree.excepciones.push(error);
      tree.console.push(error.toString());
    }
  });
  
  res.render('views/index', {
    entrada,
    consola: tree.console,
    errores: tree.excepciones
  });
});
*/


app.listen(port, err => {
  return console.log(`server is listening on ${port}`);
});

app.post('/analizar', function (req, res) {

  var entrada1=req.body.text1;
  
  const tree = parser.parse(entrada1); 
  //console.log("\n\n\n\n errores guardados \n"+Errores.geterror());
  console.log("SALIDA ANLIZAR 2");
  console.log(tree);

  res.send( tree.instructions );
});



app.post('/errores', function (req, res) {
  Errores.clear();

  var entrada1=req.body.text1;
  var entrada2 = req.body.text2;
  const tree = parser.parse(entrada1);
  console.log("SALIDA ERROR");

  res.send( Errores.geterror());
});




app.post('/AST', function (req, res) { // PARA ESTA FUNCION SOLO ES NECESARIA UNA ENTRADA DE TEXTO 
  GraficaArbolAts.clear();
  Errores.clear();
  Reporte.clear();
  var entrada1 = req.body.text1;
  const tree = parser.parse(entrada1);
  const tabla = new Table(null);
  if (Errores.hay_errores()) {
    res.send("LA ENTRADA POSEEE ERRORES , NO SE PUEDE GENERAR EL REPORTE");
  } else {
    GraficaArbolAts.add("<ul>\n");
    GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Raiz\n");
    GraficaArbolAts.add("<ul>\n");
    try {
      tree.instructions.map((m: any) => {
      const res = m.execute(tabla, tree);
      });
    } catch (error) {
      console.log("ERROR al utilizar el metodo abstracto EXECUTE del ATS");
    }

    /*     COMIENZO A RECORRER EL ARBOL PARA ELLO SE VALIDO QUE NO VINIERA CON ERRORES */

    GraficaArbolAts.add("</ul>\n");
    GraficaArbolAts.add("</li>\n");
    GraficaArbolAts.add("</ul>\n");


    // pueden haber errores semanticos 
    if (Errores.hay_errores()) {
      res.send("LA ENTRADA POSEEE ERRORES , NO SE PUEDE GENERAR EL REPORTE");
    } else {
      res.send(GraficaArbolAts.cadena);
    }

  }

});



app.post('/reportes', function (req, res) { // PARA ESTA FUNCION SOLO ES NECESARIA UNA ENTRADA DE TEXTO 
  console.log("°°°°°°°°REPORTE DE COPIAS PETICION°°°°°°°°°");
  GraficaArbolAts.clear();
  Errores.clear();
  Reporte.clear(); 
  console.log(req.body);
  var entrada1 = req.body.text1;
  var entrada2 = req.body.text2;
  const tree1 = parser.parse(entrada1);
  const tabla1 = new Table(null);
  
  // se supone que viene sin errores 
  Reporte.t1 = true ; 
    try {// lo mando a recorrer 
    tree1.instructions.map((m: any) => {
      const res = m.execute(tabla1, tree1);
    });
  } catch (error) {
    console.log("ERRORES en la entrada1 EJECUCION ATS ");
    console.log(Errores.geterror());
  }
Reporte.t1 = false;





const tree2 = parser.parse(entrada2);
const tabla2 = new Table(null);




// se supone que viene sin errores 
Reporte.t2 = true; // activo
  try {// lo mando a recorrer 
  tree2.instructions.map((m: any) => {
    const res = m.execute(tabla2, tree2);
  });
} catch (error) {
  console.log("ERRORES en la entrada1 EJECUCION ATS ");
  console.log(Errores.geterror());
}
Reporte.t2 = false; // corto el flujo ya no agarra mas clases 
/*

Reporte.printClases1(); 
Reporte.printClases2();  */
Reporte.DeterminarCopiaClases();
console.log(Reporte.ListaVariablesCopia);

res.send(Reporte.getHTML());
});
