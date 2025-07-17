import React from 'react';
import mockdata from '../../../data/mockdata.json';

function getRiderMilestones(riderId) {
  if (!riderId) return { firstRace: '-', firstPodium: '-', firstWin: '-' };
  const riderSessions = mockdata.sessions
    .map(session => ({
      ...session,
      classification: session.classification.filter(c => c.rider.id === riderId)
    }))
    .filter(session => session.classification.length > 0);
  const firstRace = riderSessions[0]?.session_name || '-';
  const firstPodium = riderSessions.find(s => s.classification[0]?.position <= 3)?.session_name || '-';
  const firstWin = riderSessions.find(s => s.classification[0]?.position === 1)?.session_name || '-';
  return { firstRace, firstPodium, firstWin };
}

const RiderMilestonesWidget = ({ riderUuid }) => {
  const data = getRiderMilestones(riderUuid);
  return (
    <div className="widget rider-milestones-widget">
      <h3>Rider Milestones</h3>
      <p>First Race: {data.firstRace}</p>
      <p>First Podium: {data.firstPodium}</p>
      <p>First Win: {data.firstWin}</p>
    </div>
  );
};

export default RiderMilestonesWidget;
