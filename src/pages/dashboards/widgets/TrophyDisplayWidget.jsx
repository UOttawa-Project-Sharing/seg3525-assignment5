import React from 'react';
import mockdata from '../../../data/mockdata.json';

function getTrophies(riderId) {
  if (!riderId) return [];
  const riderSessions = mockdata.sessions
    .map(session => ({
      ...session,
      classification: session.classification.filter(c => c.rider.id === riderId)
    }))
    .filter(session => session.classification.length > 0);
  return riderSessions.filter(s => s.classification[0]?.position === 1).map(s => ({
    name: s.session_name,
    year: s.session_name.split(' ')[0]
  }));
}

const TrophyDisplayWidget = ({ riderUuid }) => {
  const data = getTrophies(riderUuid);
  return (
    <div className="widget trophy-display-widget">
      <h3>Trophies</h3>
      <ul>
        {data.length > 0 ? data.map((trophy, idx) => (
          <li key={idx}>{trophy.name} ({trophy.year})</li>
        )) : <li>No trophies</li>}
      </ul>
    </div>
  );
};

export default TrophyDisplayWidget;
