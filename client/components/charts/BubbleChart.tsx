"use client";
import React from "react";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

type BubbleChartComponentProps = {
  datasets: {
    label: string;
    data: { x: number; y: number; r: number }[];
    backgroundColor: string;
  }[];
};

const BubbleChartComponent: React.FC<BubbleChartComponentProps> = ({ datasets }) => {
  const data = {
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const { x, y, r } = context.raw;
            return `(${x}, ${y}), Size: ${r}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Market Share (%)",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Growth Rate (%)",
        },
      },
    },
  };

  return  <div style={{ height: "100%" }}>  <Bubble data={data} options={options} />;
    </div>
};

export default BubbleChartComponent;
