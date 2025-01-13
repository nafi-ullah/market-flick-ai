"use client";

import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  data: {
    category: string;
    value: number;
    lineValue: number;
  }[];
}

const BarSingleLineChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" barSize={40} fill="#6f42c1" />
          <Line
            type="monotone"
            dataKey="lineValue"
            stroke="#ff4d4d"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarSingleLineChart;
