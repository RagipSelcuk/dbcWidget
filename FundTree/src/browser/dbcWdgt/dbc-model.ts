import { TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";


export namespace DbcModel {
	
	export namespace Type{
		export const Message = 'Message';
		export const Signals = 'Signals';
		export const Machine = 'Machine';
		
		
		export function name(type: string): string{
			return type;
		}	
	}
	
	const DbcComponents =[
		Type.Message,
		Type.Signals
	];
	
	
	 /** Maps types to their creatable children */
    export const childrenMapping: Map<string, TreeEditor.ChildrenDescriptor[]> = new Map([
        [
            Type.Machine, [
                {
                    property: 'children',
                    children: DbcComponents
                }
            ]
        ],
        [
            Type.Message, [
                {
                    property: 'children',
                    children: DbcComponents
                }
            ]
        ]
    ]);
	
	
	
	
}