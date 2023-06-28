import { SelectionService } from "@theia/core";
import { CommandContribution, CommandRegistry } from "@theia/core/lib/common/command";
import { MAIN_MENU_BAR, MenuContribution, MenuModelRegistry } from "@theia/core/lib/common/menu";
import { inject, injectable } from "@theia/core/shared/inversify";
import { WorkspaceRootUriAwareCommandHandler, WorkspaceService } from "@theia/workspace/lib/browser";
import { DbcFileCommand, DbcFileCommandHandler } from "./dbc-file-command";




export const DBC_EDITOR_MAIN_MENU = [...MAIN_MENU_BAR, '9_dbceditormenu'];





@injectable()
export class DbcFileCommandContribution implements CommandContribution{ // it should be binded into the FundTree-frontend-module
	
	constructor(
        @inject(SelectionService)
        private readonly selectionService: SelectionService,
        @inject(WorkspaceService)
        private readonly workspaceService: WorkspaceService,	
        @inject(DbcFileCommandHandler)
        private readonly dbcFileHandler: DbcFileCommandHandler
	){
		
	}
	
	
	
    registerCommands(commands: CommandRegistry): void {
    	commands.registerCommand(DbcFileCommand,
          new WorkspaceRootUriAwareCommandHandler(
              this.workspaceService,
              this.selectionService,
              this.dbcFileHandler
          )
    	);
    
    }
	
}


@injectable()
export class DbcFileMenuContribution implements MenuContribution{ // it should binded as "bind(MenuContribution).to(DbcFileMenuContribution);""
	
	
    registerMenus(menus: MenuModelRegistry): void {
		
        menus.registerSubmenu(DBC_EDITOR_MAIN_MENU,'Dbc Editor');
        
        menus.registerMenuAction(DBC_EDITOR_MAIN_MENU,{
			commandId: DbcFileCommand.id,
			label:'Open Dbc File'
		});
        
        
    }
	
}