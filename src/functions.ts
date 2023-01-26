import { faker } from "@faker-js/faker";
import _ from "lodash";
import { GlobalFunctions } from "./types";



const globalFunctions: GlobalFunctions = {
    "id": (functioName, args, rowId, parserInstance) => {
        return `${rowId}`
    },
    "rand": (functioName, args, rowId, parserInstance) => {
        if (!args || args.length === 0 || args.length > 2) {
            throw Error("Args don't match")
        }

        const formatedArgs = parserInstance.parseConstants(args)

        return _.random(parseInt(formatedArgs[0]), parseInt(formatedArgs[1]));
    },
    "first_name": (functioName, args, rowId, parserInstance) => {
        return faker.name.firstName();
    },
    "last_name": (functioName, args, rowId, parserInstance) => {
        return faker.name.lastName();
    },
}


export default globalFunctions