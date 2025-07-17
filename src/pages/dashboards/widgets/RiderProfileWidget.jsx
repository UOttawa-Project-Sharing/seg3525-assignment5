import React from 'react';
import mockdata from '../../../data/mockdata.json';

function getRiderProfile(riderId) {
  if (!riderId) return { name: '-', nationality: '-', team: '-' };
  const riderObj = mockdata.riders.find(r => r.rider.id === riderId);
  return {
    name: riderObj?.rider?.full_name || '-',
    nationality: riderObj?.rider?.country?.name || '-',
    team: riderObj?.team?.name || '-'
  };
}

const RiderProfileWidget = ({ riderUuid }) => {
  const data = getRiderProfile(riderUuid);
  return (
    <div className="widget rider-profile-widget">
      <h3>Rider Profile</h3>
      <p>Name: {data.name}</p>
      <p>Nationality: {data.nationality}</p>
      <p>Team: {data.team}</p>
    </div>
  );
};

export default RiderProfileWidget;
