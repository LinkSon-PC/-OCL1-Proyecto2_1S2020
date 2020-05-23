import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";

/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class Declaracion_Parametros extends Node {
    type: Type;
    Lista_ids: Array<Node>;
    value: Node;

    /**
      TIPO id Declaracion_Parametros
     */
    constructor(type: Type, identifier: Array<Node>, value: Node , line: Number, column: Number) {
        super(type, line, column);
        this.Lista_ids = identifier;
        this.value = value;
    }

    execute(table: Table, tree: Tree) {
 
    }
}