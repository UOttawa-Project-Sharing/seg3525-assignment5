import React from 'react';
import mockdata from '../../../data/mockdata.json';

function getRiderStats(riderId) {
  if (!riderId) return { totalRaces: 0, podiums: 0, wins: 0 };
  const riderSessions = mockdata.sessions
    .map(session => ({
      ...session,
      classification: session.classification.filter(c => c.rider.id === riderId)
    }))
    .filter(session => session.classification.length > 0);
  const totalRaces = riderSessions.length;
  const podiums = riderSessions.reduce((acc, session) => acc + (session.classification[0]?.position <= 3 ? 1 : 0), 0);
  const wins = riderSessions.reduce((acc, session) => acc + (session.classification[0]?.position === 1 ? 1 : 0), 0);
  return { totalRaces, podiums, wins };
}

const RiderStatsWidget = ({ riderUuid }) => {
  const stats = getRiderStats(riderUuid);
  return (
    <div className="widget rider-stats-widget">
      <h3>Rider Statistics</h3>
      <p>Total Races: {stats.totalRaces}</p>
      <p>Podiums: {stats.podiums}</p>
      <p>Wins: {stats.wins}</p>
    </div>
  );
};

export default RiderStatsWidget;
