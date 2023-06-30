
export const messagesView ={
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'label': 'Messages',
      'scope': '#/properties/messages'
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




export const dbcSchema = {
	'definitions':{
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
	}	
};