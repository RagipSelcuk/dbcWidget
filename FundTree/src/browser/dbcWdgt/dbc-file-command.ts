import { Command, ILogger, MessageService, URI } from "@theia/core";
import { OpenerService, SingleTextInputDialog } from "@theia/core/lib/browser";
import { BinaryBuffer } from "@theia/core/lib/common/buffer";
import { SingleUriCommandHandler } from "@theia/core/lib/common/uri-command-handler";
import { inject, injectable } from "@theia/core/shared/inversify";
import { FileDialogService, OpenFileDialogProps } from "@theia/filesystem/lib/browser";
import { FileService } from "@theia/filesystem/lib/browser/file-service";
import { FileSystemUtils } from "@theia/filesystem/lib/common";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import Dbc from "../dbc/Dbc";






export const DbcFileCommand: Command = {
    id: 'DbcFileCommand.dbcFileLoad',
    label: 'Dbc File Load'
};

export const DbcRawFileCommand: Command = {
	id: 'DbcRawFileCommand.dbcFileLoad',
	label: 'Dbc Raw File Load'	
};


export const properties: OpenFileDialogProps ={
	title: 'Dbc File Select',
	canSelectFiles: true,
	canSelectFolders: false,
	canSelectMany:false,
	filters:{ 'CAN Dbc Extensions (*.dbc)': ['dbc'] }
	
	
};

@injectable()
export class DbcFileCommandHandler implements SingleUriCommandHandler{
	
    constructor(
        @inject(OpenerService)
        protected readonly openerService: OpenerService,
        @inject(FileService)
        protected readonly fileService: FileService,
        @inject(ILogger)
        protected readonly logger: ILogger,
        @inject(WorkspaceService)
        protected readonly workspaceService: WorkspaceService,
        @inject(MessageService)
        protected readonly messageService: MessageService,
        @inject(FileDialogService)
        protected readonly fileDialogService: FileDialogService
    ) { }
    

    isEnabled() {
		return this.workspaceService.opened;
    }
	
	async execute(uri: URI) {
        const stat = await this.fileService.resolve(uri);
        if (!stat) {
            this.logger.error(`[DbcFileCommandHandler] Could not create file stat for uri`, uri);
            return;
        }

        const dir = stat.isDirectory ? stat : await this.fileService.resolve(uri.parent);
        if (!dir) {
            this.logger.error(`[DbcFileCommandHandler] Could not create file stat for uri`, uri.parent);
            return;
        }
        
        
        
        const extensionUri = await this.fileDialogService.showOpenDialog(properties);
        const targetUri = dir.resource.resolve('dbc_template.dbc');
        const preliminaryFileUri = FileSystemUtils.generateUniqueResourceURI(dir, targetUri, false);
        this.logger.info('Target Uri Address: ',targetUri);
        this.logger.info('Preliminary File Uri: ',preliminaryFileUri)
        
        let dbcContent = 'string';
        if(extensionUri)
        {
				
			if(extensionUri.path.ext == '.dbc')
			{
				
			this.logger.info('File dir',extensionUri.toString(true));
			
			// read the dbc as a string value
			dbcContent = (await this.fileService.read(extensionUri)).value;
			const dbc = new Dbc();
			
			this.logger.info('Dbc Empty Content\n',dbc.toJson({pretty: true}));
			const rawData = dbc.load(dbcContent,false);
			this.logger.info('DBC Raw Data',rawData.description);
			dbc.toJson({pretty: true});
			const contentBuffer = BinaryBuffer.fromString(dbc.toJson({pretty: true}));
			
            this.fileService.createFile(preliminaryFileUri, contentBuffer)
                .then(_ => this.openerService.getOpener(preliminaryFileUri))
                .then(openHandler => openHandler.open(preliminaryFileUri));
			
			
			// save as a json format
			
			// open and gather the uri address
			}
			else{
				this.messageService.error('The selected file is not a valid "*.dbc"');
				return;				
			}

		}
	}
	
}


@injectable()
export class DbcRawFileCommandHandler implements SingleUriCommandHandler{
	
    constructor(
        @inject(OpenerService)
        protected readonly openerService: OpenerService,
        @inject(FileService)
        protected readonly fileService: FileService,
        @inject(ILogger)
        protected readonly logger: ILogger,
        @inject(WorkspaceService)
        protected readonly workspaceService: WorkspaceService,
        @inject(MessageService)
        protected readonly messageService: MessageService,
        @inject(FileDialogService)
        protected readonly fileDialogService: FileDialogService
    ) { }
    

