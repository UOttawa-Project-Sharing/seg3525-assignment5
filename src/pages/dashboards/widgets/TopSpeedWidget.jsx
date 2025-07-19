import React from 'react';
import {RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip} from 'recharts';
import mockdata from '../../../data/mockdata.json';

// // Example mock data for a single rider
// const topSpeed = { rider: 'Francesco Bagnaia', speed: 362.4, team: 'Ducati' };
// const maxSpeed = 370; // Set a reasonable max for the chart
//
function getTopSpeedForRider(riderId) {
  let topEntry = null;
  mockdata.sessions.forEach(session => {
    session.classification.forEach(entry => {
      if (entry.rider.id === riderId) {
        if (!topEntry || entry.top_speed > topEntry.top_speed) {
          topEntry = entry;
        }
      }
    });
  });
  return topEntry;
}

const TopSpeedWidget = ({ riderLegacyId }) => {
  const entry = riderLegacyId ? getTopSpeedForRider(riderLegacyId) : null;

  // fallback if no rider selected or found
  const topSpeed = entry ? {
    rider: entry.rider.full_name,
    speed: entry.top_speed,
    team: entry.team.name
  } : { rider: 'No rider selected', speed: 0, team: '' };
  const data = [
      {
          name: topSpeed.rider,
          speed: topSpeed.speed,
          fill: '#FF0000',
      },
      {
          name: "Max Speed",
          speed: 370,
          fill: '#000',
      },
  ];

  return (
    <div style={{
      textAlign: 'center',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <h3 style={{ marginBottom: '1rem', color: '#FF0000', letterSpacing: 1 }}>Top Speed</h3>
      <div style={{ width: '100%', height: 250, margin: '0 0', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            barSize={18}
            data={data}
            startAngle={225}
            endAngle={-45}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="speed"
              baseValue={500}
              cornerRadius={10}
              maxBarSize={18}
              // label={{ position: 'center', fill: '#fff', fontSize: 24, fontWeight: 700 }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '50%',
          textAlign: 'center',
            transform: 'translateY(-50%)',
          fontSize: 28,
          fontWeight: 700,
          color: '#FF0000',
          textShadow: '0 0 20px rgba(0, 0, 0, 1)',
            zIndex: -1
        }}>
          {topSpeed.speed} <span style={{ fontSize: 16, color: '#fff' }}>km/h</span>
        </div>
      </div>
      <div style={{ marginTop: '1.2rem', fontSize: 18 }} className={"m-0 p-0"}>
        <span style={{ fontWeight: 600 }}>{topSpeed.rider}</span> <span style={{ color: '#aaa' }}>({topSpeed.team})</span>
      </div>
    </div>
  );
};

export default TopSpeedWidget;
