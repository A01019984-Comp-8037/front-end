import { useState } from "react";

interface Props {
  packets: {
    protocol: "TCP" | "UDP";
    src_ip: string;
    dest_ip: string;
    src_port: number;
    dest_port: number;
  }[];
}

export function PacketView({ packets }: Props) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="mt-3 max-h-52 overflow-y-scroll">
      {packets.map((val, key) => (
        <div key={key} className="text-center">
          {val.src_ip}:{val.src_port} {" -> "} {val.dest_ip}:{val.dest_port}
        </div>
      ))}
    </div>
  );
}
