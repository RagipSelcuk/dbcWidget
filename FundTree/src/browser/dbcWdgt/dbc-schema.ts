


export const messagesView = {
  "type": "VerticalLayout",
  "elements": [
    { // Message Definitions
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
              "scope": "#/properties/id",
            },
            {
              "type": "Control",
              "label": 'DLC',
              "scope": "#/properties/dlc"
            }
      ]
    },
    { // Message Signals 
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
    { // Message Transmitters 
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
    { // Message Receivers 
      "type": "Group",
      "label": "Receivers",
      "elements": [
  
		]		
	},
    { // Message Layout 
      "type": "Group",
      "label": "Layout",
      "elements": [
		]		
	},
    { // Message Attributes 
      "type": "Group",
      "label": "Attributes",
      "elements": [
		]		
	},
    { // Message Comment 
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
    { // Signal Definitions
      "type": "Group",
      "label": "Definition",
      "elements": [
            {
              "type": "Control",
              "label": 'Name:',
              "scope": "#/properties/name"
            },
            {
              "type": "Control",
              "label": 'Length[Bit]:',
              "scope": "#/properties/length"
            },
            {
              "type": "Control",
              "label": 'Byte Order:', // Intel , Motorola
              "scope": "#/properties/endian",
            },
            {
              "type": "Control",
              "label": 'Unit:',
              "scope": "#/properties/unit"
            },
            {
              "type": "Control",
              "label": 'Value Type:', // Signed , Unsigned
              "scope": "#/properties/signed"
            },
            {
              "type": "Control",
              "label": 'Data Type:', 
              "scope": "#/properties/dataType"
            },
            
            {
              "type": "Control",
              "label": 'Factor:', 
              "scope": "#/properties/factor"
            },
            {
              "type": "Control",
              "label": 'Offset:', 
              "scope": "#/properties/offset"
            },
            {
              "type": "Control",
              "label": 'Minimum:', 
              "scope": "#/properties/min"
            },
            {
              "type": "Control",
              "label": 'Maximum:', 
              "scope": "#/properties/max"
            }
      ]
    },
    { // Signal Receivers
      "type": "Group",
      "label": "Receivers",
      "elements": [
		  {
              "type": "Control",
              "label": "",
              "scope": "#/properties/receivingNodes"			  
		  }				  
		]		
	},
    /*{ // Signal Attributes  couldn't find a way to display the enum (comboList) in a cell!!
      "type": "Group",
      "label": "Attributes",
      "elements": [
		  {
			  "type": "Control",
			  "label": "",
			  "scope": "#/properties/attributes",
			  "options": {
        		    "enum": { "$data": "options" } // Dynamic enum values from JSON data
        	  }
		  }
		]		
	},*/
    { // Signal Value Descriptions
      "type": "Group",
      "label": "Value Descriptions",
      "elements": [
			{
          "type": "Control",
          "scope": "#/properties/valueTable"			
			}
		]		
	},
    { // Signal Comment
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
}





export const dbcSchema = {
  "type": "object",
  "definitions": {


    "messages": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "dlc": { "type": "integer"},
        "id": { "type": "integer" }, // The ID should be displayed in Hexadecimal Format
        "sendingNode": { "type": "string" },
        "extended": { "type": "boolean" }, // Here, we intend to display "CAN Extended" if the value is "true"; otherwise, it should display "CAN Standard".
        "description": { "type": "string" },
	    "signals": {
	      "type": "array",
	      "items": {
	        "type": "object",
	        "properties": {
		        "name": { "type": "string", "title": "Signal" },
		        "startBit": { "type": "integer" , "title": "Startbit"},
		        "length": { "type": "integer" , "title": "Length[Bit]"},
		        "endian": { "type": "string", "enum": ["Intel", "BigEndian"], "title": "Byte Order" },
		        "signed": {
			      "type": "boolean",
			      "title": "Value Type",
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
	"valueTable":{
		"type": "array",
		"items": {
			"type":"object",
			"properties": {
				"key": { "type": "number", "title": "Value" },
				"value": { "type": "string" , "title": "Description"}
			}
		}
	},
    "description": { "type": ["string", "null"] },
    "attributes": {		//  couldn't find a way to display the enum (comboList) in a cell!!
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "type": { "type": "string" },
          "dataType": { "type": "string" },
          "options": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "defaultValue": { "type": "string" },
          "value": { "type": "string" },
          "min": { "type": "number" },
          "max": { "type": "number" }
        }
      }
    },
    "dataType": { "type": "string", "enum": ["uint8", "uint16","uint32","int8", "int16","int32" ] }
      }
    }    
  }
};
