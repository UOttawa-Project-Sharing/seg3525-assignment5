import riders from './riders.json';
import riderStats from './riderStats.json';
import riderDetails from './riderDetails.json';
import standings from './standings.json';
import teams from './teams.json';
import broadcastSeasonCategories from './broadcastSeasonCategories.json';
import broadcastEvents from './broadcastEvents.json';
import seasonCategories from './seasonCategories.json';
import seasons from './seasons.json';
// import classifications from './classifications.json';
import events from './events.json';
// import sessions from './sessions.json';
// import sessionDetails from './sessionDetails.json';
import riderStatsBySeason from './riderStatsBySeason.json';

export const motoGPCategoryId = "e8c110ad-64aa-4e8e-8a86-f2f152f6a942";
export const brCategoryId = "737ab122-76e1-4081-bedb-334caaa18c70";
export const currentSeasonId = "ae6c6f0d-c652-44f8-94aa-420fc5b3dab4";
export const currentSeasonYear = 2025;

export const getCategories = async () => {
    const categories = seasons.map(s => {
        const seasonCatObj = seasonCategories.find(c => c.seasonUuid === s.id);
        const bcSeasonCatObj = broadcastSeasonCategories.find(c => c.seasonYear === s.year);

        // Guard for missing data
        if (!seasonCatObj || !bcSeasonCatObj || !seasonCatObj.data || !bcSeasonCatObj.data || s.year < 2006) {
            return null;
        }

        const category = seasonCatObj.data;
        const bcCategory = bcSeasonCatObj.data;
        const cats = [];

        for (const c of bcCategory) {
            const cat = category.find(cc => cc.legacy_id === c.legacy_id);
            if (!cat) {
                console.warn(`Category with legacy_id ${c.legacy_id} not found in season ${s.year}`);
                continue; // Skip if category not found
            }
            const nc = {
                legacy_id: c.legacy_id,
                bc_name: c.name,
                name: cat.name,
                bc_id: c.id,
                id: cat.id,
            };
            if (nc.legacy_id === null || nc.bc_name === null || nc.name === null || nc.bc_id === null || nc.id === null) {
                console.warn(`Incomplete category data for ${JSON.stringify(nc)} in season ${s.year}`);
                continue; // Skip if any required field is null
            }
            cats.push(nc);
        }

        return {
            seasonUuid: s.id,
            seasonYear: s.year,
            categories: cats
        };
    }).filter(c => c !== null);
    return categories;
}

export const getCurrentMotoGPStandings = async () => {
    return standings.find(s => s.seasonUuid === currentSeasonId && s.categoryUuid === motoGPCategoryId).data || {};
}

export const getStandingsByCategory = async (categoryId, seasonId) => {
    return standings.find(s => s.seasonUuid === seasonId && s.categoryUuid === categoryId).data || {};
}

export const getRidersByUuid = async (uid) => {
    const rider = riders.find(r => r.id === uid);
    if (!rider) {
        console.error(`Rider with UUID ${uid} not found.`);
        return null;
    }
    return rider;
}

export const getRiderByLegacyId = async (legacyId) => {
    const rider = riders.find(r => r.legacy_id === parseInt(legacyId));
    if (!rider) {
        console.error(`Rider with legacy ID ${legacyId} not found.`);
        return null;
    }
    return rider;
}

export const getRiderUuidByLegacyId = async (legacyId) => {
    const rider = riders.find(r => r.legacy_id === parseInt(legacyId));
    if (!rider) {
        console.error(`Rider with legacy ID ${legacyId} not found.`);
        return null;
    }
    return rider.id;
}

export const getRiderStatsByLegacyId = async (legacyId) => {
    const stats = riderStats.find(s => s.riderLegacyId === parseInt(legacyId));
    if (!stats) {
        console.error(`Stats for rider with legacy ID ${legacyId} not found.`);
        return null;
    }
    return stats.data;
}

