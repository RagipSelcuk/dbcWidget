import { ILogger } from "@theia/core";
//import { FileService } from "@theia/filesystem/lib/browser/file-service";
import { inject, injectable } from "inversify";
//import DbcUpdateData from "../update/dbc-update-data";

@injectable()
export default class JsonToDbc{
constructor(
        @inject(ILogger) private readonly logger: ILogger,
   //     @inject(FileService) private readonly fileService: FileService
    ) {}
    getJsonData(){
        this.logger.info("ARE WE IN?")     
     //   const jsonData= DbcUpdateData.jsonData;
        
      
    }

}