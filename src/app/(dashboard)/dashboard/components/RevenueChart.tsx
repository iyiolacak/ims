"use client";
import React from "react";
import { ResponsiveContainer, BarChart, Bar, BarProps } from 'recharts';
import CustomBar, { CustomBarProps } from "./CustomBar";

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
  { name: 'Nov', revenue: 2780 },
  { name: 'Dec', revenue: 1890 }
];

const RevenueChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0.5 }}>
        <Bar 
          dataKey="revenue" 
          shape={(props: BarProps) => {
            // Assert props as CustomBarProps
            const customProps = props as CustomBarProps;
            return <CustomBar {...customProps} />;
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
