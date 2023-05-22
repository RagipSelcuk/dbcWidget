/* See https://jsonforms.io for more information on how to configure data and ui schemas. */

export const controlUnitView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Group',
      'label': 'Processor',
      'elements': [
        {
          'type': 'VerticalLayout',
          'elements': [
            {
              'type': 'HorizontalLayout',
              'elements': [
                {
                  'type': 'VerticalLayout',
                  'elements': [
                    {
                      'type': 'Control',
                      'label': 'Vendor',
                      'scope': '#/properties/processor/properties/vendor'
                    },
                    {
                      'type': 'Control',
                      'label': 'Clock Speed',
                      'scope': '#/properties/processor/properties/clockSpeed'
                    }
                  ]
                },
                {
                  'type': 'VerticalLayout',
                  'elements': [
                    {
                      'type': 'Control',
                      'label': 'Number Of Cores',
                      'scope': '#/properties/processor/properties/numberOfCores'
                    },
                    {
                      'type': 'Control',
                      'label': 'Enable Advanced Configuration',
                      'scope': '#/properties/processor/properties/advancedConfiguration'
                    }
                  ]
                }
              ]
            },
            {
              'type': 'Group',
              'label': 'Advanced Configuration',
              'elements': [
                {
                  'type': 'HorizontalLayout',
                  'elements': [
                    {
                      'type': 'Control',
                      'label': 'Socketconnector Type',
                      'scope': '#/properties/processor/properties/socketconnectorType',
                      'rule': {
                        'effect': 'DISABLE',
                        'condition': {
                          'scope': '#/properties/processor/properties/advancedConfiguration',
                          'schema': {
                            'const': false
                          }
                        }
                      }
                    },
                    {
                      'type': 'Control',
                      'label': 'Manufacturing Process',
                      'scope': '#/properties/processor/properties/manufactoringProcess',
                      'rule': {
                        'effect': 'DISABLE',
                        'condition': {
                          'scope': '#/properties/processor/properties/advancedConfiguration',
                          'schema': {
                            'const': false
                          }
                        }
                      }
                    },
                    {
                      'type': 'Control',
                      'label': 'Thermal Design Power',
                      'scope': '#/properties/processor/properties/thermalDesignPower',
                      'rule': {
                        'effect': 'DISABLE',
                        'condition': {
                          'scope': '#/properties/processor/properties/advancedConfiguration',
                          'schema': {
                            'const': false
                          }
                        }
                      }
                    }
                  ]
                }
              ],
            }
          ]
        }
      ]
    },
    {
      'type': 'Group',
      'label': 'Display',
      'elements': [
        {
          'type': 'HorizontalLayout',
          'elements': [
            {
              'type': 'Control',
              'label': 'Width',
              'scope': '#/properties/display/properties/width'
            },
            {
              'type': 'Control',
              'label': 'Height',
              'scope': '#/properties/display/properties/height'
            }
          ]
        }
      ]
    },
    {
      'type': 'Group',
      'label': 'Dimension',
      'elements': [
        {
          'type': 'HorizontalLayout',
          'elements': [
            {
              'type': 'Control',
              'label': 'Width',
              'scope': '#/properties/dimension/properties/width'
            },
            {
              'type': 'Control',
              'label': 'Height',
              'scope': '#/properties/dimension/properties/height'
            },
            {
              'type': 'Control',
              'label': 'Length',
              'scope': '#/properties/dimension/properties/length'
            }
          ]
        }
      ]
    },
    {
      'type': 'Group',
      'label': 'Additional Information',
      'elements': [
        {
          'type': 'Control',
          'label': 'User Description',
          'scope': '#/properties/userDescription',
          "options": {
            "multi": true
          }
        }
      ]
    },

  ]
};
// UI Schema
export const myComponentView ={
    'type': 'VerticalLayout',
    'elements': [
    { 
    'type': 'Group',
    'label': 'Chalkboard',
    'elements': [
      {
        'type': 'Control',
        'label': 'Table View',
        'scope': '#/properties/mapacity', // Table view ( Array ) uischema
        "options": {
            "showSortButtons": true
          }        
      }
    ]
   },
   {
    'type': 'Group',
    'label': 'Information',
    'elements': [
        {  
        'type': 'HorizontalLayout',
        'elements': [
          {
            'type': 'Control',
            'label': 'User Selection',
            'scope': '#/properties/userDescription',         
            "options": {
                "multi": true // Wide Text Box uischema
              }            
          },
        {
            "type": "Control",
            'label': 'Dropbox',
            "scope": "#/properties/dropbox",
            "options": {
                "autocomplete": true    // Dropbox feature uischema
            }        
        }      
    ]  
    }
    ]
  }, 
  {
    'type': 'Group',
    'label': 'Box Selections',
    'elements': [
        {  
            "type": "Control",
            "label": "Check the box?",
            "scope": "#/properties/checkbox" // Checkbox uiSchema
          },
          {
            "type": "Control", 
            "label": "Hide/Show Condition",// https://jsonforms.io/docs/uischema/rules/
            "scope": "#/properties/hideshow",
            "rule": {
              "effect": "HIDE", // HIDE / SHOW / ENABLE / DISABLE
              "condition": {
                "scope": "#/properties/checkbox", // "scope": "<UI Schema scope>",
                "schema": { // "schema": JSON Schema
                  "const": false
                }
              }
            }
          },
          {
            "type": "Control",      // Rating Star uiSchema
            "scope": "#/properties/rating"
          }            
        ]
}
]
  };

