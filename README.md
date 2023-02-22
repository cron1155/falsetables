# MockupGen

Generate mockup data using json and export it to SQL or other formats.

```
CLI tool to generate mockup date based on a json schema.
NOTE: You don't need to specify the extension for the schema

Usage: mockup-gen ./storesShema

Arguments:
-dir, --dir  : Specify the output directory for the generated data
-out, --out  : Specify the output adapter used to the generated data (by default the output format is JSON)

Output Adapters:
json : Default adapter
sql : Generates an sql file with all the tables
```

### Examplse :

| Function Name | Params     | Description                                  |
| ------------- | ---------- | -------------------------------------------- |
| id            | none       | Returns the current row index                |
| rand          | [low,high] | Returns a random number between low and high |
| first_name    | none       | Returns a random first name                  |
| last_name     | none       | Returns a random last name                   |

```json
{
  "_constants": {
    "MIN": "1",
    "MAX": "2"
  },
  "CUSTOMER": {
    "_columnRowCount": 10,
    "CUSTOMER_ID": {
      "type": "ID"
    },
    "AGE": {
      "type": "RAND",
      "args": ["$MIN", "$MAX"]
    },
    "CUSTOMER_FIRST_NAME": {
      "type": "FIRST_NAME"
    }
  },
  "STORES": {
    "_columnRowCount": 2,
    "STORE_ID": {
      "type": "ID"
    }
  }
}
```
