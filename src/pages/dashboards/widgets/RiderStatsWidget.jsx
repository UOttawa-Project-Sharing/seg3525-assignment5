import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getRiderStats} from "../../../data/jsonAPI.js";
import translations from '../../../data/lang';

const RiderStatsWidget = ({ riderLegacyId }) => {
  const [stats, setStats] = React.useState({
    totalRaces: 0,
    podiums: 0,
    wins: 0,
  });
  const language = useSelector((state) => state.language.value);

  useEffect(() => {
    getRiderStats(riderLegacyId).then(setStats);
  }, [riderLegacyId]);

  return (
    <div className="widget rider-stats-widget">
      <h3>{translations[language].widgets.riderStats.title}</h3>
      <p>{translations[language].widgets.riderStats.totalRaces}: {stats.all_races}</p>
      <p>{translations[language].widgets.riderStats.podiums}: {stats.all_podiums}</p>
      <p>{translations[language].widgets.riderStats.wins}: {stats.all_wins}</p>
    </div>
  );
};

export default RiderStatsWidget;
