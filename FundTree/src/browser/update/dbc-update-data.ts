import { ILogger } from "@theia/core";
import { inject, injectable } from "inversify";
import { FileService } from "@theia/filesystem/lib/browser/file-service";
import { URI } from '@theia/core/lib/common/uri';
import { TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";
@injectable()
export default class DbcUpdateData {
    constructor(
        @inject(ILogger) private readonly logger: ILogger,
        @inject(FileService) private readonly fileService: FileService
    ) {}

    updateSchema() {
        this.logger.info("WE ARE IN UPDATE DATA");
        this.createFile();    
        }

    getData(element: object): string | undefined{

        const data = TreeEditor.Node.is(element) ? element.jsonforms.data : element;
        if(data){this.logger.info("data is: "+data);
            return data;}
        else{this.logger.warn("data is null");}

        }

    private async  createFile(){
        //const data=this.getData();

        // Create a URI from the given file path
        const fileUri = new URI("/Users/didarnurbilgin/Projects/dbcWidget/to-see-files/");
        const targetUri = fileUri.withPath(fileUri.path + 'updated-dbc-schema.json');

        /* if(data){
           // const jsonData = JSON.stringify(data, null, 2);
           this.logger.info("JSON DATA: ");
            // Create a URI from the given file path
            const fileUri = new URI("/Users/didarnurbilgin/Projects/dbcWidget/to-see-files/");
            const targetUri = fileUri.withPath(fileUri.path + 'updated-dbc-schema.json');

            // Write the data to a test file
            const contentBuffer = BinaryBuffer.fromString(jsonData);
            await this.fileService.createFile(targetUri, contentBuffer, { overwrite: true });

            this.logger.info('DBC Schema has been written to: ' + targetUri.toString());
        } else {
            this.logger.error("data is null.");
        }*/
    }
}