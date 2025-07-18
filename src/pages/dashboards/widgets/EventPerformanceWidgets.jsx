import React from 'react';
import { events, circuits, sessions, grid, getEventById, getCircuitById, getSessionById, getGridBySessionId } from '../../../data/eventPerformanceMockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

export function CircuitComparisonWidget() {
  return (
    <div>
      <h3>Comparaison des Circuits</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={circuits}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="length" fill="#8884d8" name="Longueur (km)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SessionTypeWeatherWidget({ type }) {
  const filtered = sessions.filter(s => !type || s.type === type);
  return (
    <div>
      <h3>Sessions par Type & Météo</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={filtered}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="weather.temp" fill="#e60000" name="Température (°C)" />
          <Bar dataKey="weather.humidity" fill="#0033cc" name="Humidité (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EventOverviewWidget({ eventId }) {
  const event = getEventById(eventId);
  const eventSessions = sessions.filter(s => s.eventId === eventId);
  return (
    <div>
      <h3>Événement: {event ? event.name : eventId}</h3>
      <div>Date: {event ? event.date : '-'}</div>
      <div>Circuit: {event ? event.circuit : '-'}</div>
      <h4>Sessions</h4>
      <ul>
        {eventSessions.map(s => (
          <li key={s.id}>
            {s.type} | Temp: {s.weather.temp}°C | Humidité: {s.weather.humidity}% | Condition: {s.weather.condition}
          </li>
        ))}
      </ul>
      <h4>Grille de départ</h4>
      {eventSessions.map(s => (
        <div key={s.id}>
          <strong>{s.type}:</strong>
          <ul>
            {getGridBySessionId(s.id).map(g => (
              <li key={g.position}>{g.position}. {g.rider} ({g.team})</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

