import { BaseTreeEditorContribution, TreeEditor, MasterTreeWidget } from "@eclipse-emfcloud/theia-tree-editor";
import { ApplicationShell, OpenerService, WidgetOpenerOptions, NavigatableWidgetOptions } from "@theia/core/lib/browser";
import { inject, injectable } from "@theia/core/shared/inversify";
import { DbcEditorWidget } from "./dbcWdgt/dbc-editor-widget";
import { DbcModelService } from "./dbcWdgt/dbc-model-service";
import { TreeLabelProvider } from './tree/tree-label-provider';
import URI from '@theia/core/lib/common/uri';
import { CommandRegistry, MenuModelRegistry } from '@theia/core';

@injectable()
export class DbcContribution extends BaseTreeEditorContribution{
    @inject(ApplicationShell) protected shell: ApplicationShell;
    @inject(OpenerService) protected opener: OpenerService;
    
    constructor(
        @inject(DbcModelService) modelService: TreeEditor.ModelService,
        @inject(TreeLabelProvider) labelProvider: TreeLabelProvider
    ) {
        super(DbcEditorWidget.WIDGET_ID, modelService, labelProvider);
    }    

    readonly id = DbcEditorWidget.WIDGET_ID;
    readonly label = MasterTreeWidget.WIDGET_LABEL;
	
    canHandle(uri: URI): number {
        if (uri.path.ext === '.dbc') {
            return 1000;
        }
        return 0;
    }	
    registerCommands(commands: CommandRegistry): void {
        // register your custom commands here

        super.registerCommands(commands);
    }

    registerMenus(menus: MenuModelRegistry): void {
        // register your custom menu actions here

        super.registerMenus(menus);
    }

    protected createWidgetOptions(uri: URI, options?: WidgetOpenerOptions): NavigatableWidgetOptions {
        return {
            kind: 'navigatable',
            uri: this.serializeUri(uri)
        };
    }

    protected serializeUri(uri: URI): string {
        return uri.withoutFragment().toString();
    }	
	
}