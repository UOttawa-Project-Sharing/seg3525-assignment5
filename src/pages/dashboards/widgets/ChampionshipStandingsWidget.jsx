import React from 'react';

// Dummy data for MotoGP 2025 Championship Standings
const standings = [
  { position: 1, rider: 'Francesco Bagnaia', team: 'Ducati', points: 220 },
  { position: 2, rider: 'Marc Marquez', team: 'Honda', points: 205 },
  { position: 3, rider: 'Fabio Quartararo', team: 'Yamaha', points: 190 },
  // Add more riders as needed
];

const barColors = [
  '#e63946', // Ducati
  '#457b9d', // Honda
  '#f1faee', // Yamaha
  '#a8dadc', // Other
];

const getBarColor = (team) => {
  switch (team) {
    case 'Ducati': return barColors[0];
    case 'Honda': return barColors[1];
    case 'Yamaha': return barColors[2];
    default: return barColors[3];
  }
};

const ChampionshipStandingsWidget = () => {
  const maxPoints = Math.max(...standings.map(s => s.points));
  return (
    <div>
      <h2>MotoGP 2025 Championship Standings</h2>
      <div style={{ padding: '10px' }}>
        {standings.map((row) => (
          <div key={row.position} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ width: 30, textAlign: 'right', marginRight: 8, color: '#fff' }}>{row.position}</span>
            <span style={{ width: 140, marginRight: 8, color: '#fff' }}>{row.rider}</span>
            <span style={{ width: 90, marginRight: 8, color: '#fff' }}>{row.team}</span>
            <div style={{ flex: 1, marginRight: 8, background: '#222', borderRadius: 6, height: 24, position: 'relative' }}>
              <div
                style={{
                  width: `${(row.points / maxPoints) * 100}%`,
                  background: getBarColor(row.team),
                  height: '100%',
                  borderRadius: 6,
                  transition: 'width 0.5s',
                }}
              ></div>
              <span style={{ position: 'absolute', right: 10, top: 2, color: '#fff', fontWeight: 'bold' }}>{row.points}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChampionshipStandingsWidget;
