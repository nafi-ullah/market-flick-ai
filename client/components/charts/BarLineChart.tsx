"use client";
import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface ChartProps {
  data: {
    year: string;
    marketSize: number;
    growthRate: number;
    digitalAdoption: number;
  }[];
}

const BarLineChartComponent: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="w-full h-96">
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
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="year" />
          <YAxis yAxisId="left" label={{ value: 'Market Size (B$)', angle: -90, position: 'insideLeft' }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: 'Percentage (%)', angle: -90, position: 'insideRight' }}
          />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="marketSize" barSize={20} fill="#8884d8" name="Market Size" />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="growthRate"
            stroke="#82ca9d"
            strokeWidth={2}
            name="Growth Rate"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="digitalAdoption"
            stroke="#ffcc00"
            strokeWidth={2}
            name="Digital Adoption"
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarLineChartComponent;
