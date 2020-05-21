"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Table_1 = require("./Simbols/Table");
const Break_1 = require("./Expresiones/Break");
const Continue_1 = require("./Expresiones/Continue");
const Exception_1 = require("./utils/Exception");
const Errores_1 = require("./ManejoErrores/Errores");
const parser = require('./Grammar/Grammar.js');
const MyParser_300445 = require('./Grammar/graProyecto.js'); // ESTO ME SIRVE PARA LLAMAR A AL ARCHIVO.JISON 
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
app.post('/enviar', (req, res) => {
    const { entrada, consola } = req.body;
    if (!entrada) {
        return res.redirect('/');
    }
    const tree = parser.parse(entrada);
    const tabla = new Table_1.Table(null);
    tree.instructions.map((m) => {
        const res = m.execute(tabla, tree);
        if (res instanceof Break_1.Break) {
            const error = new Exception_1.Exception('Semantico', `Sentencia break fuera de un ciclo`, res.line, res.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
        }
        else if (res instanceof Continue_1.Continue) {
            const error = new Exception_1.Exception('Semantico', `Sentencia continue fuera de un ciclo`, res.line, res.column);
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
    var entrada1 = req.body.text1;
    var entrada2 = req.body.text2;
    const tree = MyParser_300445.parse(entrada1);
    console.log("\n\n\n\n errores guardados \n" + Errores_1.Errores.geterror());
    console.log(tree);
    res.send(tree);
});
/*                    ACA mando el html de una vez en ese formato y asi lo recibo alla en el frontEnd */
app.post('/errores/', function (req, res) {
    Errores_1.Errores.clear();
    var entrada1 = req.body.text1;
    var entrada2 = req.body.text2;
    const tree = MyParser_300445.parse(entrada1);
    res.send(Errores_1.Errores.geterror());
});
