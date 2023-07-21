import { TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";
import { ILogger } from "@theia/core";
import { inject, injectable } from "@theia/core/shared/inversify";
import { v4 } from "uuid";
import { DbcEditorWidget } from "./dbc-editor-widget";
import { DbcLabelProvider } from "./dbc-label-provider";
import { DbcModel } from "./dbc-model";



@injectable()
export class DbcNodeFactory implements TreeEditor.NodeFactory{
	
    constructor(
        @inject(DbcLabelProvider) private readonly labelProvider: DbcLabelProvider,
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
            name: this.labelProvider.getName(data)!,
            parent: parent,
            jsonforms: {
                type: this.getTypeId(data),
                data: data,
                property: property!,
                index: typeof indexOrKey === 'number' ? indexOrKey.toFixed(0) : indexOrKey
            }
        };

        // containments
        if (parent) {
            parent.children.push(node);
            parent.expanded = true;
        }
        
// Check if the node's data has "signals" and create child nodes for each signal
    if (data.signals) {
      const signals = data.signals as Array<any>;
      signals.forEach((signal, idx) => {
        this.createSignalNode(signal, node, idx);
      });
    }
    
    	// Recursively create child nodes for the "children" property if it exists        
        if (data.children) {
            const children = data.children as Array<any>;
            // component types
            children.forEach((element, idx) => {
                this.mapData(element, node, 'children', idx);
            });
        }

        return node;
    }	
	
	
 // Method to create child nodes for "signals"
  private createSignalNode(
    signalData: any,
    parent: TreeEditor.Node,
    index: number
  ) {
    const signalNode: TreeEditor.Node = {
      ...this.defaultNode(),
      editorId: DbcEditorWidget.WIDGET_ID,
      name: signalData.name || "Unnamed Signal",
      parent: parent,
      jsonforms: {
        type: "Signal", // Assuming "Signal" as the type for signals
        data: signalData,
        property: "signals",
        index: index.toFixed(0),
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
    protected getTypeId(data: any): string {
        return data && data.typeId || '';
    }
	
}