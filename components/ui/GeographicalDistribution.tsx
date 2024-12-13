import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GeographicalDistribution: React.FC = () => {
  const data = {
    labels: ["LGA 1", "LGA 2", "LGA 3", "LGA 4", "LGA 5"],
    datasets: [
      {
        label: "Adherence Rate by LGA",
        data: [75, 82, 68, 79, 85],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Geographical Distribution of Adherence Rates",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default GeographicalDistribution;
