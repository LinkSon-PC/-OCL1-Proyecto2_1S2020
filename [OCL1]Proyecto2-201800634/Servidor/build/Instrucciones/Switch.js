"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
class Switch extends Node_1.Node {
    constructor(exp, cases, line, column) {
        super(null, line, column);
        this.EXPRESION = exp;
        this.Cases = cases;
    }
    execute(table, tree) {
    }
}
exports.Switch = Switch;
