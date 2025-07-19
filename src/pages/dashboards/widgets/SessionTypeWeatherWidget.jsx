import React from 'react';
import { sessions } from '../../../data/eventPerformanceMockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

export function SessionTypeWeatherWidget({ type }) {
  const filtered = sessions.filter(s => !type || s.type === type);
  return (
    <div>
      <h3>Sessions par Type & Météo</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={filtered}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="weather.temp" fill="#e60000" name="Température (°C)" />
          <Bar dataKey="weather.humidity" fill="#0033cc" name="Humidité (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

