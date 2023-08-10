import { TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";
import { ILogger } from "@theia/core";
import { inject, injectable } from "@theia/core/shared/inversify";
import { dbcSchema, messagesView, signalsView } from "./dbc-schema";
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
				dbcSchema.properties.messages;
				return
				
			case 'Message':
				this.logger.warn("Can't find registered schema for type: " + type);
				//dbcSchema.properties.messages;
				return undefined;
				
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
			case "ECU_Messages":
			case DbcModel.Type.MessagesSubTree:
				return messagesView;
				
            case DbcModel.Type.Message:
				this.logger.warn("Ragip Can't find registered ui schema for type " + type);
                return undefined;
                
            case "Signal":    
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