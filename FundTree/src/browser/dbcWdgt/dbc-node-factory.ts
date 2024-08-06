import { TreeEditor } from "@eclipse-emfcloud/theia-tree-editor";
import { ILogger } from "@theia/core";
import { inject, injectable } from "@theia/core/shared/inversify";
import { v4 } from "uuid";
import { DbcEditorWidget } from "./dbc-editor-widget";
import { DbcModel } from "./dbc-model";


@injectable()
export class DbcNodeFactory implements TreeEditor.NodeFactory {
     public static nodeRef: TreeEditor.Node ;
  constructor(
    @inject(ILogger) private readonly logger: ILogger
  ) {}

 



  // Method to map tree data to nodes in the tree
  mapDataToNodes(treeData: TreeEditor.TreeData): TreeEditor.Node[] {
    DbcNodeFactory.nodeRef = this.mapData(treeData.data);
    if (DbcNodeFactory.nodeRef) {
        this.getTreeNode();
      return [DbcNodeFactory.nodeRef];
    }
    return [];
  }

    getTreeNode(){
        return DbcNodeFactory.nodeRef;

    }

  // Method to map individual data to a node in the tree
  mapData(data: any, parent?: TreeEditor.Node, property?: string, indexOrKey?: number | string): TreeEditor.Node {
    if (!data) {
      this.logger.warn('mapData called without data');
    }

    const node: TreeEditor.Node = {
      ...this.defaultNode(),
      editorId: DbcEditorWidget.WIDGET_ID,
      name: "ECU",
      parent: parent,
      jsonforms: {
        type: "ECU_Dbc",
        data: data,
        property: property!,
        index: typeof indexOrKey === 'number' ? indexOrKey.toFixed(0) : indexOrKey
      }
    };

   // Check if the node's data has "messages" and create child nodes for each message
    if (data.messages) {
      const messagesData = data.messages as Array<any>;
      const messagesNode = this.createMessagesNode(messagesData, node);
      node.children.push(messagesNode);
    }

    // Check if the node's data has "nodes" and create child nodes for each node
    if (data.nodes) {
      const nodesData = data.nodes as Array<any>;
      const nodesNode = this.createNodesNode(nodesData, node);
      node.children.push(nodesNode);
    }

    return node;
  }
private createMessagesNode(
    messagesData: any[],
    parent: TreeEditor.Node
  ): TreeEditor.Node {
    const messagesNode: TreeEditor.Node = {
      ...this.defaultNode(),
      editorId: DbcEditorWidget.WIDGET_ID,
      name: "Messages",
      parent: parent,
      jsonforms: {
        type: "ECU_Messages",
        data: messagesData,
        property: "messages",
        index: "0", // As all messages are direct children of the messages node
      },
    };

    messagesData.forEach((message, index) => {
      const messageNode: TreeEditor.Node = {
        ...this.defaultNode(),
        editorId: DbcEditorWidget.WIDGET_ID,
        name: message.name || "Unnamed Message",
        parent: messagesNode,
        jsonforms: {
          type: "messages",
          data: message,
          property: "messages",
          index: index.toFixed(0),
        },
      };

      // If the message has "signals", create child nodes for each signal
      if (message.signals) {
        const signalsData = message.signals as Array<any>;
        signalsData.forEach((signal, signalIndex) => {
          this.createNode(signal, messageNode, "signals", signalIndex);
        });
      }

      messagesNode.children.push(messageNode);
    });

    return messagesNode;
  }

  private createNodesNode(nodesData: any[], parent: TreeEditor.Node): TreeEditor.Node {
    const nodesNode: TreeEditor.Node = {
      ...this.defaultNode(),
      editorId: DbcEditorWidget.WIDGET_ID,
      name: "Nodes",
      parent: parent,
      jsonforms: {
        type: "ECU_Nodes",
        data: nodesData,
        property: "nodes",
        index: "0", // As all nodes are direct children of the nodes node
      },
    };

    nodesData.forEach((nodeElement, index) => {
      const nodeChild = this.mapData(nodeElement, nodesNode, "nodes", index);
      nodesNode.children.push(nodeChild);
    });

    return nodesNode;
  }

  private createNode(
    data: any,
    parent: TreeEditor.Node,
    property: string,
    index: number
  ) {
    const node: TreeEditor.Node = {
      ...this.defaultNode(),
      editorId: DbcEditorWidget.WIDGET_ID,
      name: data.name || "Unnamed",
      parent: parent,
      jsonforms: {
        type: "signals",
        data: data,
        property: property,
        index: index.toFixed(0),
      },
    };
    parent.children.push(node);
  }

  // Method to check if a node has creatable children
  hasCreatableChildren(node: TreeEditor.Node): boolean {
    return node ? DbcModel.childrenMapping.get(node.jsonforms.type) !== undefined : false;
  }

  protected defaultNode(): Omit<TreeEditor.Node, 'editorId'> {
    return {
      id: v4(),
      expanded: false,
      selected: false,
      parent: undefined,
      children: [],
      decorationData: {},
      name: '',
      jsonforms: {
        type: '',
        property: '',
        data: undefined
      }
    };
  }
}
