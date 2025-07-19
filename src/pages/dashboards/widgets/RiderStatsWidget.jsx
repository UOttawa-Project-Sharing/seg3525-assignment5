import React, {useEffect} from 'react';
import {getRiderStats} from "../../../data/jsonAPI.js";

const RiderStatsWidget = ({ riderLegacyId }) => {
  const [stats, setStats] = React.useState({
    totalRaces: 0,
    podiums: 0,
    wins: 0,
  });
    useEffect(() => {
        getRiderStats(riderLegacyId).then(setStats);
    }, [riderLegacyId]);
  return (
    <div className="widget rider-stats-widget">
      <h3>Rider Statistics</h3>
      <p>Total Races: {stats.all_races}</p>
      <p>Podiums: {stats.all_podiums}</p>
      <p>Wins: {stats.all_wins}</p>
    </div>
  );
};

export default RiderStatsWidget;
