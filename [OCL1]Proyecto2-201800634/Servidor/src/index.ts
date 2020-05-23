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

const parser = require('./Grammar/Grammar.js');

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


app.listen(port, err => {
  return console.log(`server is listening on ${port}`);
});

app.post('/analizar', function (req, res) {

  var entrada1=req.body.text1;
  
  const tree = parser.parse(entrada1); 
  //console.log("SALIDA ANLIZAR 2");
  //console.log(tree);

  res.send( tree.instructions );
});



app.post('/errores', function (req, res) {
  Errores.clear();

  var entrada1=req.body.text1;
  var entrada2 = req.body.text2;
  const tree = parser.parse(entrada1);
  //console.log("SALIDA ERROR");

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
    res.send("SE ENCONTRARON ERRORES");
  } else {
    GraficaArbolAts.add("<ul>\n");
    GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Raiz\n");
    GraficaArbolAts.add("<ul>\n");
    try {
      tree.instructions.map((m: any) => {
      const res = m.execute(tabla, tree);
      });
    } catch (error) {
      console.log("ERROR NO SE ENCONTRÓ AST");
    }

    GraficaArbolAts.add("</ul>\n");
    GraficaArbolAts.add("</li>\n");
    GraficaArbolAts.add("</ul>\n");

    if (Errores.hay_errores()) {
      res.send("SE ENCONTRARON ERRORES");
    } else {
      res.send(GraficaArbolAts.cadena);
    }

  }

});



app.post('/reportes', function (req, res) {
  GraficaArbolAts.clear();
  Errores.clear();
  Reporte.clear(); 
  //console.log(req.body);
  var entrada1 = req.body.text1;
  var entrada2 = req.body.text2;
  const tree1 = parser.parse(entrada1);
  const tabla1 = new Table(null);
  
  
  Reporte.t1 = true ; 
    try {
    tree1.instructions.map((m: any) => {
      const res = m.execute(tabla1, tree1);
    });
  } catch (error) {
    //console.log("ERRORES en la entrada1 EJECUCION ATS ");
    //console.log(Errores.geterror());
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
  //console.log("ERRORES en la entrada1 EJECUCION ATS ");
  //console.log(Errores.geterror());
}
Reporte.t2 = false; 
Reporte.DeterminarCopiaClases();
//console.log(Reporte.ListaVariablesCopia);

res.send(Reporte.getHTML());
});
