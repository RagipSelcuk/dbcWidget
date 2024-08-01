import { TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";
import { ILogger } from "@theia/core";
import { LabelProviderContribution } from "@theia/core/lib/browser";
import { inject, injectable } from "@theia/core/shared/inversify";
import { DbcEditorWidget } from "./dbc-editor-widget";
import { DbcModel } from "./dbc-model";

const DEFAULT_COLOR = 'white';


const ICON_CLASSES: Map<string, string> = new Map([
    [DbcModel.Type.TopLevelECU, 'fa-fire ' + DEFAULT_COLOR],
    [DbcModel.Type.MessagesSubTree, 'fa-server ' + DEFAULT_COLOR],
    [DbcModel.Type.NodesSubTree, 'fa-microchip ' + DEFAULT_COLOR],
    [DbcModel.Type.Signals, 'fa-tv ' + DEFAULT_COLOR],
    [DbcModel.Type.Message, 'fa-inbox ' + DEFAULT_COLOR],
]);

/* Icon for unknown types */
const UNKNOWN_ICON = 'fa-question-circle ' + DEFAULT_COLOR;


@injectable()
export class DbcLabelProvider implements LabelProviderContribution{
	
	constructor(@inject(ILogger) private readonly logger: ILogger) { }
	
    public canHandle(element: object): number {
        if ((TreeEditor.Node.is(element) || TreeEditor.CommandIconInfo.is(element))
            && element.editorId === DbcEditorWidget.WIDGET_ID) {
            return 1000;
        }
        return 0;
    }	
	
    public getIcon(element: object): string | undefined {
        let iconClass: string | undefined;
        if (TreeEditor.CommandIconInfo.is(element)) {
            iconClass = ICON_CLASSES.get(element.type);
        } else if (TreeEditor.Node.is(element)) {
            iconClass = ICON_CLASSES.get(element.jsonforms.type);
        }

 if (!iconClass) {
            // Log the missing icon
            const elementTypeName = TreeEditor.CommandIconInfo.is(element)
                ? element.type
                : TreeEditor.Node.is(element)
                ? element.jsonforms.type
                : "Unknown";

            this.logger.warn(`Ragip Icon class not found for element type: ${elementTypeName}`);
        }


        return iconClass ? 'fa ' + iconClass : 'fa ' + UNKNOWN_ICON;
    }
    
    public getName(element: object): string | undefined {
        const data = TreeEditor.Node.is(element) ? element.jsonforms.data : element;
        if (data.name) {
          // this.logger.info("this is what you've clicked: "+data.name);
            return data.name;
        } 
        
        return undefined;
    }
      	
	
}