
export const messagesView ={
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'label': 'Name',
      'scope': '#/properties/name'
    },
    {
      'type': 'Control',
      'label': 'Id',
      'scope': '#/properties/messageId'		
	},
	{
      'type': 'Control',
      'label': 'Extended',
      'scope': '#/properties/name'		
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
			'title': 'Message',
			'type': 'object',
			'properties':{
        		'typeId': {
          		'const': 'Message'
        	},
        	'name': {
          		'type': 'string'
        	},
           'messageId': {
          		'type': 'integer'
       		 },				
			},
			'additionalProperties': true
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