import React from 'react';
import mockdata from '../../../data/mockdata.json';

function getSpeedBySeason(riderId) {
  if (!riderId) return [];
  const riderSessions = mockdata.sessions
    .map(session => ({
      ...session,
      classification: session.classification.filter(c => c.rider.id === riderId)
    }))
    .filter(session => session.classification.length > 0);
  return riderSessions.map(session => ({
    year: session.session_name.split(' ')[0],
    maxSpeed: session.classification[0]?.top_speed,
    avgSpeed: session.classification[0]?.top_speed // Placeholder for average speed, replace with actual logic
  }));
}

const SpeedBySeasonWidget = ({ riderUuid }) => {
  const data = getSpeedBySeason(riderUuid);
  return (
    <div className="widget speed-by-season-widget">
      <h3>Speed by Season</h3>
      {data.length > 0 ? data.map((season, idx) => (
        <div key={idx}>
          <strong>{season.year}:</strong> Max {season.maxSpeed} km/h, Avg {season.avgSpeed} km/h
        </div>
      )) : 'No data'}
    </div>
  );
};

export default SpeedBySeasonWidget;
