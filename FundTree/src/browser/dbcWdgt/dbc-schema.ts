
export const messagesView ={
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'label': 'Messages',
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
			'title': 'Messages',
			'properties':{
        		'typeId': {
          		'const': 'Messages'
        	},
        	'name': {
          		'type': 'string'
        	}				
			},
			'additionalProperties': false
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
	'$ref': '#/definitions/messages'
};