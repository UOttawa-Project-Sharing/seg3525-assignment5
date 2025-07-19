import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import mockdata from '../../../data/mockdata.json';

function getCurrentYearRiderPoles(riderId) {
  if (!riderId) return [];
  const currentYear = new Date().getFullYear();
  return mockdata.sessions
    .filter(session => {
      const yearMatch = session.session_name.match(/(\d{4})/);
      const sessionYear = yearMatch ? parseInt(yearMatch[1], 10) : currentYear;
      return sessionYear === currentYear;
    })
    .map(session => {
      const riderClass = session.classification.find(c => c.rider.id === riderId);
      return riderClass
        ? {
            race: session.session_name.replace(/^(\d{4} )?/, ''),
            position: riderClass.position
          }
        : null;
    })
    .filter(Boolean);
}

const SeasonEvolutionWidget = ({ riderLegacyId }) => {
  const data = getCurrentYearRiderPoles(riderLegacyId);
  return (
    <div className="widget season-evolution-widget">
      <h3>Pole Position Evolution (Current Year)</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="race" angle={-30} textAnchor="end" height={60} interval={0} />
            <YAxis reversed allowDecimals={false} label={{ value: 'Position', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={v => `P${v}`} />
            <Line type="monotone" dataKey="position" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        'No data'
      )}
    </div>
  );
};

export default SeasonEvolutionWidget;
