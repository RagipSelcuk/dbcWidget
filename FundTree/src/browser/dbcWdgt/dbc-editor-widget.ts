import { DetailFormWidget, MasterTreeWidget, NavigatableTreeEditorOptions, ResourceTreeEditorWidget, TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";
import { DefaultResourceProvider, ILogger } from "@theia/core";
import { inject, injectable } from "@theia/core/shared/inversify";
import { EditorPreferences } from "@theia/editor/lib/browser";
import { WorkspaceService } from "@theia/workspace/lib/browser";





@injectable()
export class DbcEditorWidget extends ResourceTreeEditorWidget{
    constructor(
        @inject(MasterTreeWidget)
        readonly treeWidget: MasterTreeWidget,
        @inject(DetailFormWidget)
        readonly formWidget: DetailFormWidget,
        @inject(WorkspaceService)
        readonly workspaceService: WorkspaceService,
        @inject(ILogger) readonly logger: ILogger,
        @inject(NavigatableTreeEditorOptions)
        protected readonly options: NavigatableTreeEditorOptions,
        @inject(DefaultResourceProvider)
        protected provider: DefaultResourceProvider,
        @inject(TreeEditor.NodeFactory)
        protected readonly nodeFactory: TreeEditor.NodeFactory,
        @inject(EditorPreferences)
        protected readonly editorPreferences: EditorPreferences
    ) {
        super(
            treeWidget,
            formWidget,
            workspaceService,
            logger,
            DbcEditorWidget.WIDGET_ID,
            options,
            provider,
            nodeFactory,
            editorPreferences
        );


    }	
	
	protected getTypeProperty(): string {
		return "typeId";
	}
	
}

export namespace DbcEditorWidget {
	export const WIDGET_ID = 'Dbc-tree-editor';
}