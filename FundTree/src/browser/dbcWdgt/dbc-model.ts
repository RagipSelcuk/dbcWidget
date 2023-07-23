import { TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";


export namespace DbcModel {
	
	export namespace Type{
		export const TopLevelECU = 'ECU-Dbc';
		export const MessagesSubTree = 'ECU-Messages';
		export const NodesSubTree = 'ECU-Nodes'
		export const Message = 'Message';
		export const Signals = 'Signal';
		
		
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
            Type.Message, [
                {
                    property: 'children',
                    children: DbcComponents
                }
            ]
        ],
        [
            Type.Signals, [
                {
                    property: 'children',
                    children: DbcComponents
                }
            ]
        ]
    ]);
	
	
	
	
}