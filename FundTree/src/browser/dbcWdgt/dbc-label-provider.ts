import { TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";
import { LabelProviderContribution } from "@theia/core/lib/browser";
import { injectable } from "@theia/core/shared/inversify";
import { DbcEditorWidget } from "./dbc-editor-widget";
import { DbcModel } from "./dbc-model";

const DEFAULT_COLOR = 'white';


const ICON_CLASSES: Map<string, string> = new Map([
    [DbcModel.Type.Machine, 'fa-fire ' + DEFAULT_COLOR],
    [DbcModel.Type.Mignals, 'fa-server ' + DEFAULT_COLOR],
    [DbcModel.Type.Message, 'fa-inbox ' + DEFAULT_COLOR],
]);

/* Icon for unknown types */
const UNKNOWN_ICON = 'fa-question-circle ' + DEFAULT_COLOR;


@injectable()
export class DbcLabelProvider implements LabelProviderContribution{
	
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

        return iconClass ? 'fa ' + iconClass : 'fa ' + UNKNOWN_ICON;
    }
    
    public getName(element: object): string | undefined {
        const data = TreeEditor.Node.is(element) ? element.jsonforms.data : element;
        if (data.name) {
            return data.name;
        } else if (data.typeId) {
            return this.getTypeName(data.typeId);
        }

        return undefined;
    }
    
    private getTypeName(typeId: string): string {
        return DbcModel.Type.name(typeId);
    }        	
	
}