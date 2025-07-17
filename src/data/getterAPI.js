import axios from "axios";

// CORS proxy and base API
const CORS_PROXY = "https://corsproxy.io/?";
const MOTOGP_BASE = "https://api.motogp.pulselive.com/motogp/v1";

// Helper to build proxied URLs
function proxiedUrl(endpoint, params = {}) {
    let url = MOTOGP_BASE + endpoint;
    const keys = Object.keys(params);
    if (keys.length) {
        const search = new URLSearchParams(params).toString();
        url += "?" + search;
    }
    return CORS_PROXY + encodeURIComponent(url);
}

// Results API

// 1. Live Timing - https://api.motogp.pulselive.com/motogp/v1/timing-gateway/livetiming-lite
export const getLiveTiming = async () => {
    const url = proxiedUrl("/timing-gateway/livetiming-lite");
    const res = await axios.get(url);
    return res.data;
};

// 2. Get Seasons - https://api.motogp.pulselive.com/motogp/v1/results/seasons
export const getSeasons = async () => {
    const url = proxiedUrl("/results/seasons");
    const res = await axios.get(url);
    return res.data;
};

// 3. Get Events by season - https://api.motogp.pulselive.com/motogp/v1/results/events?seasonUuid={}&isFinished={}
export const getEventsBySeason = async (seasonUuid, isFinished) => {
    const url = proxiedUrl("/results/events", { seasonUuid, isFinished });
    const res = await axios.get(url);
    return res.data;
};

// 4. Get Season’s Categories - https://api.motogp.pulselive.com/motogp/v1/results/categories?seasonUuid={}
export const getSeasonCategories = async (seasonUuid) => {
    const url = proxiedUrl("/results/categories", { seasonUuid });
    const res = await axios.get(url);
    return res.data;
};

// 5. Get Event’s Categories - https://api.motogp.pulselive.com/motogp/v1/results/categories?eventUuid={}
export const getEventCategories = async (eventUuid) => {
    const url = proxiedUrl("/results/categories", { eventUuid });
    const res = await axios.get(url);
    return res.data;
};

// 6. Get Sessions for Event+Category - https://api.motogp.pulselive.com/motogp/v1/results/sessions?eventUuid={}&categoryUuid={}
export const getSessions = async (eventUuid, categoryUuid) => {
    const url = proxiedUrl("/results/sessions", { eventUuid, categoryUuid });
    const res = await axios.get(url);
    return res.data;
};

// 7. Get Session
export const getSession = async (sessionId) => {
    const url = proxiedUrl(`/results/sessions/${sessionId}`);
    const res = await axios.get(url);
    return res.data;
};

// 8. Get Classification for a session
export const getClassification = async (sessionId, seasonYear, isTest) => {
    const url = proxiedUrl(
        `/results/session/${sessionId}/classification`,
        { seasonYear, test: isTest }
    );
    const res = await axios.get(url);
    return res.data;
};

// 9. Get Entry List (riders in event/category)
export const getEntryList = async (eventId, categoryUuid) => {
    const url = proxiedUrl(`/event/${eventId}/entry`, { categoryUuid });
    const res = await axios.get(url);
    return res.data;
};

// 10. Get Grid Positions for event/category
export const getGridPositions = async (eventId, categoryId) => {
    const url = proxiedUrl(`/results/event/${eventId}/category/${categoryId}/grid`);
    const res = await axios.get(url);
    return res.data;
};

// 11. Get Standings (rider standings) - https://api.motogp.pulselive.com/motogp/v1/results/standings?seasonUuid={}&categoryUuid={}
export const getStandings = async (seasonUuid, categoryUuid) => {
    const url = proxiedUrl("/results/standings", { seasonUuid, categoryUuid });
    const res = await axios.get(url);
    return res.data;
};

// 12. Get Standings Files
export const getStandingsFiles = async (seasonUuid, categoryUuid) => {
    const url = proxiedUrl("/results/standings/files", { seasonUuid, categoryUuid });
    const res = await axios.get(url);
    return res.data;
};

// 13. Get Rider qualifying standings (BMW Award)
export const getBMWAward = async (seasonUuid) => {
    const url = proxiedUrl("/results/standings/bmwaward", { seasonUuid });
    const res = await axios.get(url);
    return res.data;
};

// Broadcast API

// 14. Season categories (broadcast)
export const getBroadcastSeasonCategories = async (seasonYear) => {
    const url = proxiedUrl("/categories", { seasonYear });
    const res = await axios.get(url);
    return res.data;
};

// 15. Get Broadcast Events by seasonYear
export const getBroadcastEvents = async (seasonYear) => {
    const url = proxiedUrl("/events", { seasonYear });
    const res = await axios.get(url);
    return res.data;
};

// 16. Get single Broadcast Event
export const getBroadcastEvent = async (eventId) => {
    const url = proxiedUrl(`/events/${eventId}`);
    const res = await axios.get(url);
    return res.data;
};

// 17. Get all riders (current season)
export const getRiders = async () => {
    const url = proxiedUrl("/riders");
    const res = await axios.get(url);
    return res.data;
};

// 18. Get single rider (by rider id)
export const getRider = async (riderId) => {
    const url = proxiedUrl(`/riders/${riderId}`);
    const res = await axios.get(url);
    return res.data;
};

// 19. Get rider statistics (by legacyId)
export const getRiderStats = async (legacyId) => {
    const url = proxiedUrl(`/riders/${legacyId}/stats`);
    const res = await axios.get(url);
    return res.data;
};

// 20. Get rider statistics by season (by legacyId)
export const getRiderStatsBySeason = async (legacyId) => {
    const url = proxiedUrl(`/riders/${legacyId}/statistics`);
    const res = await axios.get(url);
    return res.data;
};

// 21. Get teams (and all riders/all seasons)
export const getTeams = async (categoryUuid, seasonYear) => {
    const url = proxiedUrl("/teams", { categoryUuid, seasonYear });
    const res = await axios.get(url);
    return res.data;
};

// 22. Get MotoGP top 3 riders from the current season (utility function)
export const getMotoGPTop3Riders = async () => {
    const seasons = await getSeasons();
    const currentSeason = seasons.find((season) => season.current);
    if (!currentSeason) throw new Error("No current season found.");

    const categories = await getSeasonCategories(currentSeason.id);
    const motogpCategory = categories.find(
        (cat) => cat.legacy_id === 3 || cat.name === "MotoGP™" || cat.name === "MotoGP"
    );
    if (!motogpCategory) throw new Error("MotoGP category not found for current season.");

    const standings = await getStandings(currentSeason.id, motogpCategory.id);
    if (!standings.classification || !Array.isArray(standings.classification)) {
        throw new Error("Classification data not found.");
    }
    const top3 = standings.classification.slice(0, 3);
    // for each rider, add their rider info to the object from getRider
    return await Promise.all(
        top3.map(async (riderObj) => {
            const rider = await getRider(riderObj.rider.riders_api_uuid);
            // const constructor = await getTeams(motogpCategory.id, currentSeason.year);
            // const team = constructor.find((team) => team.riders.some((r) => r.legacy_id === rider.legacy_id));
            return {
                ...riderObj,
                riderInfo: {
                    ...rider,
                },
            };
        })
    );
    // return top3;
};