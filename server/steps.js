export default [
    {
      "id":0,
      "operator_id": "load_int",
      "last_executed_at": undefined,
      "status": "new",
      "configuration": [
        {
          "value":1
        }
      ],
      "inputs": [
       
      ]
    },
    {
      "id":1,
      "operator_id": "increment_int",
      "last_executed_at": undefined,
      "status": "new",
      "configuration": [
        {
          "increment": true
        }
      ],
      "inputs": [
        {
            "other_step_id": 0,
            "other_step_type_output_id": "value",
            "step_type_input_id": "value"
          }
      ]
    },
    { "id":2,
      "operator_id": "increment_int",
      "last_executed_at": undefined,
      "status": "new",
      "configuration": [
        {
          "increment": false
        }
      ],
      "inputs": [
        {
            "other_step_id": 1,
            "other_step_type_output_id": "value",
            "step_type_input_id": "value"
          }
      ]
    },
    { "id":3,
      "operator_id": "increment_int",
      "last_executed_at": undefined,
      "status": "new",
      "configuration": [
        {
          "increment": true
        }
      ],
      "inputs": [
        {
            "other_step_id": 2,
            "other_step_type_output_id": "value",
            "step_type_input_id": "value"
          }
      ]
    },
  ]