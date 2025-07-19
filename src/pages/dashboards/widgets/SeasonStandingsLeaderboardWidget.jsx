import React from 'react';
import { seasonStandings } from '../../../data/standingsMockData';

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

