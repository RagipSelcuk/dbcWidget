import { inject, injectable } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { CommonMenus } from '@theia/core/lib/browser';

export const minExtensionCommand: Command ={
    id:'minExtension.command',
    label:'This is Message Label'
};
@injectable()
export class minExtensionCommandContribution implements CommandContribution{
    constructor(
        @inject(MessageService) private readonly messageService : MessageService,
    ){
    }

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(minExtensionCommand,{
            execute:() => this.messageService.info('This is my message')
        });
    }

}

@injectable()
// Add contribution interface to be implemented, e.g. "MinExtensionContribution implements CommandContribution"
export class minExtensionMenuContribution implements MenuContribution{

    registerMenus(menus: MenuModelRegistry): void {
        
        menus.registerMenuAction(CommonMenus.HELP,{
            commandId: minExtensionCommand.id,
            label: minExtensionCommand.label
        });


    }
}


