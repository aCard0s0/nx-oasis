import {WebSocketServerHandler} from "./WebSocketServerHandler";
import {WebSocket, ServerOptions, RawData} from "ws";
import {IncomingMessage} from "http";
import {WssMessage} from "@oasis/share-types";

/*
export const startWebSocketServer = () => {
  const options: ServerOptions = {port: 4040}
  const handler = new WsServerHandler()
  handler.initialize(options)
}
*/

export default async (expressServer) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/websockets",
  });

  const handler = new WebSocketServerHandler(websocketServer)
  handler.initialize()

  expressServer.on("upgrade", (request, socket, head) => {
    console.log("Express server upgrading")
    handler.onSocketUpgrading(request, socket, head);
  });

  return websocketServer
}

