import { io } from "socket.io-client";
import { PUBLIC_SERVER } from "./environment";

const URL = PUBLIC_SERVER.split("/api")[0];

export const socket = io(URL);
