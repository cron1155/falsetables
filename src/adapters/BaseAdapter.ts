import { Tables, TablesSchema } from "../types";

export interface IOutputAdapter {
    generateOutput(schema: TablesSchema, parserOutput: Tables): string
}