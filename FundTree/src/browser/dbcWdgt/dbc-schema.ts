
export const messagesView ={
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      "scope": "#/properties/messageItems",
        "options": {
          "elementLabelProp": "name",
          "detail": {
            "type": "VerticalLayout",
            "elements": [
              {
                "type": "Control",
                "scope": "#/properties/name"
              },
              {
                "type": "Control",
                "scope": "#/properties/id"
              },
              {
                "type": "Control",
                "scope": "#/properties/description"
              },              
            ]
          }
        }      
    }
  ]
};

export const signalsView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'label': 'Signals',
      'scope': '#/properties/signals'
    }
  ]	
};

export const machineView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'label': 'Version',
      'scope': '#/properties/version'
    }
  ]
};



export const dbcSchema = {
	'definitions':{
    'machine': {
      'title': 'Machine',
      'properties': {
        'typeId': {
          'const': 'Machine'
        },
        'version': {
          'type': 'string',
          'minLength': 3,
          'maxLength': 20
        }
      },
      'additionalProperties': false
    },
		
		'messages':{
			'title': 'Messages',
			'properties':{
        		'typeId': {
          		'const': 'Message'
        	},
			"messageItems": {
                    "type": "array",
                    "title": "Comments",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "id": {
                          "type": "integer"
                        },
                        "description":{
							"type": "string"	
						}                     
                      }
                   }                
             }			
			},
		},
		'signals':{
			'title': 'Signals',
			'properties':{
        		'typeId': {
          		'const': 'Signals'
        	},
        	'name': {
          		'type': 'string'
        	}				
			},
			'additionalProperties': false			
		}
	},	
	'$ref': '#/definitions/machine'
};