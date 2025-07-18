// Mock data for events, circuits, sessions, grid, and weather
export const events = [
  { id: 'event1', name: 'Qatar GP', circuit: 'Losail', date: '2025-03-10' },
  { id: 'event2', name: 'Italian GP', circuit: 'Mugello', date: '2025-05-20' },
];

export const circuits = [
  { id: 'circuit1', name: 'Losail', country: 'Qatar', length: 5.4 },
  { id: 'circuit2', name: 'Mugello', country: 'Italy', length: 5.2 },
];

export const sessions = [
  { id: 'session1', eventId: 'event1', type: 'Qualification', weather: { temp: 28, humidity: 60, condition: 'Dry' } },
  { id: 'session2', eventId: 'event1', type: 'Race', weather: { temp: 30, humidity: 55, condition: 'Dry' } },
  { id: 'session3', eventId: 'event2', type: 'Test', weather: { temp: 22, humidity: 70, condition: 'Wet' } },
];

export const grid = [
  { sessionId: 'session1', position: 1, rider: 'Francesco Bagnaia', team: 'Ducati' },
  { sessionId: 'session1', position: 2, rider: 'Fabio Quartararo', team: 'Yamaha' },
  { sessionId: 'session2', position: 1, rider: 'Marc Marquez', team: 'Honda' },
  { sessionId: 'session3', position: 1, rider: 'Joan Mir', team: 'Suzuki' },
];

export function getEventById(id) {
  return events.find(e => e.id === id);
}
export function getCircuitById(id) {
  return circuits.find(c => c.id === id);
}
export function getSessionById(id) {
  return sessions.find(s => s.id === id);
}
export function getGridBySessionId(sessionId) {
  return grid.filter(g => g.sessionId === sessionId);
}

