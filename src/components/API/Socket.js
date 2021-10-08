import { io } from "socket.io-client";

let Socket = io('//localhost:5000');

export default Socket;