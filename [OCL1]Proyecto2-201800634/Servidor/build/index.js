"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Table_1 = require("./Simbols/Table");
const Errores_1 = require("./ManejoErrores/Errores");
const GraficaArbolAts_1 = require("./ManejoErrores/GraficaArbolAts");
const Reporte_1 = require("./Reportes/Reporte");
//const parser = require('./Grammar/Grammar.js');
const parser = require('./Grammar/graProyecto.js');
const cors = require('cors');
const app = express_1.default();
const port = 7000;
app.use(cors());
app.use(express_1.default.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
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
    var entrada1 = req.body.text1;
    const tree = parser.parse(entrada1);
    //console.log("\n\n\n\n errores guardados \n"+Errores.geterror());
    console.log("SALIDA ANLIZAR 2");
    console.log(tree);
    res.send(tree.instructions);
});
app.post('/errores', function (req, res) {
    Errores_1.Errores.clear();
    var entrada1 = req.body.text1;
    var entrada2 = req.body.text2;
    const tree = parser.parse(entrada1);
    console.log("SALIDA ERROR");
    res.send(Errores_1.Errores.geterror());
});
app.post('/ats', function (req, res) {
    GraficaArbolAts_1.GraficaArbolAts.clear();
    Errores_1.Errores.clear();
    Reporte_1.Reporte.clear();
    var entrada1 = req.body.text1;
    const tree = parser.parse(entrada1);
    const tabla = new Table_1.Table(null);
    if (Errores_1.Errores.hay_errores()) {
        res.send("LA ENTRADA POSEEE ERRORES , NO SE PUEDE GENERAR EL REPORTE");
    }
    else {
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Raiz\n");
        GraficaArbolAts_1.GraficaArbolAts.add("<ul>\n");
        try {
            tree.instructions.map((m) => {
                const res = m.execute(tabla, tree);
            });
        }
        catch (error) {
            console.log("ERROR al utilizar el metodo abstracto EXECUTE del ATS");
        }
        /*     COMIENZO A RECORRER EL ARBOL PARA ELLO SE VALIDO QUE NO VINIERA CON ERRORES */
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        // pueden haber errores semanticos 
        if (Errores_1.Errores.hay_errores()) {
            res.send("LA ENTRADA POSEEE ERRORES , NO SE PUEDE GENERAR EL REPORTE");
        }
        else {
            res.send(GraficaArbolAts_1.GraficaArbolAts.cadena);
        }
    }
});
app.post('/reportes', function (req, res) {
    console.log("°°°°°°°°REPORTE DE COPIAS PETICION°°°°°°°°°");
    GraficaArbolAts_1.GraficaArbolAts.clear();
    Errores_1.Errores.clear();
    Reporte_1.Reporte.clear();
    console.log(req.body);
    var entrada1 = req.body.text1;
    var entrada2 = req.body.text2;
    const tree1 = parser.parse(entrada1);
    const tabla1 = new Table_1.Table(null);
    // se supone que viene sin errores 
    Reporte_1.Reporte.t1 = true;
    try { // lo mando a recorrer 
        tree1.instructions.map((m) => {
            const res = m.execute(tabla1, tree1);
        });
    }
    catch (error) {
        console.log("ERRORES en la entrada1 EJECUCION ATS ");
        console.log(Errores_1.Errores.geterror());
    }
    Reporte_1.Reporte.t1 = false;
    const tree2 = parser.parse(entrada2);
    const tabla2 = new Table_1.Table(null);
    // se supone que viene sin errores 
    Reporte_1.Reporte.t2 = true; // activo
    try { // lo mando a recorrer 
        tree2.instructions.map((m) => {
            const res = m.execute(tabla2, tree2);
        });
    }
    catch (error) {
        console.log("ERRORES en la entrada1 EJECUCION ATS ");
        console.log(Errores_1.Errores.geterror());
    }
    Reporte_1.Reporte.t2 = false; // corto el flujo ya no agarra mas clases 
    /*
    
    Reporte.printClases1();
    Reporte.printClases2();  */
    Reporte_1.Reporte.DeterminarCopiaClases();
    console.log(Reporte_1.Reporte.ListaVariablesCopia);
    res.send(Reporte_1.Reporte.getHTML());
});
