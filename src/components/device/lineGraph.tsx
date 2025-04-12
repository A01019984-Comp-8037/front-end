import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [10, 14, 30, 24],
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: [12, 13, 34, 54],
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

interface lineChart {
  chartData: {
    tcp: number[];
    udp: number[];
    labels: string[];
    init: boolean;
  };
}
export function Linechart({ chartData }: lineChart) {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "TCP",
        data: chartData.tcp,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "UDP",
        data: chartData.udp,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
