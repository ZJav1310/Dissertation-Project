import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket, io } from "socket.io-client";
import * as config from "../config.json";

class SocketioService {
  socket!: Socket<DefaultEventsMap, DefaultEventsMap>;

  // "http://localhost:5000"
  setupSocketConnection() {
    this.socket = io(config.BASE_URL);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
