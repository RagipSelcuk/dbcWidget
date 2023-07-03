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
	
	//mapDataToNodes(treeData: TreeEditor.TreeData): MaybePromise<TreeEditor.Node[]> {
    mapDataToNodes(treeData: TreeEditor.TreeData): TreeEditor.Node[] {
        const node = this.mapData(treeData.data);
        if (node) {
            return [node];
        }
        return [];
    }	
//	mapData(data: any, parent?: TreeEditor.Node | undefined, property?: string | undefined, indexOrKey?: string | number | undefined): MaybePromise<TreeEditor.Node> {
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
        if (data.children) {
            const children = data.children as Array<any>;
            // component types
            children.forEach((element, idx) => {
                this.mapData(element, node, 'children', idx);
            });
        }

        return node;
    }	
	
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