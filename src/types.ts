
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

