import React from 'react'

import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Completed", value: 1 },
  { name: "Pending", value: 0 },
  { name: "Rejected", value: 0 },
];

const COLORS = ["#2E7D32", "#1976D2", "#D32F2F"];

const TicketStatusChart = () => {
  return (
    <PieChart width={320} height={320}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={90}   // 👈 hole size
        outerRadius={130}  // 👈 thickness
        paddingAngle={2}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>

      {/* 👇 Tooltip on hover */}
      <Tooltip />
    </PieChart>
  );
};

export default TicketStatusChart;
