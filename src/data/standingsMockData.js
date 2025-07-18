// Mock data for standings, session classification, and BMW award
export const sessionClassification = [
  { id: 'session1', position: 1, rider: 'Francesco Bagnaia', team: 'Ducati', points: 25, bestLap: '1:32.500', laps: 22, topSpeed: 350, podium: true, pole: true, win: true },
  { id: 'session2', position: 2, rider: 'Fabio Quartararo', team: 'Yamaha', points: 20, bestLap: '1:32.700', laps: 22, topSpeed: 347, podium: true, pole: false, win: false },
  { id: 'session3', position: 3, rider: 'Marc Marquez', team: 'Honda', points: 16, bestLap: '1:32.800', laps: 22, topSpeed: 345, podium: true, pole: false, win: false },
  { id: 'session4', position: 4, rider: 'Joan Mir', team: 'Suzuki', points: 13, bestLap: '1:33.000', laps: 22, topSpeed: 343, podium: false, pole: false, win: false },
];

export function getSessionClassificationById(id) {
  return sessionClassification.find(s => s.id === id);
}

export const seasonStandings = [
  { id: 'rider1', rider: 'Francesco Bagnaia', team: 'Ducati', points: 350, podiums: 12, poles: 5, wins: 8 },
  { id: 'rider2', rider: 'Fabio Quartararo', team: 'Yamaha', points: 320, podiums: 10, poles: 4, wins: 6 },
  { id: '7444', rider: 'Marc Marquez', team: 'Honda', points: 280, podiums: 8, poles: 3, wins: 4 },
  { id: 'rider4', rider: 'Joan Mir', team: 'Suzuki', points: 250, podiums: 6, poles: 2, wins: 2 },
];

export function getSeasonStandingById(id) {
  return seasonStandings.find(s => s.id === id);
}

export const bmwAwardStandings = [
  { id: 'bmw1', rider: 'Francesco Bagnaia', points: 120 },
  { id: 'bmw2', rider: 'Fabio Quartararo', points: 110 },
  { id: 'bmw3', rider: 'Marc Marquez', points: 100 },
  { id: 'bmw4', rider: 'Joan Mir', points: 90 },
];

export function getBMWAwardStandingById(id) {
  return bmwAwardStandings.find(s => s.id === id);
}
