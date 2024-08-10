import { ILogger } from "@theia/core";
import { inject, injectable } from "inversify";
import { FileService } from "@theia/filesystem/lib/browser/file-service";
import { URI } from '@theia/core/lib/common/uri';
import { TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";
import { DbcNodeFactory } from "../dbcWdgt/dbc-node-factory";
import { BinaryBuffer } from "@theia/core/lib/common/buffer";
import { DbcModelService } from "../dbcWdgt/dbc-model-service";
import JsonToDbc from "../parser/jsonToDbc";

@injectable()
export default class DbcUpdateData {
    public static jsonData:any;
    constructor(
        @inject(ILogger) private readonly logger: ILogger,
        @inject(FileService) private readonly fileService: FileService
    ) {}

    updateSchema() {
        this.getLabelData();
        }
      	
    getLabelData(){
        const jsonToDbc=new JsonToDbc (this.logger);

        //get all the nodes
        const nodeFactory=new DbcNodeFactory(this.logger);
        const node: TreeEditor.Node = nodeFactory.getTreeNode();

        //get the datas of nodes
        const modelService= new DbcModelService(this.logger);
        const data= modelService.getDataForNode(node);

        //convert the data to json format
        if(data){
            DbcUpdateData.jsonData = JSON.stringify(data, null, 2);
            this.createFile(DbcUpdateData.jsonData);    
            jsonToDbc.getJsonData();
        }
        else {
            this.logger.error("Data is null.");
        }
    }

    //create a test file to write the json format of node datas
    private async  createFile(jsonData: any){
        
        //create a URI from the given file path
        const fileUri = new URI("/Users/didarnurbilgin/Projects/dbcWidget/to-see-files/");
        const targetUri = fileUri.withPath(fileUri.path + 'updated-dbc-schema.json');

        //write the data to a test file
        const contentBuffer = BinaryBuffer.fromString(jsonData);
        await this.fileService.createFile(targetUri, contentBuffer, { overwrite: true });

        this.logger.info('DBC Schema has been written to: ' + targetUri.toString());
        
    }
}