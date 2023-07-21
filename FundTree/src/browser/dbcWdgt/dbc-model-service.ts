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
	
	/*		// automatically implements the generated uischema
	getSchemaForNode(node: TreeEditor.Node){
		return undefined;
	}
	*/
	
	
	getSchemaForNode(node: TreeEditor.Node){
		return this.getSchemaForType(node.jsonforms.type)
	}

	private getSchemaForType(type: string)
	{
		//this.logger.info("Ragip getSchemaForType :" + type);
		switch(type){
			case 'Machine':
				dbcSchema.definitions.machine;
				return 
				
			case 'Message':
				dbcSchema.definitions.messages;
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
            case DbcModel.Type.Message:
                return messagesView;
            case "Signal":    
            case DbcModel.Type.Signals:
                return signalsView;
            case DbcModel.Type.Machine:
				return machineView;    
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