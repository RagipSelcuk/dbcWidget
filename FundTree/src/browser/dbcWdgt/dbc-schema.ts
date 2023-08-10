	
export const messagesView = {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Array",
      "scope": "#/messages",
      "elements": [
        {
          "type": "Group",
          "label": "Message",
          "elements": [
            {
              "type": "Control",
              "scope": "#/messages/items/properties/id"
            },
            {
              "type": "Control",
              "scope": "#/messages/items/properties/extended"
            },
            {
              "type": "Control",
              "scope": "#/messages/items/properties/dlc"
            },
            {
              "type": "Control",
              "scope": "#/messages/items/properties/name"
            },
            {
              "type": "Control",
              "scope": "#/messages/items/properties/sendingNode"
            }
            // Add more controls for other properties as needed
          ]
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
  "properties": {
    "version": { "type": "string" },
    "messages": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "integer" },
          "extended": { "type": "boolean" },
          "dlc": { "type": "integer" },
          "name": { "type": "string" },
          "sendingNode": { "type": "string" },
          "signals": {
            "type": "array",
            "items": { "$ref": "#/definitions/signals" }
          }
        },
        "required": ["id", "extended", "dlc", "name", "sendingNode"]
      }
    },
    // Add other properties from your data as needed
  },
  "definitions": {
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
  },
  "required": ["version", "messages"]
};

/*
export const dbcSchema = {
	'definitions':{
		
'messages':{
 
 
  "type": "object",
  "properties": {
    "messages": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "integer" },
          "extended": { "type": "boolean" },
          "dlc": { "type": "integer" },
          "name": { "type": "string" },
          "sendingNode": { "type": "string" }
          // Add more properties as needed
        },
        "required": ["id", "extended", "dlc", "name", "sendingNode"]
      }
    }
  }

 
 
},
	
'signals':{
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
},

		
	},	
	
};

*/