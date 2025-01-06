"use client";
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type BarChartComponentProps = {
  labels: string[];
  dataValues: number[];
  backgroundColor: string;
};

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  labels,
  dataValues,
  backgroundColor,
}) => {
  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to allow full height
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "100%" }}>
      {/* Chart will occupy full height of this container */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartComponent;
