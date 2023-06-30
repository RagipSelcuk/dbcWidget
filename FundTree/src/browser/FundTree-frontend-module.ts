import '@eclipse-emfcloud/theia-tree-editor/style/index.css';
import '@eclipse-emfcloud/theia-tree-editor/style/forms.css';
import '../../src/browser/style/editor.css';

import { CommandContribution, MenuContribution } from '@theia/core';
import { LabelProviderContribution, NavigatableWidgetOptions, OpenHandler, WidgetFactory } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { ContainerModule } from '@theia/core/shared/inversify';
import { TreeContribution } from './tree-contribution';
import { TreeModelService } from './tree/tree-model-service';
import { TreeNodeFactory } from './tree/tree-node-factory';
import { TreeEditorWidget } from './tree/tree-editor-widget';
import { TreeLabelProvider } from './tree/tree-label-provider';
import { TreeLabelProviderContribution } from './tree-label-provider-contribution';
import { NewTreeExampleFileCommandHandler } from './example-file/example-file-command';
import { NewTreeExampleFileCommandContribution, NewTreeExampleFileMenuContribution } from './example-file/example-file-contribution';
import { createBasicTreeContainer, NavigatableTreeEditorOptions } from '@eclipse-emfcloud/theia-tree-editor';
import { DbcFileCommandContribution, DbcFileMenuContribution } from './dbcWdgt/dbc-file-contribution';
import { DbcFileCommandHandler } from './dbcWdgt/dbc-file-command';
import { DbcContribution } from './dbc-contribution';
import { DbcModelService } from './dbcWdgt/dbc-model-service';
import { DbcEditorWidget } from './dbcWdgt/dbc-editor-widget';
import { DbcNodeFactory } from './dbcWdgt/dbc-node-factory';


export default new ContainerModule(bind => {

	// Bind Theia IDE contributions for the DBC File reading menu entry
	bind(DbcFileCommandHandler).toSelf();
	bind(CommandContribution).to(DbcFileCommandContribution);
	bind(MenuContribution).to(DbcFileMenuContribution);
    

	// Bind Theia IDE contributions for the dbc editor.
	bind(OpenHandler).to(DbcContribution);
	bind(MenuContribution).to(DbcContribution);
	bind(CommandContribution).to(DbcContribution);
	
	// bind services to themselves because we use them outside of the editor widget, too.
	bind(DbcModelService).toSelf().inSingletonScope();

    bind<WidgetFactory>(WidgetFactory).toDynamicValue(context => ({
        id: DbcEditorWidget.WIDGET_ID,
        createWidget: (options: NavigatableWidgetOptions) => {

            const treeContainer = createBasicTreeContainer(
                context.container,
                DbcEditorWidget,
                DbcModelService,
                DbcNodeFactory
            );

            // Bind options.
            const uri = new URI(options.uri);
            treeContainer.bind(NavigatableTreeEditorOptions).toConstantValue({ uri });

            return treeContainer.get(DbcEditorWidget);
        }
    }));

    // Bind Theia IDE contributions for the example file creation menu entry.
    bind(NewTreeExampleFileCommandHandler).toSelf();
    bind(CommandContribution).to(NewTreeExampleFileCommandContribution);
    bind(MenuContribution).to(NewTreeExampleFileMenuContribution);


    // Bind Theia IDE contributions for the tree editor.
    bind(LabelProviderContribution).to(TreeLabelProviderContribution);
    bind(OpenHandler).to(TreeContribution);
    bind(MenuContribution).to(TreeContribution);
    bind(CommandContribution).to(TreeContribution);
    bind(LabelProviderContribution).to(TreeLabelProvider);

    // bind services to themselves because we use them outside of the editor widget, too.
    bind(TreeModelService).toSelf().inSingletonScope();
    bind(TreeLabelProvider).toSelf().inSingletonScope();

    bind<WidgetFactory>(WidgetFactory).toDynamicValue(context => ({
        id: TreeEditorWidget.WIDGET_ID,
        createWidget: (options: NavigatableWidgetOptions) => {

            const treeContainer = createBasicTreeContainer(
                context.container,
                TreeEditorWidget,
                TreeModelService,
                TreeNodeFactory
            );

            // Bind options.
            const uri = new URI(options.uri);
            treeContainer.bind(NavigatableTreeEditorOptions).toConstantValue({ uri });

            return treeContainer.get(TreeEditorWidget);
        }
    }));
});
