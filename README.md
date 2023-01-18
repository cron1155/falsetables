# FalseTable

Generate fake data to use in your databases or in your spreadsheet with ease!

### Examplse :

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
