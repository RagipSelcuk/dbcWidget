import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, SelectionService, MAIN_MENU_BAR } from '@theia/core/lib/common';
import { inject, injectable } from '@theia/core/shared/inversify';
import { WorkspaceRootUriAwareCommandHandler } from '@theia/workspace/lib/browser/workspace-commands';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { NewTreeExampleFileCommandHandler, NewTreeExampleFileCommand, OpenTreeExampleFileCommand, OpenExampleFileCommandHandler } from './example-file-command';





@injectable()
export class NewTreeExampleFileCommandContribution implements CommandContribution {

    constructor(
        @inject(SelectionService)
        private readonly selectionService: SelectionService,
        @inject(WorkspaceService)
        private readonly workspaceService: WorkspaceService,
        @inject(NewTreeExampleFileCommandHandler)
        private readonly newExampleFileHandler: NewTreeExampleFileCommandHandler,
        @inject(OpenExampleFileCommandHandler)
        private readonly openExampleFileHandler: OpenExampleFileCommandHandler
        
    ) { }

	

    registerCommands(registry: CommandRegistry): void {
      registry.registerCommand(NewTreeExampleFileCommand,
          new WorkspaceRootUriAwareCommandHandler(
              this.workspaceService,
              this.selectionService,
              this.newExampleFileHandler
          )
      );
      
      registry.registerCommand(OpenTreeExampleFileCommand,
          new WorkspaceRootUriAwareCommandHandler(
              this.workspaceService,
              this.selectionService,
              this.openExampleFileHandler
          )
      );
    }
    

    
    
}

/*
@injectable()
export class NewTreeExampleFileMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
		
		
        menus.registerSubmenu(TREE_EDITOR_MAIN_MENU, 'Tree Editor'); // Main Menu Visible Name as "Tree Editor"


        menus.registerMenuAction(TREE_EDITOR_MAIN_MENU, {
            commandId: NewTreeExampleFileCommand.id,
            label: 'New Example File'   // Sub-Menu visible name assignment as " New Example File"
        });
        
        menus.registerMenuAction(TREE_EDITOR_MAIN_MENU, {
            commandId: OpenTreeExampleFileCommand.id,
            label: 'Open Example File'   // Sub-Menu visible name assignment as " New Example File"
        });
        
        
        
    }
}
*/
@injectable()
export class NewTreeExampleFileMenuContribution implements MenuContribution{
	registerMenus(menus: MenuModelRegistry): void {
    const subMenuPath = [...MAIN_MENU_BAR, 'Tree-Menu'];
    menus.registerSubmenu(subMenuPath,'Tree Editor',{
		order:'7' // that should put the menu right next to the File menu
	});
	
	menus.registerMenuAction(subMenuPath,{
		commandId: NewTreeExampleFileCommand.id,
		label: 'New Example File',
		order: '0'
	});
    
    
    menus.registerMenuAction(subMenuPath,{
		commandId: OpenTreeExampleFileCommand.id,
		label: 'Open Example File',
		order: '1'
	});
	

}
}