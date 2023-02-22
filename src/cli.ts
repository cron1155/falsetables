
function parseArgs(argsDef: { argName: string, argType: string }[], args: string[]) {

    const argsData = new Map()

    if (args[0]) {
        argsData.set("input", args[0])
    }

    for (const argDef of argsDef) {
        const argIndex = args.findIndex((val) => {
            if (val.substring(0, 2) === "--") {
                return val.substring(2, val.length) === argDef.argName
            } else if (val[0] === "-") {
                return val.substring(1, val.length) === argDef.argName
            }
        })

        if (argIndex === -1) continue;

        const argValue = args[argIndex + 1]

        if (!argValue) {
            throw new Error(`${argDef.argName} value is undefined!`);
        }

        argsData.set(argDef.argName, argValue)
    }

    return argsData
}

async function main() {
    const args = parseArgs([{
        argName: "output-type", 'argType': "string"
    }], process.argv.slice(2))

    if (!args.get("input")) {
        console.info("A")
    }

    console.log(args.get("input"))
    console.log(args.get("output-type"))
}

main()