export const getRiderStatsByUuid = async (uid) => {
    const rider = riders.find(r => r.id === uid);
    if (!rider) {
        console.error(`Rider with UUID ${uid} not found.`);
        return null;
    }
    return await getRiderStatsByLegacyId(rider.legacy_id);
}

export const getRidersIds = async () => {
    return riders.map(r => ({
        full_name: `${r.name} ${r.surname}`,
        uuid: r.id,
        legacy_id: r.legacy_id,
    }));
}

export const getCurrentMotoGPTop3Riders = async () => {
    const currentStandings = await getCurrentMotoGPStandings();
    if (!currentStandings.classification) return [];

    console.log("a");

    const getRider = async (uuid) => {
        const rider = await getRidersByUuid(uuid);
        if (rider) {
            return {
                id: rider.id,
                legacy_id: rider.legacy_id,
                name: rider.name,
                surname: rider.surname,
                full_name: `${rider.name} ${rider.surname}`,
                bikePicture: rider.current_career_step.team.picture,
                picture: rider.current_career_step.pictures.profile.main,
                number: rider.current_career_step.number,
                flag: rider.country.flag
            };
        } else {
            console.error(`Rider with UUID ${uuid} not found.`);
            return null; // Return null if the rider is not found
        }
    }

    const r = await currentStandings.classification
        .filter(c => c.position <= 3)
        .map(async (c) => ({
            position: c.position,
            rider: await getRider(c.rider.riders_api_uuid),
            team: c.team.name,
            points: c.points,
            podiums: c.podiums,
            wins: c.race_wins
        }));
    const rr = await Promise.all(r);
    return rr;
}

export const getRiderMilestones = async (legacyId) => {
    const rider = await getRiderByLegacyId(legacyId);
    const stats = await getRiderStatsByLegacyId(legacyId);
    if (!rider || !stats) {
        console.error(`Rider with legacyId ${legacyId} not found or has no stats.`);
        return [];
    }
    const firstGP = [];
    for (const gp of stats.first_grand_prix) {
        if (gp.event === null) continue; // Skip if no event is associated
        firstGP.push({
            year: gp.event.season,
            description: `First ${gp.category.name} GP: ${gp.event.name}`,
            category: gp.category.name,
            event: gp.event.name,
        });
    }
    const lastWins = [];
    for (const win of stats.last_wins) {
        if (win.event === null) continue; // Skip if no event is associated
        lastWins.push({
            year: win.event.season,
            description: `Last Win in ${win.category.name} at ${win.event.name}`,
            category: win.category.name,
            event: win.event.name,
        });
    }
    const firstPodiums = [];
    for (const podium of stats.first_podiums) {
        if (podium.event === null) continue; // Skip if no event is associated
        firstPodiums.push({
            year: podium.event.season,
            description: `First Podium in ${podium.category.name} at ${podium.event.name}`,
            category: podium.category.name,
            event: podium.event.name,
        });
    }
    const firstGPWins = [];
    for (const win of stats.first_grand_prix_victories) {
        if (win.event !== null) {
            firstGPWins.push({
                year: win.event.season,
                description: `First Win in ${win.category.name} at ${win.event.name}`,
                category: win.category.name,
                event: win.event.name,
            });
        }
    }
    const r = {
        first_race: firstGP.length > 0 ? firstGP.sort((a, b) => parseInt(a.year) - parseInt(b.year)) : { year: "N/A", description: "No Grand Prix found", category: "N/A", event: "N/A" },
        first_podium: firstPodiums.length > 0 ? firstPodiums.sort((a, b) => parseInt(a.year) - parseInt(b.year)) : { year: "N/A", description: "No Podium found", category: "N/A", event: "N/A" },
        first_win: firstGPWins.length > 0 ? firstGPWins.sort((a, b) => parseInt(a.year) - parseInt(b.year)) : { year: "N/A", description: "No Win found", category: "N/A", event: "N/A" },
        last_win: lastWins.length > 0 ? lastWins.sort((a, b) => parseInt(b.year) - parseInt(a.year)) : { year: "N/A", description: "No Last Win found", category: "N/A", event: "N/A" }
    };
    console.log(r);
    return r;
}

