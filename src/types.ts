import FSParser from "./parser"

export interface SchemaColumn {
    [key: string]: {
        type: string
        args: any[]
    }
}

export interface SchemaColumnOptions {
    "_columnRowCount"?: number
}

export interface TablesSchemaConfig {
    "_constants"?: {
        [key: string]: string
    }
}

export interface TablesSchemaBody {
    [key: string]: SchemaColumnOptions & SchemaColumn
}

export type TablesSchema = TablesSchemaBody & TablesSchemaBody

export type GlobalFunction = (functionName: string, args: string[], rowId: number, parserInstance: FSParser) => string | number

export interface GlobalFunctions {
    [key: string]: GlobalFunction
}

export type Table = {
    tableName: string,
    rows: any[]
}

export type Tables = Table[]