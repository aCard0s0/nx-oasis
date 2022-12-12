import {WebSocket} from "ws";
import {WebSocketClientHandler} from "../../app/websockets/clients/WebSocketClientHandler";

export function waitForSocketState(socket: WebSocket, state: number) {
  return new Promise<void>(function (resolve) {
    setTimeout(function () {
      if (socket.readyState === state) {
        resolve();
      } else {
        waitForSocketState(socket, state).then(resolve);
      }
    }, 3);
  });
}

export function waitForSocketClientState(socket: WebSocketClientHandler, state: number) {
  return new Promise<void>(function (resolve) {
    setTimeout(function () {
      if (socket.getState() === state) {
        resolve();
      } else {
        waitForSocketClientState(socket, state).then(resolve);
      }
    }, 3);
  });
}
