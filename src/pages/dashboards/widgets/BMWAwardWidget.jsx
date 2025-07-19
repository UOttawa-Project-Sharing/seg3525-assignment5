import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { bmwAwardStandings } from '../../../data/standingsMockData';

export function BMWAwardWidget() {
  return (
    <div>
      <h3>BMW Award Standings</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={bmwAwardStandings} dataKey="points" nameKey="rider" cx="50%" cy="50%" outerRadius={100} label>
            {bmwAwardStandings.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={["#e60000", "#0033cc", "#ff6600", "#00cc66"][index % 4]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

