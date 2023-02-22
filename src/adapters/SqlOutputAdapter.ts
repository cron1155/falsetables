import { TablesSchemaBody, Tables } from "../types";
import { BaseOuputAdapter } from "./BaseOuputAdapter";


class SqlOutputAdapter extends BaseOuputAdapter {
    fileFormat(): string {
        return '.sql'
    }

    /**TODO: Instead of doing hardcoded if checks use the type specified in the shema */
    formatValue(val: unknown) {
        if (val === 0 || val === "0" || parseInt(val as string, 10)) {
            return parseInt(val as string, 10)
        } else if (typeof val === "string") {
            return "\'" + val + "\'"
        } else {
            return val;
        }
    }

    generateOutput(schema: TablesSchemaBody, parserOutput: Tables): string {

        let outputString = ""

        for (const table of parserOutput) {
            const tableColumns = Object.keys(table.rows[0]).join(",")

            for (const row of table.rows) {
                outputString += "INSERT INTO " + table.tableName + " (" + tableColumns + ")";
                outputString += "\nVALUES (" + Object.values(row).map((val) => this.formatValue(val)).join(",") + "); \n"
            }
        }

        return outputString
    }
}

export default SqlOutputAdapter