import { URI } from "@theia/core";
import { LabelProviderContribution } from "@theia/core/lib/browser";
import { injectable } from "@theia/core/shared/inversify";
import { FileStat } from "@theia/filesystem/lib/common/files";




@injectable()
export class DbcLabelProviderContribution implements LabelProviderContribution{

    canHandle(element: object): number {
        let toCheck = element;
        if (FileStat.is(toCheck)) {
            toCheck = toCheck.resource;
        }
        if (toCheck instanceof URI) {
            if (toCheck.path.ext === '.dbc') {
                return 1000;
            }
        }
        return 0;
    }

    getIcon(): string {
        return 'fa fa-coffee dark-purple';
    }

    // We don't need to specify getName() nor getLongName() because the default uri label provider is responsible for them.	
}