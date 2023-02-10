import {WebSocketServerHandler} from "./WebSocketServerHandler";
import {WebSocket} from "ws";
import Logger from "../../configs/Logger";

export default async (expressServer) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/websockets",
  });

  const handler = new WebSocketServerHandler(websocketServer)

  expressServer.on("upgrade", (request, socket, head) => {
    Logger.debug("Express server upgrading")
    handler.onSocketUpgrading(request, socket, head);
  });

  return websocketServer
}

