

export const messagesView = {
  "type": "VerticalLayout",
  "elements": [
    { // Definitions
      "type": "Group",
      "label": "Definition",
      "elements": [
            {
              "type": "Control",
              "label": 'Name',
              "scope": "#/properties/name"
            },
            {
              "type": "Control",
              "label": 'Type',
              "scope": "#/properties/extended"
            },
            {
              "type": "Control",
              "label": 'ID',
              "scope": "#/properties/id"
            },
            {
              "type": "Control",
              "label": 'DLC',
              "scope": "#/properties/dlc"
            }
      ]
    },
    { // Signals 
      "type": "Group",
      "label": "Signals",
      "elements": [
		  {
              "type": "Control",
              "label": "",
              "scope": "#/properties/signals"			  			  
		  }
		]		
	},
    { // Transmitters 
      "type": "Group",
      "label": "Transmitters",
      "elements": [
		  {
              "type": "Control",
              "label": "",
              "scope": "#/properties/sendingNode"			  
		  }
		]		
	},
    { // Receivers 
      "type": "Group",
      "label": "Receivers",
      "elements": [
		]		
	},
    { // Layout 
      "type": "Group",
      "label": "Layout",
      "elements": [
		]		
	},
    { // Attributes 
      "type": "Group",
      "label": "Attributes",
      "elements": [
		]		
	},
    { // Comment 
      "type": "Group",
      "label": "Comment",
      "elements": [{
            "type": "Control",
            "label": "",
	  		"scope": "#/properties/description",         
			"options": {
	                "multi": true // Wide Text Box uischema
	         }            
		  
		}
		]
	}
  ] // end of elements
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
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "dlc": { "type": "integer"},
        "id": { "type": "integer" },
        "sendingNode": { "type": "string" },
        "extended": { "type": "boolean" },
        "description": { "type": "string" },
	    "signals": {
	      "type": "array",
	      "items": {
	        "type": "object",
	        "properties": {
		        "name": { "type": "string" },
		        "endian": { "type": "string", "enum": ["Intel", "BigEndian"] },
		        "startBit": { "type": "integer" },
		        "length": { "type": "integer" },
		        "signed": {
			      "type": "boolean",
			      "enum": [true, false]	// Here, we intend to display "Signed" if the value is "true"; otherwise, it should display "Unsigned".
			    }
	        }
	      }
	    },
        
      },
      'additionalProperties': false,
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
