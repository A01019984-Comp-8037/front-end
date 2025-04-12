import { useEffect, useState, type FormEvent } from "react";
import { socket } from "../../utils/socket";
import { getCookie } from "../../utils/cookies";
import { Panel } from "../Panel";

interface firewall {
  connected: boolean;
  deviceId: string;
}

export function Firewall({ connected, deviceId }: firewall) {
  const [loading, setLoading] = useState(true);
  const [rules, setRules] = useState("");

  useEffect(() => {
    socket.on("client:rules-send", (res) => {
      let formatted = "";
      for (let i of res) {
        formatted += i + " ";
      }
      setRules(formatted);
    });
  }, []);

  useEffect(() => {
    if (connected) {
      socket.emit("client:get-rules", {
        token: getCookie("access_token"),
        device: deviceId,
      });
    }
  }, [connected]);

  const setRule = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e?.target as any);
    const port = Number(formData.get("port") as string);
    if (port < 0 || port > 65535) {
      console.log("Invalid Port");
      return;
    }
    socket.emit("client:new-rule", {
      token: getCookie("access_token"),
      port,
      device: deviceId,
      action: formData.get("action"),
      protocol: formData.get("protocol"),
    });
  };

  return (
    <Panel>
      <div className="m-5">
        <h1 className="text-2xl my-1">Firewall</h1>
        <h2 className="text-xl my-1">Open Ports: {rules}</h2>
        <h2 className="text-xl my-1">Set Ports:</h2>
        <form onSubmit={setRule} className="w-full">
          <input
            name="port"
            type="number"
            placeholder="Port"
            className="input input-primary mr-2"
            required
          />
          <select
            defaultValue={"TCP"}
            name="protocol"
            className="select input input-primary mr-2"
          >
            <option>TCP</option>
            <option>UDP</option>
          </select>
          <select
            defaultValue={"Close"}
            name="action"
            className="select input input-primary mr-2"
          >
            <option>Close</option>
            <option>Open</option>
          </select>
          <button className="btn btn-primary">Set Rule</button>
        </form>
      </div>
    </Panel>
  );
}
