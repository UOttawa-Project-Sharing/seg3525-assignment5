import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Badge, Spinner } from 'react-bootstrap';
import { getNextEvent } from "../../../data/jsonAPI.js";

const NextEventWidget = () => {
    const [nextEvent, setNextEvent] = useState(null);
    const [countdown, setCountdown] = useState("");
    const [next, setNext] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const event = await getNextEvent(next);
            if (event === null) {
                if (next > 0) {
                    setNext(0);
                    setNextEvent(null);
                } else {
                    setNextEvent(null);
                }
            } else {
                setNextEvent(event);
            }
            setLoading(false);
        };
        fetch();
    }, [next]);

    useEffect(() => {
        if (!nextEvent) return;
        const updateCountdown = () => {
            const now = new Date();
            const eventDate = new Date(Date.parse(nextEvent.date_start));
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

    return (
        <Card className="bg-transparent border-0 p-5 w-100">
            <Card.Body>
                <Row className="align-items-center mb-3">
                    <Col xs="auto">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => setNext(next > 0 ? next - 1 : 0)}
                            disabled={loading || next === 0}
                            aria-label="Previous Event"
                        >
                            &lt;
                        </Button>
                    </Col>
                    <Col>
                        <h4 className="mb-0 text-center">Next Event</h4>
                    </Col>
                    <Col xs="auto">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className="ms-2"
                            onClick={() => setNext(next + 1)}
                            disabled={loading}
                            aria-label="Next Event"
                        >
                            &gt;
                        </Button>
                    </Col>
                </Row>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: 120 }}>
                        <Spinner animation="border" />
                    </div>
                ) : nextEvent ? (
                    <Row className="align-items-center">
                        <Col xs="auto" className="d-none d-md-block">
                            <div
                                style={{
                                    fontSize: '3rem',
                                    background: '#f6f8fa',
                                    borderRadius: '50%',
                                    width: 70,
                                    height: 70,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 8,
                                    border: '2px solid #eee'
                                }}
                            >
                                <span role="img" aria-label="calendar">📅</span>
                            </div>
                        </Col>
                        <Col>
                            <h5 className="mb-2 fw-bold">{nextEvent.name}</h5>
                            <p className="mb-1">
                                <Badge bg="info" className="me-1">Date</Badge>
                                {new Date(Date.parse(nextEvent.date_start)).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                            </p>
                            <p className="mb-1">
                                <Badge bg="secondary" className="me-1">Location</Badge>
                                {nextEvent.circuit.name} - {nextEvent.country.name}
                            </p>
                            <p className="mb-1">
                                <Badge bg="warning" className="me-1 text-dark">Countdown</Badge>
                                <span style={{ fontWeight: 'bold', color: '#c77d12' }}>
                  <span role="img" aria-label="timer">⏳</span> {countdown}
                </span>
                            </p>
                        </Col>
                    </Row>
                ) : (
                    <div className="text-center py-4 text-muted">No upcoming events.</div>
                )}
            </Card.Body>
        </Card>
    );
};

export default NextEventWidget;