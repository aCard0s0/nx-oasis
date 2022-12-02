import {WebSocketServerHandler} from "./WebSocketServerHandler";
import {WebSocket} from "ws";

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

