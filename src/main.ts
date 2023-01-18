import { readFileSync, readSync, writeFileSync } from "fs"
import { exit } from "process"

import * as _ from 'lodash'
import { faker } from "@faker-js/faker"
import FSParser from "./parser"
import { TablesSchema } from "./types"

function main() {
    const rawSchema = readFileSync('./schema.json', 'utf-8')

    const schema: TablesSchema = JSON.parse(rawSchema)

    const parser = new FSParser(schema)

    try {
        parser.parseSchema()

        writeFileSync('./schema_output.json', JSON.stringify(parser.tables, undefined, 4))
    } catch (e) {
        console.error(e)

        exit(1)
    }
}

main()