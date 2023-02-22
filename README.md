# Mockup-Gen

Generate mockup data using json and export it to SQL or other formats.

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
