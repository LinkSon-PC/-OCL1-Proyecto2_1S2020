import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";

/**
 * @class Reasigna el valor de una variable existente
 */
export class Import extends Node {
    identifier: String;
    value: Node;

    /**
     * @constructor 
     * @param identifier
     * @param value valor de la variable
     * @param line
     * @param column 
     */
    constructor(identifier: String, value: Node, line: Number, column: Number) {
        super(null, line, column);
        this.identifier = identifier;
        this.value = null;
        ;
    }

    execute(table: Table, tree: Tree) {
        /*
        const result = this.value.execute(table, tree);
        if (result instanceof Exception) {
            return result;
        }

        let variable: Simbol;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Exception('Semantico',
                'No se ha encontrado la variable ' + this.identifier,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }


        if (this.value.type.type != variable.type.type) {
            const error = new Exception('Semantico',
                `No se puede asignar la variable porque los tipos no coinciden.`,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }

        variable.value = result;
        return null;
        */
    }
}