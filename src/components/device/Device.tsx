import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import { getCookie } from "../../utils/cookies";
import { Firewall } from "./Firewall";
import { Packets } from "./Packets";
import { DeviceName } from "./DeviceName";

interface Props {
  deviceId: string;
  name: string;
}

export function Device({ deviceId, name }: Props) {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    socket.on("client:device-send", (res) => console.log(res));
    socket.on("diconnect", () => console.log("bye"));
    socket.emit(
      "client:join",
      {
        token: getCookie("access_token"),
      },
      (val: { status: string }) => {
        if (val.status === "connected") {
          setConnected(true);
        }
      }
    );

    window.addEventListener("beforeunload", () => {
      socket.emit("client:disconnect", getCookie("access_token"));
      socket.removeAllListeners();
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return (
    <div className="px-5 w-full my-2">
      <DeviceName name={name} id={Number(deviceId)} />
      <Packets deviceId={deviceId} connected={connected} />
      <Firewall deviceId={deviceId} connected={connected} />
    </div>
  );
}
