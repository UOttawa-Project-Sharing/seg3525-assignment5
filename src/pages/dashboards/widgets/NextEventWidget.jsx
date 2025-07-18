import React, { useEffect, useState } from 'react';
import mockdata from '../../../data/mockdata.json';

// Example: assumes mockdata.events is an array of event objects with a date property
function getNextEvent(events) {
    const now = new Date();
    return events
        .filter(event => new Date(event.date) > now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
}

const NextEventWidget = () => {
    const nextEvent = getNextEvent(mockdata.events || []);
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        if (!nextEvent) return;
        const updateCountdown = () => {
            const now = new Date();
            const eventDate = new Date(nextEvent.date);
            const diff = eventDate - now;
            if (diff <= 0) {
                setCountdown("Event started!");
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        };
        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
        return () => clearInterval(timer);
    }, [nextEvent]);

    if (!nextEvent) return (
        <div className="widget next-event-widget" >
            <h3 style={{marginBottom: '12px'}}>Next Event</h3>
            <p>No upcoming events.</p>
        </div>
    );
    return (
        <div className="widget next-event-widget" >
            <h3 style={{marginBottom: '12px'}}>Next Event</h3>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <div style={{fontSize: '2.5rem', marginRight: '8px'}}>
                    <span role="img" aria-label="calendar">📅</span>
                </div>
                <div>
                    <p style={{fontSize: '1.25rem', fontWeight: 'bold', margin: 0}}>{nextEvent.name}</p>
                    <p style={{margin: '4px 0', fontSize: '1rem'}}>
                        <span style={{fontWeight: 'bold'}}>Date:</span> {new Date(nextEvent.date).toLocaleString('en-US', {dateStyle: 'medium', timeStyle: 'short'})}
                    </p>
                    <p style={{margin: '4px 0', fontSize: '1rem'}}>
                        <span style={{fontWeight: 'bold'}}>Location:</span> {nextEvent.location}
                    </p>
                    <p style={{margin: '8px 0', fontSize: '1.1rem', fontWeight: 'bold', color: '#ffd700'}}>
                        <span role="img" aria-label="timer">⏳</span> {countdown}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NextEventWidget;
