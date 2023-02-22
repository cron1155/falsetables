import { TablesSchemaBody, Tables } from "../types";
import { BaseOuputAdapter } from "./BaseOuputAdapter";


class SqlOutputAdapter extends BaseOuputAdapter {
    fileFormat(): string {
        return '.sql'
    }

    generateOutput(schema: TablesSchemaBody, parserOutput: Tables): string {
        console.log(schema)
        console.log(parserOutput[0].rows)

        throw new Error("Method not implemented.");
    }
}

export default SqlOutputAdapter