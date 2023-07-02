import { Command, ILogger, MessageService, URI } from "@theia/core";
import { OpenerService } from "@theia/core/lib/browser";
import { BinaryBuffer } from "@theia/core/lib/common/buffer";
import { SingleUriCommandHandler } from "@theia/core/lib/common/uri-command-handler";
import { inject, injectable } from "@theia/core/shared/inversify";
import { FileDialogService, OpenFileDialogProps } from "@theia/filesystem/lib/browser";
import { FileService } from "@theia/filesystem/lib/browser/file-service";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import Dbc from "../dbc/Dbc";






export const DbcFileCommand: Command = {
    id: 'DbcFileCommand.dbcFileLoad',
    label: 'Dbc File Load'
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
        
        this.logger.info('Target Uri Address: ',targetUri);
        
        
        let dbcContent = 'string';
        if(extensionUri)
        {
				
			if(extensionUri.path.ext == '.dbc')
			{
				
			this.logger.info('File dir',extensionUri.toString(true));
			
			// read the dbc as a string value
			dbcContent = (await this.fileService.read(extensionUri)).value;
			const dbc = new Dbc();
			const rawData = dbc.load(dbcContent,false);
			this.logger.info('DBC Raw Data',rawData.description);
			dbc.toJson({pretty: true});
			const contentBuffer = BinaryBuffer.fromString(dbc.toJson({pretty: true}));
            this.fileService.createFile(targetUri, contentBuffer)
                .then(_ => this.openerService.getOpener(targetUri))
                .then(openHandler => openHandler.open(targetUri));
			
			
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