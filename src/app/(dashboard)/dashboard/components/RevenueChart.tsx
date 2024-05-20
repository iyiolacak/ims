"use client";
import React from "react";
import { ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
  { name: 'Nov', revenue: 2780 },
  { name: 'Dec', revenue: 1890 }
];

interface CustomBarProps extends BarProp {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  index: number; // Added index to identify the bar

}


const CustomBar = (props: CustomBarProps) => {
  const { x, y, width, height, fill, index } = props;
  const radius = 5;

  // Style the bar differently if it's the one to be highlighted
  const isHighlighted = index === 3; // Example: highlight the fifth bar
  return (
    <g>
      <defs>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={isHighlighted ? "#EDEDF4" : "#F4EEF1"} // Different fill for the highlighted bar
        rx={radius}
        ry={radius}
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={isHighlighted ? "#1d4ed8" : "#EBE7E9"}
        strokeWidth={isHighlighted ? 2 : 1}
        fill="none"
        rx={radius}
        ry={radius}
      />
    </g>
  );
};

const RevenueChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0.5 }}>
        <Bar dataKey="revenue" shape={<CustomBar />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
