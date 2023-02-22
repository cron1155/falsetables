import { readFileSync, readSync, writeFileSync } from "fs"
import { BaseOuputAdapter } from "./adapters/BaseOuputAdapter"
import SqlOutputAdapter from "./adapters/SqlOutputAdapter"
import { parseArgs } from "./cli-utils"
import Parser from "./parser"
import { Tables, TablesSchema, TablesSchemaBody } from "./types"

interface OutputAdapters {
    [key: string]: {
        description: string,
        adapter: typeof BaseOuputAdapter
    }
}

const outputAdapters: OutputAdapters = {
    "sql": {
        description: "Generates an sql file with all the tables",
        adapter: SqlOutputAdapter
    }
}

async function main() {
    const args = parseArgs([{
        argName: "dir", argType: "string",
    }, { argName: "out", argType: "string" }], process.argv.slice(2))

    const schemaInputPath: string = args.get("input")

    if (!schemaInputPath) {
        console.info("CLI tool to generate mockup date based on a json schema.")
        console.info("NOTE: You don't need to specify the extension for the schema");
        console.info("\nUsage: mockup-gen ./storesShema")
        console.info("\nArguments:")
        console.info("-dir, --dir  : Specify the output directory for the generated data")
        console.info("-out, --out  : Specify the output adapter used to the generated data (by default the output format is JSON)")

        console.info("\nOutput Adapters:")
        console.info("json : Default adapter")

        for (const i in outputAdapters) {
            console.info(i + " : " + outputAdapters[i].description)
        }

        return;
    }

    const fileName = schemaInputPath.substring(schemaInputPath.lastIndexOf("/") + 1, schemaInputPath.length)

    const mockupSchema = readFileSync(schemaInputPath + ".json", 'utf-8');

    const schema: TablesSchema = JSON.parse(mockupSchema)

    const parser = new Parser(schema)

    parser.parseSchema()

    const outputFormat = args.get("out")
    const outputDirectory = args.get("dir") ? args.get("dir") : process.cwd() + "/"

    if (!outputFormat || outputFormat.toLowerCase() === "json") {
        writeFileSync(outputDirectory + fileName + "_output" + ".json", JSON.stringify(parser.tables, undefined, 4))

        console.log("Data generated!")
    } else {
        const outputAdapter = outputAdapters[outputFormat]

        if (!outputAdapter) {
            throw new Error("Invalid output adapter!");
        }

        const adapterInstance = new outputAdapter.adapter()

        const outputData = adapterInstance.generateOutput(schema, parser.tables)

        const filePath = outputDirectory + fileName + "_output" + adapterInstance.fileFormat()

        writeFileSync(filePath, outputData)
    }
}

main()