export const getTeamColor = async (id, year) => {
    const teamObj = teams.find(t => t.categoryUuid === id && t.seasonYear === year);
    if (!teamObj || !teamObj.data) return [];
    return teamObj.data.map(tt => ({
        name: tt.name,
        color: tt.color,
        textColor: tt.text_color
    }));
}

export const getRiderNameByLegacyId = async (legacyId) => {
    const rider = await getRiderByLegacyId(legacyId);
    if (!rider) {
        console.error(`Rider with legacy ID ${legacyId} not found.`);
        return null;
    }
    return `${rider.name} ${rider.surname}`;
}

export const getRiderSeasonHistory = async (legacyId) => {
    return riderStatsBySeason
        .find(s => s.riderLegacyId === parseInt(legacyId)).data;
}

export const getRiderStats = async (legacyId) => {
    const stats = await getRiderStatsByLegacyId(legacyId);
    return {
        all_races: stats.all_races.total,
        all_podiums: stats.podiums.total,
        all_wins: stats.grand_prix_victories.total,
    };
}

export const getRiderDetailsByLegacyId = async (legacyId) => {
    const riderId = await getRiderUuidByLegacyId(legacyId);
    // console.log(riderId);
    return riderDetails.find(r => r.riderId === riderId).data || {};
}

export const getCareerTimeline = async (legacyId) => {
    const riderDetails = await getRiderDetailsByLegacyId(legacyId);
    return riderDetails;
}

export const getSeasonEvents = async (seasonId) => {
    const seasonEvents = events.filter(e => e.seasonUuid === seasonId);
    if (!seasonEvents || seasonEvents.length === 0) {
        console.error(`No events found for season ID ${seasonId}`);
        return [];
    }
    const ev = [];
    for (const event of seasonEvents) {
        if (!event.data || event.data.length === 0) {
            console.warn(`No data found for event in season ${seasonId}`);
            continue;
        }
        ev.push(...event.data);
    }
    return ev || [];
}
export const getFinishedSeasonEvents = async (seasonId) => {
    const seasonEvents = events.find(e => e.seasonUuid === seasonId && e.isFinished===true);
    if (!seasonEvents || !seasonEvents.data || seasonEvents.data.length === 0) {
        console.error(`No finished events found for season ID ${seasonId}`);
        return [];
    }
    return seasonEvents.data;
}

export const getNextEvent = async (n) => {
    const currentSeasonEvents = await getSeasonEvents(currentSeasonId);
    // for (const event of currentSeasonEvents) {
    //     console.log(event.date_start);
    // }
    if (!currentSeasonEvents || currentSeasonEvents.length === 0) {
        console.error(`No events found for current season ID ${currentSeasonId}`);
        return null;
    }
    const now = new Date();
    // console.log(Date.parse(currentSeasonEvents[0].date_start));
    const upcomingEvents = currentSeasonEvents.filter(event => {
        // console.log(new Date(Date.parse(event.date_start)), Date.parse(event.date_start), event.date_start, " vs ", now.getTime(), now, Date.parse(event.date_start) > now.getTime());
        return Date.parse(event.date_start) > now.getTime();
    });
    if (upcomingEvents.length === 0) {
        console.warn("No upcoming events found.");
        return null;
    }
    // Sort by start date and return the first one
    upcomingEvents.sort((a, b) => Date.parse(a.date_start) - Date.parse(b.date_start));
    console.log("Next event:", upcomingEvents[0]);
    if (n < 0 || n >= upcomingEvents.length) {
        console.warn(`Invalid index ${n} for upcoming events. Returning Null.`);
        return null;
    }
    return upcomingEvents[n];
}

export const getFinishedEventByYear = async (year) => {
    return broadcastEvents.find(e => e.seasonYear === year).data.filter(e => e.status === "FINISHED" && e.type === "SPORT");
}