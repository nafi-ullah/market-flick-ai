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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          label: (context: any) => {
            const { x, y, r } = context.raw;
            return `(${x}, ${y}), Size: ${r}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Market Share (%)",
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Growth Rate (%)",
        },
      },
    },
  };

  return  <div style={{ height: "100%", minHeight: "400px" }}>  <Bubble data={data} options={options} /></div>
};

export default BubbleChartComponent;
