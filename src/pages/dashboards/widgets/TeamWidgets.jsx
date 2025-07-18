import React from 'react';
import { teamsData } from '../../../data/teamsMockData';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

export function TeamAnalysisWidget() {
  const data = teamsData.map(t => ({
    name: t.name,
    wins: t.cumulative.wins,
    podiums: t.cumulative.podiums,
    color: t.color,
  }));
  return (
    <div>
      <h3>Team Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="wins" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-wins-${index}`} fill={entry.color} />
            ))}
          </Bar>
          <Bar dataKey="podiums" fill="#82ca9d">
            {data.map((entry, index) => (
              <Cell key={`cell-podiums-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TeamAchievementsWidget() {
  const seasons = teamsData[0].achievements.map(a => a.season);
  const data = seasons.map((season, idx) => {
    const obj = { season };
    teamsData.forEach(team => {
      obj[team.name] = team.achievements[idx].wins;
    });
    return obj;
  });
  return (
    <div>
      <h3>Season Achievements (Wins)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="season" />
          <YAxis />
          <Tooltip />
          <Legend />
          {teamsData.map((team, idx) => (
            <Bar key={team.id} dataKey={team.name} fill={team.color} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TeamComparisonWidget() {
  const data = teamsData.map(t => ({
    name: t.name,
    points: t.cumulative.points,
    color: t.color,
  }));
  return (
    <div>
      <h3>Team Comparison (Points)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="points" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TeamPerformanceCardsWidget() {
  return (
    <div>
      <h3>Performance Cards</h3>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {teamsData.map(team => (
          <div key={team.id} style={{ background: team.color, color: '#fff', borderRadius: 8, padding: 16, minWidth: 120 }}>
            <h4>{team.name}</h4>
            <div>Wins: {team.cumulative.wins}</div>
            <div>Podiums: {team.cumulative.podiums}</div>
            <div>Points: {team.cumulative.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
