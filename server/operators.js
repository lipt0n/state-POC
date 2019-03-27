export default [
  {
    "id": "load_int",
    "name": "load data",
    "description": "get integer  ",
    "configuration": [
      {
        "id": "value",
        "name": "value",
        "type": "integer"
      }
    ],
    "inputs": [
    
    ],
    "outputs": [
      {
          "id": "value",
          "name": "value",
          "type": "integer"
        }
    ]
  },
    {
      "id": "increment_int",
      "name": "increment integer",
      "description": "get integer and increment it by one",
      "configuration": [
        {
          "id": "increment",
          "name": "Increment ?",
          "type": "boolean"
        }
      ],
      "inputs": [
        {
          "id": "value",
          "name": "value",
          "type": "integer"
        }
      ],
      "outputs": [
        {
            "id": "value",
            "name": "value",
            "type": "integer"
          }
      ]
    }
  ]