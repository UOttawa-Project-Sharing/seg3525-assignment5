import React from 'react';
import { sessionClassification, seasonStandings, bmwAwardStandings } from '../../../data/standingsMockData';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

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

export function SeasonStandingsLeaderboardWidget() {
  return (
    <div>
      <h3>Classement Saison (Leaderboard)</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#222', color: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#444' }}>
            <th style={{ padding: '8px', border: '1px solid #333' }}>#</th>
            <th style={{ padding: '8px', border: '1px solid #333' }}>Rider</th>
            <th style={{ padding: '8px', border: '1px solid #333' }}>Team</th>
            <th style={{ padding: '8px', border: '1px solid #333' }}>Points</th>
            <th style={{ padding: '8px', border: '1px solid #333' }}>Podiums</th>
            <th style={{ padding: '8px', border: '1px solid #333' }}>Poles</th>
            <th style={{ padding: '8px', border: '1px solid #333' }}>Wins</th>
          </tr>
        </thead>
        <tbody>
          {seasonStandings
            .sort((a, b) => b.points - a.points)
            .map((rider, idx) => (
              <tr key={rider.id} style={{ background: idx % 2 === 0 ? '#333' : '#222' }}>
                <td style={{ padding: '8px', border: '1px solid #333' }}>{idx + 1}</td>
                <td style={{ padding: '8px', border: '1px solid #333' }}>{rider.rider}</td>
                <td style={{ padding: '8px', border: '1px solid #333' }}>{rider.team}</td>
                <td style={{ padding: '8px', border: '1px solid #333' }}>{rider.points}</td>
                <td style={{ padding: '8px', border: '1px solid #333' }}>{rider.podiums}</td>
                <td style={{ padding: '8px', border: '1px solid #333' }}>{rider.poles}</td>
                <td style={{ padding: '8px', border: '1px solid #333' }}>{rider.wins}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

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

export function RiderSeasonHistoryWidget({ riderName }) {
  const riderData = seasonStandings.find(r => r.id === riderName);
  if (!riderData) return <div>No data for {riderName}</div>;
  const data = [
    { stat: 'Points', value: riderData.points },
    { stat: 'Podiums', value: riderData.podiums },
    { stat: 'Poles', value: riderData.poles },
    { stat: 'Wins', value: riderData.wins },
  ];
  return (
    <div>
      <h3>Historique de Saison: {riderName}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="stat" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
