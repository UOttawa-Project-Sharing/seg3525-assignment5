import {
  getSeasons,
  getSeasonCategories,
  getStandings,
  getRider,
  getRiderStats,
  getRiderStatsBySeason,
  getEventsBySeason,
  getSessions,
  getClassification,
  getEntryList, getEventCategories,
} from './getterAPI';

// 1. CareerTimelineWidget: Get all events for a rider's career (by legacyId)
export const getCareerTimeline = async (legacyId) => {
  // Get all seasons
  const seasons = await getSeasons();
  // For each season, get all events, then filter for events where the rider participated
  const allEvents = await Promise.all(
    seasons.map(async (season) => {
      const events = await getEventsBySeason(season.id, true);
      return events;
    })
  );
  // Flatten and filter events by rider entry
  const eventsWithRider = [];
  for (const seasonEvents of allEvents) {
    for (const event of seasonEvents) {
      // For each event, check all categories
      const categories = await getSeasonCategories(event.season_id || event.seasonUuid || event.seasonId || event.season);
      for (const category of categories) {
        const entryList = await getEntryList(event.id, category.id);
        if (entryList.entry && entryList.entry.some(e => e.rider.legacy_id === legacyId)) {
          eventsWithRider.push({ ...event, category });
        }
      }
    }
  }
  return eventsWithRider;
};

// 2. RiderMilestonesWidget: Get major milestones for a rider (first win, podium, etc)
export const getRiderMilestones = async (legacyId) => {
  // Use stats by season to find first win, podium, etc
  const stats = await getRiderStatsBySeason(legacyId);
  // Example: find first win, first podium, etc
  const milestones = {};
  if (stats && Array.isArray(stats)) {
    for (const season of stats) {
      if (!milestones.firstWin && season.wins > 0) milestones.firstWin = season;
      if (!milestones.firstPodium && season.podiums > 0) milestones.firstPodium = season;
      if (!milestones.firstPole && season.poles > 0) milestones.firstPole = season;
    }
  }
  return milestones;
};

// 3. RiderProfileWidget: Get full profile for a rider
export const getRiderProfile = async (legacyId) => {
  return await getRider(legacyId);
};

// 4. RiderStatsWidget: Get stats for a rider (career and by season)
export const getRiderStatsWidget = async (legacyId) => {
  const careerStats = await getRiderStats(legacyId);
  const seasonStats = await getRiderStatsBySeason(legacyId);
  return { careerStats, seasonStats };
};

// 5. SeasonEvolutionWidget: Get standings for a rider across all seasons
export const getSeasonEvolution = async (legacyId) => {
  const seasons = await getSeasons();
  const evolution = [];
  for (const season of seasons) {
    const categories = await getSeasonCategories(season.id);
    for (const category of categories) {
      const standings = await getStandings(season.id, category.id);
      if (standings.classification) {
        const riderStanding = standings.classification.find(c => c.rider.legacy_id === legacyId);
        if (riderStanding) {
          evolution.push({ season: season.year, category: category.name, ...riderStanding });
        }
      }
    }
  }
  return evolution;
};

// 6. SpeedBySeasonWidget: Get top speed for a rider by season
export const getSpeedBySeason = async (legacyId) => {
  const seasons = await getSeasons();
  let speedData = [];
  for (const season of seasons) {
    const events = await getEventsBySeason(season.id, true);
    for (const event of events) {
      const categories = await getEventCategories(event.id);
        for (const category of categories) {
            const sessions = await getSessions(event.id, category.id);
            for (const session of sessions) {
                const classification = await getClassification(session.id, season.year, false);
                if (classification.classification) {
                    const riderClass = classification.classification.find(c => c.rider.legacy_id === parseInt(legacyId,10));
                    if (riderClass && riderClass.top_speed) {
                        speedData.push({
                            season: season.year,
                            event: event.name,
                            category: category.name,
                            topSpeed: riderClass.top_speed
                        });
                    }
                }
            }
        }
    }
  }
  console.log("aaaaaaaaaaa");
  return speedData;
};

// 7. TopSpeedWidget: Get the top speed for a given event/category
export const getTopSpeed = async (eventId, categoryId) => {
  const sessions = await getSessions(eventId, categoryId);
  let topSpeed = 0;
  let topRider = null;
  for (const session of sessions) {
    const classification = await getClassification(session.id, undefined, false);
    if (classification.classification) {
      for (const riderClass of classification.classification) {
        if (riderClass.top_speed && riderClass.top_speed > topSpeed) {
          topSpeed = riderClass.top_speed;
          topRider = riderClass;
        }
      }
    }
  }
  return { topSpeed, topRider };
};

// 8. TrophyDisplayWidget: Get all trophies (podiums, wins, etc) for a rider
export const getTrophyDisplay = async (legacyId) => {
  const stats = await getRiderStats(legacyId);
  return {
    wins: stats.wins,
    podiums: stats.podiums,
    poles: stats.poles,
    fastestLaps: stats.fastest_laps,
    championships: stats.championships
  };
};
