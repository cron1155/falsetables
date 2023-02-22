import { Tables, TablesSchema } from "../types";

export interface BaseOuputAdapter {
    generateOutput(schema: TablesSchema, parserOutput: Tables): string
}