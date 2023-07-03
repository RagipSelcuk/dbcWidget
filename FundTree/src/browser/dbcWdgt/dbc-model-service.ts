import { TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";
import { ILogger } from "@theia/core";
import { inject, injectable } from "@theia/core/shared/inversify";
import { dbcSchema, machineView, messagesView, signalsView } from "./dbc-schema";
import { DbcModel } from "./dbc-model";




@injectable()
export class DbcModelService implements TreeEditor.ModelService{
	
	constructor(@inject(ILogger) private readonly logger: ILogger) { }
	
	getDataForNode(node: TreeEditor.Node) {
        return node.jsonforms.data;
    }
	
	// getUiSchemaForNode(node: TreeEditor.Node): MaybePromise<UISchemaElement | undefined> {
    getSchemaForNode(node: TreeEditor.Node) {
        return {
            definitions: dbcSchema.definitions,
            ...this.getSchemaForType(node.jsonforms.type),
        };
    }
	

    private getSchemaForType(type: string) {
        if (!type) {
            return undefined;
        }
        const schema = Object.entries(dbcSchema.definitions)
            .map(entry => entry[1])
            .find(
                definition =>
                    definition.properties && definition.properties.typeId.const === type
            );
        if (schema === undefined) {
            this.logger.warn("Can't find definition schema for type " + type);
        }
        return schema;
    }

    getUiSchemaForNode(node: TreeEditor.Node) {
        const type = node.jsonforms.type;
        switch (type) {
            case DbcModel.Type.Message:
                return messagesView;
            case DbcModel.Type.Signals:
                return signalsView;
            case DbcModel.Type.Machine:
				return machineView;    
            default:
                this.logger.warn("Can't find registered ui schema for type " + type);
                return undefined;
        }
    }

    getChildrenMapping(): Map<string, TreeEditor.ChildrenDescriptor[]> {
        return DbcModel.childrenMapping;
    }

    getNameForType(type: string): string {
        return DbcModel.Type.name(type);
    }


	
}