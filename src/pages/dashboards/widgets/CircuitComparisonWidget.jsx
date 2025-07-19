import React from 'react';
import { circuits } from '../../../data/eventPerformanceMockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

export function CircuitComparisonWidget() {
  return (
    <div>
      <h3>Comparaison des Circuits</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={circuits}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="length" fill="#8884d8" name="Longueur (km)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
