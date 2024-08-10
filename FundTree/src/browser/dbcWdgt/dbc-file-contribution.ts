import { ILogger, QuickInputService, SelectionService } from "@theia/core";
import { CommonCommands } from "@theia/core/lib/browser";
import { CommandContribution, CommandRegistry } from "@theia/core/lib/common/command";
import { MAIN_MENU_BAR, MenuContribution, MenuModelRegistry } from "@theia/core/lib/common/menu";
import { inject, injectable } from "@theia/core/shared/inversify";
import { WorkspaceRootUriAwareCommandHandler, WorkspaceService } from "@theia/workspace/lib/browser";
import DbcUpdateData from "../update/dbc-update-data";
import { DbcFileCommand, DbcFileCommandHandler, DbcRawFileCommand, DbcRawFileCommandHandler } from "./dbc-file-command";
import { DbcModelService } from "./dbc-model-service";
import { FileService } from "@theia/filesystem/lib/browser/file-service";



export const DBC_EDITOR_MAIN_MENU = [...MAIN_MENU_BAR, '10_dbceditormenu'];





@injectable()
export class DbcFileCommandContribution implements CommandContribution{ 
    private readonly modelService:DbcModelService;
	constructor(
        @inject(SelectionService)
        private readonly selectionService: SelectionService,
        @inject(WorkspaceService)
        private readonly workspaceService: WorkspaceService,	
        @inject(DbcFileCommandHandler)
        private readonly dbcFileHandler: DbcFileCommandHandler,
        @inject(DbcRawFileCommandHandler)
        private readonly dbcRawFileHandler: DbcRawFileCommandHandler,        
        @inject(ILogger) readonly logger: ILogger,
        @inject(QuickInputService)
        protected readonly quickInputService: QuickInputService,
        @inject(DbcModelService)  modelService:DbcModelService,
        @inject(FileService) private readonly fileService: FileService
	){modelService=this.modelService;
    }
	
	
	
    registerCommands(commands: CommandRegistry): void {
    	commands.registerCommand(DbcFileCommand,
          new WorkspaceRootUriAwareCommandHandler(
              this.workspaceService,
              this.selectionService,
              this.dbcFileHandler
          )
    	);
    	
    	
    	// added to validation of generated json raw file 
       	commands.registerCommand(DbcRawFileCommand,
          new WorkspaceRootUriAwareCommandHandler(
              this.workspaceService,
              this.selectionService,
              this.dbcRawFileHandler
          )
    	);

    	  // Override the existing Save command
          commands.registerHandler(CommonCommands.SAVE.id, {
            execute: () => {
                this.logger.info('Save command executed');
                const dbcUpdateData = new DbcUpdateData(this.logger,this.fileService);
                dbcUpdateData.updateSchema();
                return Promise.resolve();
            },
            isEnabled: () => true,
            isVisible: () => true
        });
    }
    //DbcRawFileCommandHandler
	
}


@injectable()
export class DbcFileMenuContribution implements MenuContribution{ // it should binded as "bind(MenuContribution).to(DbcFileMenuContribution);""
	
	
    registerMenus(menus: MenuModelRegistry): void {
		
       

        menus.registerSubmenu(DBC_EDITOR_MAIN_MENU,'Dbc Editor');
        
        menus.registerMenuAction(DBC_EDITOR_MAIN_MENU,{
			commandId: DbcFileCommand.id,
			label:'Open Dbc File',
			order: '0'
		});
        
        menus.registerMenuAction(DBC_EDITOR_MAIN_MENU,{
			commandId: DbcRawFileCommand.id,
			label:'Open Dbc Raw File',
			order: '1'
		});
        
    }
	
}