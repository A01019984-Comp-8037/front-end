import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

interface Props {
  srcData: { [key: string]: number };
}

export function BarGraph({ srcData }: Props) {
  let labels: string[] = [];
  let values: number[] = [];
  for (const [key, val] of Object.entries(srcData)) {
    labels.push(key);
    values.push(val);
  }

  let data = {
    labels,
    datasets: [
      {
        label: "Source Address",
        data: values,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
