"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type PieChartComponentProps = {
  labels: string[];
  dataValues: number[];
  backgroundColors: string[];
};

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  labels,
  dataValues,
  backgroundColors,
}) => {
  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChartComponent;
