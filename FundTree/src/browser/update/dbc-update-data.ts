import { ILogger } from "@theia/core";
import { inject, injectable } from "inversify";
import { FileService } from "@theia/filesystem/lib/browser/file-service";
import { URI } from '@theia/core/lib/common/uri';
import { TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";
import { DbcNodeFactory } from "../dbcWdgt/dbc-node-factory";
import { BinaryBuffer } from "@theia/core/lib/common/buffer";
import { DbcModelService } from "../dbcWdgt/dbc-model-service";
@injectable()
export default class DbcUpdateData {
    constructor(
        @inject(ILogger) private readonly logger: ILogger,
        @inject(FileService) private readonly fileService: FileService
    ) {}

    updateSchema() {
        this.getLabelData();
        }
      	
    getLabelData(){
        //get all the nodes
        const nodeFactory=new DbcNodeFactory(this.logger);
        const node: TreeEditor.Node = nodeFactory.getTreeNode();

        //get the datas of nodes
        const modelService= new DbcModelService(this.logger);
        const data= modelService.getDataForNode(node);
        this.createFile(data);    
    }

    //create a test file to write the json format of node datas
    private async  createFile(data: any){
        
         if(data){
            //convert the data to json format
            const jsonData = JSON.stringify(data, null, 2);;

            //create a URI from the given file path
            const fileUri = new URI("/Users/didarnurbilgin/Projects/dbcWidget/to-see-files/");
            const targetUri = fileUri.withPath(fileUri.path + 'updated-dbc-schema.json');

            //write the data to a test file
            const contentBuffer = BinaryBuffer.fromString(jsonData);
            await this.fileService.createFile(targetUri, contentBuffer, { overwrite: true });

            this.logger.info('DBC Schema has been written to: ' + targetUri.toString());
        } else {
            this.logger.error("Data is null.");
        }
    }
}