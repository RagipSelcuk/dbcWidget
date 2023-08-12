import { TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";
import { ILogger } from "@theia/core";
import { inject, injectable } from "@theia/core/shared/inversify";
import { dbcSchema, messageCanListView, messagesView, signalsView } from "./dbc-schema";
import { DbcModel } from "./dbc-model";




@injectable()
export class DbcModelService implements TreeEditor.ModelService{
	
	constructor(@inject(ILogger) private readonly logger: ILogger) { }
	
	getDataForNode(node: TreeEditor.Node) {
        return node.jsonforms.data;
    }
	
	
	getSchemaForNode(node: TreeEditor.Node){
		return this.getSchemaForType(node.jsonforms.type)
	}

	private getSchemaForType(type: string)
	{
		//this.logger.info("Ragip getSchemaForType :" + type);
		switch(type){
			case "ECU_Messages":
				dbcSchema.definitions.messages;
				return
				
			case 'Message':
				dbcSchema.definitions.message;
				return
				
			case 'Signal':
				dbcSchema.definitions.signals;
				return		
		default:
        	this.logger.warn("Can't find registered schema for type: " + type);
        	return undefined;				
		}
	}
	

  
      getUiSchemaForNode(node: TreeEditor.Node) {
        const type = node.jsonforms.type;
        switch (type) {
			case DbcModel.Type.MessagesSubTree:				
				return messageCanListView;
				
            case DbcModel.Type.Message:
                return messagesView;
                
                
            case DbcModel.Type.Signals:
                return signalsView;
                
            default:
                this.logger.warn("Ragip Can't find registered ui schema for type " + type);
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