import { describe, it, expect } from "vitest";
import { protocolGraph, barChart } from "../graphFunctions"; // Adjust this import

interface packetData {
  protocol: "TCP" | "UDP";
  src_ip: string;
  dest_ip: string;
  src_port: number;
  dest_port: number;
}

describe("protocolGraph function", () => {
  it("should count TCP and UDP packets correctly", () => {
    const chartData = {
      tcp: [0],
      udp: [0],
      labels: ["12:00:00"],
      init: false,
    };

    const packets: packetData[] = [
      {
        protocol: "TCP",
        src_ip: "192.168.1.1",
        dest_ip: "192.168.1.2",
        src_port: 80,
        dest_port: 8080,
      },
      {
        protocol: "UDP",
        src_ip: "192.168.1.3",
        dest_ip: "192.168.1.4",
        src_port: 53,
        dest_port: 53,
      },
      {
        protocol: "TCP",
        src_ip: "192.168.1.5",
        dest_ip: "192.168.1.6",
        src_port: 443,
        dest_port: 443,
      },
    ];

    const result = protocolGraph({ packets, chartData });

    expect(result.tcp).toEqual([0, 2]);
    expect(result.udp).toEqual([0, 1]);
    expect(result.labels.length).toBe(2);
    expect(result.init).toBe(true);
  });

  it("should handle an empty packet list correctly", () => {
    const chartData = {
      tcp: [0],
      udp: [0],
      labels: ["12:00:00"],
      init: false,
    };

    const packets: [] = [];

    const result = protocolGraph({ packets, chartData });

    expect(result.tcp).toEqual([0, 0]);
    expect(result.udp).toEqual([0, 0]);
    expect(result.labels.length).toBe(2);
    expect(result.init).toBe(true);
  });

  it("should set init flag to true after processing packets", () => {
    const chartData = {
      tcp: [0],
      udp: [0],
      labels: ["12:00:00"],
      init: false,
    };

    const packets: {
      protocol: "TCP" | "UDP";
      src_ip: string;
      dest_ip: string;
      src_port: number;
      dest_port: number;
    }[] = [
      {
        protocol: "TCP",
        src_ip: "192.168.1.1",
        dest_ip: "192.168.1.2",
        src_port: 80,
        dest_port: 8080,
      },
    ];

    const result = protocolGraph({ packets, chartData });

    expect(result.init).toBe(true);
  });
});

describe("barChart function", () => {
  it("should count occurrences based on src_ip", () => {
    const packets: packetData[] = [
      {
        protocol: "TCP",
        src_ip: "192.168.1.1",
        dest_ip: "192.168.1.2",
        src_port: 80,
        dest_port: 8080,
      },
      {
        protocol: "UDP",
        src_ip: "192.168.1.1",
        dest_ip: "192.168.1.3",
        src_port: 53,
        dest_port: 53,
      },
      {
        protocol: "TCP",
        src_ip: "192.168.1.2",
        dest_ip: "192.168.1.4",
        src_port: 443,
        dest_port: 443,
      },
    ];

    const result = barChart({ packets, type: "src_ip" });

    expect(result).toEqual({
      "192.168.1.1": 2,
      "192.168.1.2": 1,
    });
  });

  it("should count occurrences based on dest_ip", () => {
    const packets: packetData[] = [
      {
        protocol: "TCP",
        src_ip: "192.168.1.1",
        dest_ip: "192.168.1.2",
        src_port: 80,
        dest_port: 8080,
      },
      {
        protocol: "UDP",
        src_ip: "192.168.1.3",
        dest_ip: "192.168.1.2",
        src_port: 53,
        dest_port: 53,
      },
      {
        protocol: "TCP",
        src_ip: "192.168.1.5",
        dest_ip: "192.168.1.3",
        src_port: 443,
        dest_port: 443,
      },
    ];

    const result = barChart({ packets, type: "dest_ip" });

    expect(result).toEqual({
      "192.168.1.2": 2,
      "192.168.1.3": 1,
    });
  });

  it("should count occurrences based on src_port", () => {
    const packets: packetData[] = [
      {
        protocol: "TCP",
        src_ip: "192.168.1.1",
        dest_ip: "192.168.1.2",
        src_port: 80,
        dest_port: 8080,
      },
      {
        protocol: "UDP",
        src_ip: "192.168.1.3",
        dest_ip: "192.168.1.3",
        src_port: 80,
        dest_port: 53,
      },
      {
        protocol: "TCP",
        src_ip: "192.168.1.2",
        dest_ip: "192.168.1.4",
        src_port: 443,
        dest_port: 443,
      },
    ];

    const result = barChart({ packets, type: "src_port" });

    expect(result).toEqual({
      "80": 2,
      "443": 1,
    });
  });

  // Test Case 4: Verify barChart functionality for dest_port
  it("should count occurrences based on dest_port", () => {
    const packets: packetData[] = [
      {
        protocol: "TCP",
        src_ip: "192.168.1.1",
        dest_ip: "192.168.1.2",
        src_port: 80,
        dest_port: 8080,
      },
      {
        protocol: "UDP",
        src_ip: "192.168.1.1",
        dest_ip: "192.168.1.3",
        src_port: 53,
        dest_port: 8080,
      },
      {
        protocol: "TCP",
        src_ip: "192.168.1.1",
        dest_ip: "192.168.1.4",
        src_port: 80,
        dest_port: 8080,
      },
    ];

    const result = barChart({ packets, type: "dest_port" });

    expect(result).toEqual({
      "8080": 3,
    });
  });

  it("should return correct counts for any given type field", () => {
    const packets: packetData[] = [
      {
        protocol: "TCP",
        src_ip: "192.168.1.1",
        dest_ip: "192.168.1.2",
        src_port: 80,
        dest_port: 8080,
      },
      {
        protocol: "UDP",
        src_ip: "192.168.1.1",
        dest_ip: "192.168.1.3",
        src_port: 53,
        dest_port: 53,
      },
      {
        protocol: "TCP",
        src_ip: "192.168.1.1",
        dest_ip: "192.168.1.2",
        src_port: 443,
        dest_port: 8080,
      },
    ];

    const result = barChart({ packets, type: "src_ip" });

    expect(result).toEqual({
      "192.168.1.1": 3,
    });

    const resultDestIp = barChart({ packets, type: "dest_ip" });
    expect(resultDestIp).toEqual({
      "192.168.1.2": 2,
      "192.168.1.3": 1,
    });
  });
});
