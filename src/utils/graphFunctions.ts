interface packetData {
  protocol: "TCP" | "UDP";
  src_ip: string;
  dest_ip: string;
  src_port: number;
  dest_port: number;
}

interface protocolGraph {
  chartData: {
    tcp: number[];
    udp: number[];
    labels: string[];
    init: boolean;
  };
  packets: packetData[];
}

export function protocolGraph({ packets, chartData }: protocolGraph) {
  let clone = { ...chartData };
  let tcp = 0;
  let udp = 0;
  for (let i of packets) {
    if (i.protocol == "TCP") tcp++;
    else if (i.protocol == "UDP") udp++;
  }
  if (clone.labels.length > 70) {
    clone.tcp.shift();
    clone.udp.shift();
    clone.labels.shift();
  }
  clone.tcp.push(tcp);
  clone.udp.push(udp);
  clone.labels.push(new Date().toLocaleTimeString());
  clone.init = true;
  return clone;
}

interface barGraph {
  packets: packetData[];
  type: "src_ip" | "dest_ip" | "src_port" | "dest_port";
}

export function barChart({ packets, type }: barGraph) {
  let newData: { [key: string]: number } = {};
  for (let i of packets) {
    if (i[type] in newData) {
      newData[i[type]]++;
    } else {
      newData[i[type]] = 1;
    }
  }
  return newData;
}
