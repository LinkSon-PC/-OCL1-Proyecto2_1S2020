import express from 'express';
import { Table } from './Simbols/Table';
import { Break } from './Expresiones/Break';
import { Continue } from './Expresiones/Continue';
import { Exception } from './utils/Exception';
import { Errores } from "./ManejoErrores/Errores";

const parser = require('./Grammar/Grammar.js');
const MyParser_300445 = require('./Grammar/graProyecto.js'); // ESTO ME SIRVE PARA LLAMAR A AL ARCHIVO.JISON 

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


app.listen(port, err => {
  return console.log(`server is listening on ${port}`);
});

app.post('/analizar/', function (req, res) {

  var entrada1=req.body.text1;
  var entrada2 = req.body.text2;
  const tree = MyParser_300445.parse(entrada1); 
  console.log("\n\n\n\n errores guardados \n"+Errores.geterror());
  console.log(tree);

  res.send( tree );
});



 /*                    ACA mando el html de una vez en ese formato y asi lo recibo alla en el frontEnd */
app.post('/errores/', function (req, res) {
  Errores.clear();

  var entrada1=req.body.text1;
  var entrada2 = req.body.text2;
  const tree = MyParser_300445.parse(entrada1);

  res.send( Errores.geterror());
});