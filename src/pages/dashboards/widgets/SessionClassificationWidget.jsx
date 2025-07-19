import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { sessionClassification } from '../../../data/standingsMockData';

export function SessionClassificationWidget() {
  return (
    <div>
      <h3>Classement Final (Session)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sessionClassification}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rider" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="points" fill="#8884d8" name="Points" />
          <Bar dataKey="topSpeed" fill="#ff6600" name="Top Speed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

