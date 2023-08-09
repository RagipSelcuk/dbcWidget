
export const ECU_MessagesView ={
	"type": "VerticalLayout",
	"elements": [
{
      "type": "Array",
      "title": "Messages",
      "items": {
        "type": "VerticalLayout",
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
         }		
	]
};	
	
	
export const messagesView = {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/typeId"
    },
    {
      "type": "Control",
      "scope": "#/properties/version"
    },
    {
      "type": "Array",
      "title": "Messages",
      "items": {
        "type": "VerticalLayout",
        "elements": [
          {
            "type": "Control",
            "scope": "#/items/properties/typeId"
          },
          {
            "type": "Control",
            "scope": "#/items/properties/id"
          },
          {
            "type": "Control",
            "scope": "#/items/properties/busSpeed"
          },
          {
            "type": "Control",
            "scope": "#/items/properties/name"
          },
          {
            "type": "Control",
            "scope": "#/items/properties/description"
          },
          {
            "type": "Array",
            "title": "Signals",
            "items": {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/items/properties/name"
                },
                {
                  "type": "Control",
                  "scope": "#/items/properties/endian"
                },
                {
                  "type": "Control",
                  "scope": "#/items/properties/startBit"
                },
                {
                  "type": "Control",
                  "scope": "#/items/properties/length"
                },
                {
                  "type": "Control",
                  "scope": "#/items/properties/signed"
                },
                {
                  // Add other controls for additional signal properties as needed
                }
              ]
            }
          }
        ]
      }
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
	'definitions':{
		
ECU_Messages:{
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "extended": { "type": "boolean" },
    "dlc": { "type": "integer" },
    "name": { "type": "string" },
    "sendingNode": { "type": "string" },
   } 	
},		
messages:{
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "extended": { "type": "boolean" },
    "dlc": { "type": "integer" },
    "name": { "type": "string" },
    "sendingNode": { "type": "string" },
    "signals": {
      "type": "array",
      "items": {
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
    "baseSignals": {
      "type": "array",
      "items": { "type": "object" } // Add the specific schema for base signals here
    },
    "multiplexSignals": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "signal": { "type": "object" }, // Add the specific schema for multiplex signals here
          "children": { "type": "array", "items": { "type": "object" } } // Add the specific schema for children here
        }
      }
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
    "signalGroups": {
      "type": "array",
      "items": { "type": "object" } // Add the specific schema for signal groups here
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