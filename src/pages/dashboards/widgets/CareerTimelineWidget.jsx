import React from 'react';
import mockdata from '../../../data/mockdata.json';

function getCareerTimeline(riderId) {
  if (!riderId) return [];
  const riderSessions = mockdata.sessions
    .map(session => ({
      ...session,
      classification: session.classification.filter(c => c.rider.id === riderId)
    }))
    .filter(session => session.classification.length > 0);
  return riderSessions.map(session => ({
    year: session.session_name.split(' ')[0],
    description: `Participated in ${session.session_name}`
  }));
}

const CareerTimelineWidget = ({ riderUuid }) => {
  const data = getCareerTimeline(riderUuid);
  return (
    <div className="widget career-timeline-widget">
      <h3>Career Timeline</h3>
      <ul>
        {data.length > 0 ? data.map((event, idx) => (
          <li key={idx}>{event.year}: {event.description}</li>
        )) : <li>No data</li>}
      </ul>
    </div>
  );
};

export default CareerTimelineWidget;
