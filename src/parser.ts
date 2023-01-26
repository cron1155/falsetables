import { faker } from "@faker-js/faker"
import _ from "lodash"
import { TablesSchema } from "./types"

import globalFunctions from "./functions"

class FSParser {

    tables: any[] = []

    constants: { [key: string]: any } = {}

    tablesSchema: TablesSchema

    constructor(tablesSchema: TablesSchema) {
        this.tablesSchema = tablesSchema

    }

    parseConstants(args: string[]) {
        return args.map((arg) => {
            if (arg[0] === "$") {
                return this.constants[arg.substring(1, arg.length)]
            }

            return arg
        })
    }

    dataGeneration(functionName: string, args: string[], rowId: number) {

        const func = globalFunctions[functionName.toLowerCase()];

        if (!func) {
            throw Error(`Function ${functionName} isn't valid!`)
        }

        return func(functionName, args, rowId, this)

    }

    parseSchema() {
        const constantsObject = this.tablesSchema["_constants"]

        if (constantsObject) {
            for (let constantKey in constantsObject) {
                if (!constantsObject[constantKey]) {
                    throw Error(`Constant ${constantKey} can't pe undefined!`);
                }

                this.constants = {
                    ...this.constants,
                    [constantKey]: constantsObject[constantKey]
                }
            }
        }

        for (let schema in this.tablesSchema) {
            if (schema[0] === "_") {

                continue;
            }

            const entrySize = this.tablesSchema[schema]['_columnRowCount'] ?? 0

            const table = {
                name: schema,
                entries: new Array()
            }

            for (let i = 0; i < entrySize; i++) {
                const entry: any = {}

                for (let schemaEntry in this.tablesSchema[schema]) {
                    if (schemaEntry[0] === "_") {
                        continue;
                    }

                    const schemaEntryData = this.tablesSchema[schema][schemaEntry]


                    const dataType = schemaEntryData['type']
                    const dataArgs: string[] = schemaEntryData['args']

                    try {
                        entry[schemaEntry] = this.dataGeneration(dataType, dataArgs, i)
                    } catch (e) {
                        throw Error(e + `\n Couldn't generate data on table ${schema} column ${schemaEntry}`)
                    }
                }

                table.entries.push(entry)
            }

            this.tables.push(table)
        }
    }
}


export default FSParser