export const machineView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'label': 'Name',
      'scope': '#/properties/name'
    }
  ]
};

export const brewingView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'label': 'Temperature (°C)',
      'scope': '#/properties/temperature'
    }
  ]
};
export const dripTrayView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'label': 'Material',
      'scope': '#/properties/material'
    }
  ]
};

export const waterTankView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'label': 'Capacity (ml)',
      'scope': '#/properties/capacity'
    }
  ]
};

export const multiComponentView = {
  'type': 'HorizontalLayout',
  'elements': [
    {
      'type': 'Control',
      'label': 'Width (mm)',
      'scope': '#/properties/width'
    },
    {
      'type': 'Control',
      'label': 'Height (mm)',
      'scope': '#/properties/height'
    },
    {
      'type': 'Control',
      'label': 'Length (mm)',
      'scope': '#/properties/length'
    }


  ]
};
  // UI Schema
export const myCollapsableCompView = {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/comments",
        "options": {
          "elementLabelProp": "name",
          "detail": {
            "type": "VerticalLayout",
            "elements": [
              {
                "type": "Control",
                "scope": "#/properties/message"
              },
              {
                "type": "Control",
                "scope": "#/properties/name"
              }
            ]
          }
        }
      }
    ]    
};

export const coffeeSchema = {
  'definitions': {
    'machine': {
      'title': 'Machine',
      'properties': {
        'typeId': {
          'const': 'Machine'
        },
        'name': {
          'type': 'string',
          'minLength': 3,
          'maxLength': 20
        }
      },
      'required': [ 'name' ],
      'additionalProperties': false
    },
    'multicomponent': {
      'title': 'Multi Component',
      'properties': {
        'typeId': {
          'const': 'MultiComponent'
        },
        'width': {
          'type': 'number'
        },
        'length': {
          'type': 'number'
        },
        'height': {
          'type': 'number'
        }
      },
      'required': [
        'width',
        'length',
        'height'
      ],
      'additionalProperties': false
    },
    'controlunit': {
      'title': 'Control Unit',
      'type': 'object',
      'properties': {
        'typeId': {
          'const': 'ControlUnit'
        },
        'processor': {
          '$ref': '#/definitions/processor'
        },
        'dimension': {
          '$ref': '#/definitions/dimension'
        },
        'display': {
          '$ref': '#/definitions/display'
        },
        'userDescription': {
          'type': 'string'
        }
      },
      'additionalProperties': false,
      'required': [
        'processor',
        'dimension',
      ]
    },
    'brewingunit': {
      'title': 'Brewing Unit',
      'properties': {
        'typeId': {
          'const': 'BrewingUnit'
        },
        'temperature': {
          'type': 'number',
          'default': 92.5,
          'maximum': 100
        }
      },
      'additionalProperties': false
    },
    'driptray': {
      'title': 'Drip Tray',
      'properties': {
        'typeId': {
          'const': 'DripTray'
        },
        'material': {
          'type': 'string',
          'enum': [
            'aluminium',
            'plastic',
            'steel'
          ]
        }
      },
      'additionalProperties': false
    },
    'watertank': {
      'title': 'Water Tank',
      'properties': {
        'typeId': {
          'const': 'WaterTank'
        },
        'capacity': {
          'type': 'integer',
          'minimum': 50
        }
      },
      'required': [ 'capacity' ],
      'additionalProperties': false
    },
    'processor': {
      'type': 'object',
      'title': 'Processor',
      'properties': {
        'typeId': {
          'const': 'Processor'
        },
        'vendor': {
          'type': 'string',
          'minLength': 3,
        },
        'clockSpeed': {
          'type': 'integer'
        },
        'numberOfCores': {
          'type': 'integer',
          'minimum': 1,
          'maximum': 16
        },
        'advancedConfiguration': {
          'type': 'boolean'
        },
        'socketconnectorType': {
          'type': 'string',
          'enum': [
            'A1T',
            'Z51'
          ]
        },
        'thermalDesignPower': {
          'type': 'integer'
        },
        'manufactoringProcess': {
          'type': 'string',
          'enum': [
            '18nm',
            '25nm'
          ]
        }
      },
      'required': [
        'vendor',
        'clockSpeed'
      ],
      'additionalProperties': false
    },
    'dimension': {
      'title': 'Dimension',
      'type': 'object',
      'properties': {
        'typeId': {
          'const': 'Dimension'
        },
        'width': {
          'type': 'integer',
          'minimum': 1
        },
        'height': {
          'type': 'integer',
          'minimum': 1
        },
        'length': {
          'type': 'integer',
          'minimum': 1
        }
      },
      'required': [
        'width',
        'height',
        'length'
      ],
      'additionalProperties': false
    },
    'ram': {
      'title': 'RAM',
      'type': 'object',
      'properties': {
        'typeId': {
          'const': 'RAM'
        },
        'clockSpeed': {
          'type': 'integer'
        },
        'size': {
          'type': 'integer'
        },
        'type': {
          'type': 'string',
          'enum': [
            'SODIMM',
            'SIDIMM'
          ]
        }
      },
      'additionalProperties': false
    },
    'display': {
      'type': 'object',
      'title': 'Display',
      'properties': {
        'typeId': {
          'const': 'Display'
        },
        'width': {
          'type': 'integer',
          'minimum': 1
        },
        'height': {
          'type': 'integer',
          'minimum': 1
        }
      },
      'required': [
        'width',
        'height'
      ],
      'additionalProperties': false
    },

      'myComponent': {
        'title':'myComponent',
        "properties":{
            'typeId': {
                'const': 'MyComponent'
              },            
              'mapacity': {
                'type': 'array', // Table view (array) Schema
                'items':{
                    'type':'object',
                    'properties':{
                        'name':{
                            'type':'string'
                        },
                        'message':{
                            'type':'string'
                        }    
                    }
                }
              },
              'userDescription': {// Wide Text Box Schema
                'type': 'string'             
              },
              'dropbox':{
                'type': 'string', // Dropbox feature Schema
                enum:[
                    "Beni Seç",
                    "Onu Seç"
                ]
              },
              "checkbox": { // Checkbox Schema
                "type": "boolean"
              },
              "hideshow": { // onSelect event Schema
                "type": "string",
                "enum": [
                  "All",
                  "Some",
                  "Only one"
                ]
              },
              "rating": { // rating Star Schema
                "type": "integer",
                "minimum": 0,
                "maximum": 5
              }                                          
        },
       'additionalProperties': false
      },

      'myCollapsableComp': {
        'title':'myCollapsableComp',
        'properties':{
                'typeId':{
                    'const': 'myCollapsableComp'
                },
                "comments": {
                    "type": "array",
                    "title": "Comments",
                    "items": {
                      "type": "object",
                      "properties": {
                        "message": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        }
                      }
                    }                
             }
        }

      }
      
  },
  '$ref': '#/definitions/machine'
};
