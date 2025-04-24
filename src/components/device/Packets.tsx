import { useEffect, useState } from "react";
import { Panel } from "../Panel";
import { socket } from "../../utils/socket";
import { getCookie } from "../../utils/cookies";
import { Linechart } from "./lineGraph";
import { barChart, protocolGraph } from "../../utils/graphFunctions";
import { BarGraph } from "./BarGraph";
import { PacketView } from "./PacketView";

interface Props {
  deviceId: string;
  connected: boolean;
}

interface lineData {
  tcp: number[];
  udp: number[];
  labels: string[];
  init: boolean;
}

interface barData {
  [key: string]: number;
}

interface packetData {
  protocol: "TCP" | "UDP";
  src_ip: string;
  dest_ip: string;
  src_port: number;
  dest_port: number;
}

export function Packets({ deviceId, connected }: Props) {
  const [type, setType] = useState("Protocol");
  const [lineData, setLineData] = useState<lineData>({
    tcp: [],
    udp: [],
    labels: [],
    init: false,
  });
  const [packets, setPackets] = useState<packetData[]>([]);

  useEffect(() => {
    socket.on("client:packet-send", (res) => {
      setPackets((prev) => {
        let limit = 500000;
        let nList = [...prev, ...res];
        if (nList.length > limit) {
          nList.splice(0, nList.length - limit);
        }
        return nList;
      });
      setLineData(protocolGraph({ packets: res, chartData: lineData }));
    });
  }, []);

  useEffect(() => {
    if (connected) {
      socket.emit("client:init-packets", {
        token: getCookie("access_token"),
        device: deviceId,
      });
    }
  }, [connected]);

  let chart;
  if (type === "Protocol") {
    chart = <Linechart chartData={lineData as lineData} />;
  } else {
    let col: "src_ip" | "dest_ip" | "src_port" | "dest_port" = "src_ip";
    if (type === "Destination IP") {
      col = "dest_ip";
    } else if (type === "Source Socket") {
      col = "src_port";
    } else if (type === "Destination Socket") {
      col = "dest_port";
    }
    chart = <BarGraph srcData={barChart({ packets, type: col })} />;
  }

  return (
    <>
      <div className="mb-4">
        <Panel>
          <div className="m-5 pb-11">
            <div className="flex flex-row">
              <h1 className="text-2xl my-1 flex-1">
                Packets ({packets.length})
              </h1>
              <div>
                <details className="dropdown dropdown-end">
                  <summary className="btn m-1">{type}</summary>
                  <ul className="z-10 menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li>
                      <a onClick={() => setType("Protocol")}>TCP/UDP</a>
                    </li>
                    <li>
                      <a onClick={() => setType("Source IP")}>Source IP</a>
                    </li>
                    <li>
                      <a onClick={() => setType("Destination IP")}>
                        Destination IP
                      </a>
                    </li>
                    <li>
                      <a onClick={() => setType("Source Socket")}>
                        Source Socket
                      </a>
                    </li>
                    <li>
                      <a onClick={() => setType("Destination Socket")}>
                        Destination Socket
                      </a>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
            <div className="max-h-[60vh] flex justify-center">{chart}</div>
          </div>
        </Panel>
      </div>
      <div className="mb-5">
        <Panel>
          <div className="p-5">
            <h1 className="text-2xl my-1 flex-1">List ({packets.length})</h1>
            <PacketView packets={packets} />
          </div>
        </Panel>
      </div>
    </>
  );
}
