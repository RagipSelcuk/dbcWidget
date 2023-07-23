import { TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";
import { ILogger } from "@theia/core";
import { inject, injectable } from "@theia/core/shared/inversify";
import { v4 } from "uuid";
import { DbcEditorWidget } from "./dbc-editor-widget";
//import { DbcLabelProvider } from "./dbc-label-provider";
import { DbcModel } from "./dbc-model";



@injectable()
export class DbcNodeFactory implements TreeEditor.NodeFactory{
	
    constructor(
     //   @inject(DbcLabelProvider) private readonly labelProvider: DbcLabelProvider,
        @inject(ILogger) private readonly logger: ILogger) {
    }	
	
	// Method to map tree data to nodes in the tree
    mapDataToNodes(treeData: TreeEditor.TreeData): TreeEditor.Node[] {

        const node = this.mapData(treeData.data);
        if (node) {
            return [node];
        }
        return [];
        
    }	
    
	// Method to map individual data to a node in the tree
    mapData(data: any, parent?: TreeEditor.Node, property?: string, indexOrKey?: number | string): TreeEditor.Node {
        if (!data) {
            this.logger.warn('mapData called without data');
        }

        const node: TreeEditor.Node = {
            ...this.defaultNode(),
            editorId: DbcEditorWidget.WIDGET_ID,
            name: "ECU",
            parent: parent,
            jsonforms: {
                type: "ECU-Dbc",
                data: data,
                property: property!,
                index: typeof indexOrKey === 'number' ? indexOrKey.toFixed(0) : indexOrKey
            }
        };

        // containments
        if (parent) {
            parent.children.push(node);
            parent.expanded = false;
        }
        
       // Check if the node's data has "signals" and create child nodes for each signal
    if (data.signals) {
      const signals = data.signals as Array<any>;
      signals.forEach((signal) => {
        this.createSignalNode(signal, node);
      });
    }

    // Recursively create child nodes for the "children" property if it exists
    if (data.children) {
      const children = data.children as Array<any>;
      children.forEach((element) => {
        this.mapData(element, node);
      });
    }
    
	if(data.nodes){
		const nodes = data.nodes as Array <any>;
		nodes.forEach((element) => {
			this.mapData(element,node);
		});
	}
        return node;
    }	
	
	// Method to create child nodes for "signals"
  private createSignalNode(signalData: any, parent: TreeEditor.Node) {
    const signalNode: TreeEditor.Node = {
      ...this.defaultNode(),
      editorId: DbcEditorWidget.WIDGET_ID,
      name: signalData.name || "Unnamed Signal",
      parent: parent,
      jsonforms: {
        type: "Signal", // Assuming "Signal" as the type for signals
        data: signalData,
        property: "signals",
        index: "0", // As all signals are direct children of the message node
      },
    };
    parent.children.push(signalNode);
  }
  
  
  // Method to check if a node has creatable children	
    hasCreatableChildren(node: TreeEditor.Node): boolean {
        return node ? DbcModel.childrenMapping.get(node.jsonforms.type) !== undefined : false;
    }

    protected defaultNode(): Omit<TreeEditor.Node, 'editorId'> {
        return {
            id: v4(),
            expanded: false,
            selected: false,
            parent: undefined,
            children: [],
            decorationData: {},
            name: '',
            jsonforms: {
                type: '',
                property: '',
                data: undefined
            }
        };
    }

    /** Derives the type id from the given data. */
  /*)  protected getTypeId(data: any): string {
        return data && data.typeId || '';
    }
	*/
}