export const messageCanListView = {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Group",
      "label": "Messages",
      "elements": [
        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/messages" // Update the scope to reference the messages array
            }
          ]
        }
      ]
    }
  ]
};


export const messagesView = {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Group",
      "label": "Message",
      "elements": [
            {
              "type": "Control",
              "scope": "#/properties/id"
            },
            {
              "type": "Control",
              "scope": "#/properties/extended"
            },
            {
              "type": "Control",
              "scope": "#/properties/dlc"
            },
            {
              "type": "Control",
              "scope": "#/properties/name"
            },
            {
              "type": "Control",
              "scope": "#/properties/sendingNode"
            }
      ]
    }
  ]
};


export const signalsView = { 

  "type": "VerticalLayout",
  "elements": [
    {
      "type": "HorizontalLayout",
      "elements": [
 {
      "type": "Control",
      "scope": "#/properties/endian"
    },
    {
      "type": "Control",
      "scope": "#/properties/startBit"
    },
    {
      "type": "Control",
      "scope": "#/properties/length"
    },
    {
      "type": "Control",
      "scope": "#/properties/signed"
    },
    {
      "type": "Control",
      "scope": "#/properties/max"
    },
    {
      "type": "Control",
      "scope": "#/properties/min"
    },
    {
      "type": "Control",
      "scope": "#/properties/factor"
    },
    {
      "type": "Control",
      "scope": "#/properties/offset"
    }    
    
    
],
    },
    
    // Add other controls for additional signal properties as needed
  ]
};



export const dbcSchema = {
  "type": "object",
  "definitions": {
	
 "messages": {
      "type": "array", // Change the type to array
      "items": { "$ref": "#/definitions/message" } // Change the reference name
    },
	

    "message": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "dlc": { "type": "integer"},
        "id": { "type": "integer" },
        "sendingNode": { "type": "string" },
        "extended": { "type": "boolean" },
      }
    },
	  
    "signals": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "endian": { "type": "string", "enum": ["Intel", "BigEndian"] },
        "startBit": { "type": "integer" },
        "length": { "type": "integer" },
        "signed": { "type": "boolean" },
    "max": { "type": "number" },
    "min": { "type": "number" },
    "factor": { "type": "number" },
    "offset": { "type": "number" },
    "multiplex": { "type": "string" },
    "multiplexer": { "type": "boolean" },
    "receivingNodes": { "type": "array", "items": { "type": "string" } },
    "unit": { "type": "string" },
    "valueTable": {
      "type": "object",
      "additionalProperties": { "type": "string" }
    },
    "description": { "type": ["string", "null"] },
    "attributes": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "type": { "type": "string" },
          "dataType": { "type": "string" },
          "options": { "type": "array", "items": { "type": "string" } },
          "defaultValue": { "type": "string" },
          "value": { "type": "string" },
          "min": { "type": "number" },
          "max": { "type": "number" }
        }
      }
    },
    "dataType": { "type": "string" }
      }
    }    
  }
};
