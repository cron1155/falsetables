import { Tables, TablesSchema } from "../types";

export class BaseOuputAdapter {
    fileFormat(): string {
        return ""
    }
    generateOutput(schema: TablesSchema, parserOutput: Tables): string {
        return ""
    }
}