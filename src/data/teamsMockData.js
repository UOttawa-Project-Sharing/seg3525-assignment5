// Mock data for MotoGP teams and constructors
export const teamsData = [
  {
    id: 'ducati',
    name: 'Ducati',
    color: '#e60000',
    constructors: ['Ducati'],
    achievements: [
      { season: 2022, wins: 12, podiums: 20, points: 400 },
      { season: 2023, wins: 10, podiums: 18, points: 370 },
    ],
    cumulative: { wins: 50, podiums: 90, points: 1800 },
  },
  {
    id: 'yamaha',
    name: 'Yamaha',
    color: '#0033cc',
    constructors: ['Yamaha'],
    achievements: [
      { season: 2022, wins: 5, podiums: 12, points: 250 },
      { season: 2023, wins: 7, podiums: 15, points: 300 },
    ],
    cumulative: { wins: 40, podiums: 80, points: 1600 },
  },
  {
    id: 'honda',
    name: 'Honda',
    color: '#ff6600',
    constructors: ['Honda'],
    achievements: [
      { season: 2022, wins: 3, podiums: 8, points: 180 },
      { season: 2023, wins: 4, podiums: 10, points: 210 },
    ],
    cumulative: { wins: 35, podiums: 70, points: 1400 },
  },
];