    isEnabled() {
		return this.workspaceService.opened;
    }
	
	async execute(uri: URI) {
        const stat = await this.fileService.resolve(uri);
        if (!stat) {
            this.logger.error(`[DbcFileCommandHandler] Could not create file stat for uri`, uri);
            return;
        }

        const dir = stat.isDirectory ? stat : await this.fileService.resolve(uri.parent);
        if (!dir) {
            this.logger.error(`[DbcFileCommandHandler] Could not create file stat for uri`, uri.parent);
            return;
        }
        
        const targetUri = dir.resource.resolve('a.dbc');
        const preliminaryFileUri = FileSystemUtils.generateUniqueResourceURI(dir, targetUri, false);
        const dialog = new SingleTextInputDialog({
            title: 'New Dbc Raw File',
            initialValue: preliminaryFileUri.path.base
        });

        const fileName = await dialog.open();
        if (fileName) {
            const fileUri = dir.resource.resolve(fileName);
            const contentBuffer = BinaryBuffer.fromString(JSON.stringify(defaultRawData, null, 2));
            this.fileService.createFile(fileUri, contentBuffer)
                .then(_ => this.openerService.getOpener(fileUri))
                .then(openHandler => openHandler.open(fileUri));
        }
        
        
	}
	
}

const defaultRawData ={
  "version": "1.0",
  "children": [
    {
      "id": 4321,
      "extended": true,
      "dlc": 2,
      "name": "CANMultiplexed",
      "sendingNode": "Node0",
      "signals": [
        {
          "name": "Value1",
          "endian": "Intel",
          "startBit": 8,
          "length": 8,
          "signed": false,
          "max": 0,
          "min": 0,
          "factor": 1,
          "offset": 0,
          "multiplex": "m1",
          "multiplexer": false,
          "receivingNodes": [
            "Node1"
          ],
          "unit": "",
          "valueTable": {
            "0": "Zero",
            "1": "One",
            "2": "Two",
            "3": "Three"
          },
          "description": null,
          "attributes": [],
          "dataType": "uint8"
        },
        
        {
          "name": "Multiplexer",
          "endian": "Intel",
          "startBit": 0,
          "length": 8,
          "signed": false,
          "max": 0,
          "min": 0,
          "factor": 1,
          "offset": 0,
          "multiplex": "M",
          "multiplexer": true,
          "receivingNodes": [
            "Node0"
          ],
          "unit": "",
          "valueTable": null,
          "description": null,
          "attributes": [],
          "dataType": "uint8"
        }
      ],
      
    },
    {
      "id": 1234,
      "extended": false,
      "dlc": 8,
      "name": "CANMessage",
      "sendingNode": "Node0",
      "signals": [
        {
          "name": "Signal1",
          "endian": "Intel",
          "startBit": 32,
          "length": 32,
          "signed": false,
          "max": 100,
          "min": 0,
          "factor": 100,
          "offset": 0,
          "multiplex": "",
          "multiplexer": false,
          "receivingNodes": [
            "Node1",
            "Node2"
          ],
          "unit": "%",
          "valueTable": null,
          "description": null,
          "attributes": [],
          "dataType": "uint32"
        },
        {
          "name": "Signal0",
          "endian": "Intel",
          "startBit": 0,
          "length": 32,
          "signed": true,
          "max": 0,
          "min": 0,
          "factor": 1,
          "offset": 0,
          "multiplex": "",
          "multiplexer": false,
          "receivingNodes": [
            "Node1",
            "Node2"
          ],
          "unit": "",
          "valueTable": null,
          "description": "First signal in this message",
          "attributes": [
            {
              "name": "SGEnumAttribute",
              "type": "Signal",
              "dataType": "ENUM",
              "options": [
                "Val0",
                "Val1",
                "Val2"
              ],
              "defaultValue": "Val0",
              "value": "2",
              "min": null,
              "max": null
            }
          ],
          "dataType": "int32"
        }
      ],

    }
  ],
  "description": "DBC Template with multi-",
  "busSpeed": null,
  "nodes": [
    {
      "name": "Node2",
      "description": null,
      "attributes": []
    },
    {
      "name": "Node1",
      "description": null,
      "attributes": []
    },
    {
      "name": "Node0",
      "description": "The 0th Node",
      "attributes": [
        {
          "name": "BUIntAttribute",
          "type": "Node",
          "dataType": "INT",
          "options": null,
          "defaultValue": "50",
          "value": "100",
          "min": 0,
          "max": 100
        }
      ]
    }
  ]
 
}