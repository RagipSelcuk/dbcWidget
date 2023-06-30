import { TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";


export namespace DbcModel {
	
	export namespace Type{
		export const Messages = 'Messages';
		export const Signals = 'Signals';
		
		
		export function name(type: string): string{
			return type;
		}	
	}
	
	const components =[
		Type.Messages,
		Type.Signals
	];
	
	/** Maps types to their creatable children */
	export const childrenMapping: Map<string, TreeEditor.ChildrenDescriptor[]> = new Map([
        [
            Type.Messages, [
                {
                    property: 'children',
                    children: components
                }
            ]
        ]		
	
	]);
	
	
	
}