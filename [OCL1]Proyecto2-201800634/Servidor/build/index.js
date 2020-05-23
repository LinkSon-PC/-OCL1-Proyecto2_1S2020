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
const parser = require('./Grammar/Grammar.js');
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
app.listen(port, err => {
    return console.log(`server is listening on ${port}`);
});
app.post('/analizar', function (req, res) {
    var entrada1 = req.body.text1;
    const tree = parser.parse(entrada1);
    //console.log("SALIDA ANLIZAR 2");
    //console.log(tree);
    res.send(tree.instructions);
});
app.post('/errores', function (req, res) {
    Errores_1.Errores.clear();
    var entrada1 = req.body.text1;
    var entrada2 = req.body.text2;
    const tree = parser.parse(entrada1);
    //console.log("SALIDA ERROR");
    res.send(Errores_1.Errores.geterror());
});
app.post('/AST', function (req, res) {
    GraficaArbolAts_1.GraficaArbolAts.clear();
    Errores_1.Errores.clear();
    Reporte_1.Reporte.clear();
    var entrada1 = req.body.text1;
    const tree = parser.parse(entrada1);
    const tabla = new Table_1.Table(null);
    if (Errores_1.Errores.hay_errores()) {
        res.send("SE ENCONTRARON ERRORES");
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
            console.log("ERROR NO SE ENCONTRÓ AST");
        }
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</li>\n");
        GraficaArbolAts_1.GraficaArbolAts.add("</ul>\n");
        if (Errores_1.Errores.hay_errores()) {
            res.send("SE ENCONTRARON ERRORES");
        }
        else {
            res.send(GraficaArbolAts_1.GraficaArbolAts.cadena);
        }
    }
});
app.post('/reportes', function (req, res) {
    GraficaArbolAts_1.GraficaArbolAts.clear();
    Errores_1.Errores.clear();
    Reporte_1.Reporte.clear();
    //console.log(req.body);
    var entrada1 = req.body.text1;
    var entrada2 = req.body.text2;
    const tree1 = parser.parse(entrada1);
    const tabla1 = new Table_1.Table(null);
    Reporte_1.Reporte.t1 = true;
    try {
        tree1.instructions.map((m) => {
            const res = m.execute(tabla1, tree1);
        });
    }
    catch (error) {
        //console.log("ERRORES en la entrada1 EJECUCION ATS ");
        //console.log(Errores.geterror());
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
        //console.log("ERRORES en la entrada1 EJECUCION ATS ");
        //console.log(Errores.geterror());
    }
    Reporte_1.Reporte.t2 = false;
    Reporte_1.Reporte.DeterminarCopiaClases();
    //console.log(Reporte.ListaVariablesCopia);
    res.send(Reporte_1.Reporte.getHTML());
});
