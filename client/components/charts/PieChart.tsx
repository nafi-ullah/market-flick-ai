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

  const fixedBackgroundColors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
    "rgba(199, 199, 199, 0.5)",
    "rgba(83, 102, 255, 0.5)",
    "rgba(255, 99, 71, 0.5)",
    "rgba(100, 181, 246, 0.5)"
  ];

  // Fixed array of darker colors for borders
  const fixedBorderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(199, 199, 199, 1)",
    "rgba(83, 102, 255, 1)",
    "rgba(255, 99, 71, 1)",
    "rgba(100, 181, 246, 1)"
  ];

  // Ensure the colors array matches the size of dataValues
  const dynamicBackgroundColors = fixedBackgroundColors.slice(0, dataValues.length);
  const dynamicBorderColors = fixedBorderColors.slice(0, dataValues.length);
  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: dynamicBackgroundColors,
        borderColor: dynamicBorderColors, // Use darker colors for borders
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#FFFFFF", // Text color
        },
      },
    },
  };


  return <div className=""> <Pie data={data} options={options} /></div>;
};

export default PieChartComponent;
