
	
export const messagesView = {

  'type': 'VerticalLayout',
  "elementLabelProp": "name",
	  
	  'elements': [
	    {
	      'type': 'Control',
	      'label': 'Name',
	      'scope': '#/properties/name'
	    },
	    {
	      'type': 'Control',
	      'label': 'Id',
	      'scope': '#/properties/id'
	    },
	    {
			
	      'type': 'Control',
	      'label': 'Description',
	      'scope': '#/properties/description'
			
		},
		{
	      'type': 'Control',
	      'label': 'Bus Speed',
	      'scope': '#/properties/busSpeed'
		},
		{
		  "type": "VerticalLayout",
  		  "elements": [
    		{
      			"type": "Control",
      			"scope": "#/properties/signals"
    		}
  			]
		}

	  ]	

	
};


export const signalsView = {
  'type': 'VerticalLayout',
  "elementLabelProp": "name",
  'elements': [
    {
      'type': 'Control',
      'label': 'Name',
      'scope': '#/properties/name'
    },
    {
      'type': 'Control',
      'label': 'Endian',
      'scope': '#/properties/endian'
    }
  ]	
};


export const machineView = {
  'type': 'VerticalLayout',
  "elementLabelProp": "version",
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
      'title': 'ECU',
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
			"name": {
            	"type": "string"
	        },
    		"id": {
            	"type": "integer"
            },
    		"busSpeed": {
            	"type": "integer"
            },
            "description":{
				"type": "string"	
			},
			'signals': {
          		'$ref': '#/definitions/signals'
        	}                     
           }			
		},
		'signals':{
//			"type": "object",
			'title': 'Signals',
			'properties':{
				'typeId': {
          			'const': 'Signals'
      //    			"type": "array"
        		},
        			
				"items": {
					//"type": "object",
					"properties": {
				'typeId': {
          			'const': 'Signals',
        		},
        								
				        	"name": {
          						'type': 'string'
        					},
        					"endian":{
								'type': 'string'
							}		
					}			
			 }	
		   }		
		}
	},	
	'$ref': '#/definitions/machine'
};