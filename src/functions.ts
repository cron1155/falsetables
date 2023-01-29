import { faker } from "@faker-js/faker";
import _ from "lodash";
import { GlobalFunctions } from "./types";



const globalFunctions: GlobalFunctions = {
    "id": (functionName, args, rowId, parserInstance) => {
        return `${rowId}`
    },
    "rand": (functionName, args, rowId, parserInstance) => {
        if (!args || args.length === 0 || args.length > 2) {
            throw Error("Args don't match")
        }

        const formatedArgs = parserInstance.parseConstants(args)

        return _.random(parseInt(formatedArgs[0]), parseInt(formatedArgs[1]));
    },
    "first_name": (functionName, args, rowId, parserInstance) => {
        return faker.name.firstName();
    },
    "last_name": (functionName, args, rowId, parserInstance) => {
        return faker.name.lastName();
    },
}


export default globalFunctions