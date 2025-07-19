import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Spinner, Badge, Container, Table } from 'react-bootstrap';
import { getCategories, getFinishedEventByYear } from "../../../data/jsonAPI.js";
import {useSelector} from "react-redux";

export function EventOverviewWidget({ eventId }) {
    const [events, setEvents] = useState(null);
    const [event, setEvent] = useState(null);
    const [categories, setCategories] = useState(null);
    const [year, setYear] = useState(2025);
    const [loadingEvents, setLoadingEvents] = useState(false);
    const language = useSelector((state) => state.language.value);

    // Load season years (categories)
    useEffect(() => {
        const fetch = async () => {
            const cats = await getCategories();
            setCategories(cats);
        };
        fetch();
    }, []);

    // Load events for selected year
    useEffect(() => {
        const fetch = async () => {
            setLoadingEvents(true);
            const evs = await getFinishedEventByYear(year);
            setEvents(evs);
            if (evs && evs.length > 0) {
                setEvent(evs[0]);
            } else {
                setEvent(null);
            }
            setLoadingEvents(false);
        };
        fetch();
    }, [year]);

    // If events are loading
    if (!categories || loadingEvents) {
        return (
            <Card className="mb-4">
                <Card.Body>
                    <div className="d-flex justify-content-center align-items-center" style={{ height: 120 }}>
                        <Spinner animation="border" />
                    </div>
                </Card.Body>
            </Card>
        );
    }

    // Helper to format length with units
    function formatLength(obj) {
        if (!obj) return null;
        if (obj.kiloMeters && obj.miles) {
            return `${obj.kiloMeters} km / ${obj.miles} mi`;
        }
        if (obj.meters) {
            return `${obj.meters} m`;
        }
        return null;
    }

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <Container fluid>
                    <Row className="mb-4">
                        <Col xs={12} md={6}>
                            <Form.Group controlId="seasonYearSelect">
                                <Form.Label className="fw-bold">Select Year</Form.Label>
                                <Form.Select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                                    {categories &&
                                        categories.map(cat => (
                                            <option key={cat.seasonYear} value={cat.seasonYear}>
                                                {cat.seasonYear}
                                            </option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="eventSelect">
                                <Form.Label className="fw-bold">Select Event</Form.Label>
                                <Form.Select
                                    value={event ? event.id : ''}
                                    onChange={(e) => {
                                        setEvent(events.find(ev => ev.id === e.target.value));
                                    }}
                                    disabled={!events || events.length === 0}
                                >
                                    {events &&
                                        events.map(ev => (
                                            <option key={ev.id} value={ev.id}>
                                                {ev.name}
                                            </option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    {event ? (
                        <>
                            <Row className="mb-4">
                                <Col xs={12} md={6} className="mb-3 mb-md-0">
                                    <Card className="h-100 border-0">
                                        <Card.Body>
                                            <h5 className="fw-bold mb-2">{event.name}</h5>
                                            <div>
                                                <Badge bg="info" className="me-1">Status</Badge>
                                                {event.status}
                                            </div>
                                            <div className="mt-2">
                                                <Badge bg="secondary" className="me-1">Year</Badge>
                                                {event.season?.year}
                                            </div>
                                            {event.hashtag && (
                                                <div className="mt-2">
                                                    <Badge bg="warning" text="dark" className="me-1">Hashtag</Badge>
                                                    {event.hashtag}
                                                </div>
                                            )}
                                            {event.circuit && (
                                                <div className="mt-2">
                                                    <Badge bg="primary" className="me-1">Circuit</Badge>
                                                    {event.circuit.name}
                                                </div>
                                            )}
                                            {event.circuit?.country && (
                                                <div className="mt-2">
                                                    <Badge bg="success" className="me-1">Country</Badge>
                                                    {event.circuit.country}
                                                </div>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Col>


                                {event.circuit && event.circuit.circuit_descriptions && (
                                    // <Row>
                                    <Col xs={12} md={6}>
                                        <Card className="border-0">
                                            <Card.Body>
                                                <div className="fw-bold mb-2">Circuit Description</div>
                                                {event.circuit.circuit_descriptions
                                                    .filter(desc => desc.language === language)
                                                    .map(desc => (
                                                        <div key={desc.id} dangerouslySetInnerHTML={{ __html: desc.description }} />
                                                    ))}
                                                {/* Fallback: show first description if "en" not available */}
                                                {event.circuit.circuit_descriptions.filter(desc => desc.language === language).length === 0 &&
                                                    event.circuit.circuit_descriptions.length > 0 && (
                                                        <div key={event.circuit.circuit_descriptions[0].id} dangerouslySetInnerHTML={{ __html: event.circuit.circuit_descriptions[0].description }} />
                                                    )}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    // </Row>
                                )}
                                <Col xs={12} md={6}>
                                    {event.circuit?.track?.assets?.info?.path ? (
                                        <Card className="h-100 border-0">
                                            <Card.Body>
                                                <div className="fw-bold mb-2">Circuit Track SVG:</div>
                                                <img
                                                    src={event.circuit.track.assets.info.path}
                                                    alt="Circuit SVG"
                                                    style={{ width: '100%', height: 'auto', borderRadius: '0.5rem', background: '#f8f9fa', border: '1px solid #eee' }}
                                                />
                                            </Card.Body>
                                        </Card>
                                    ) : (
                                        <Card className="h-100 border-0">
                                            <Card.Body>
                                                <div>No circuit track information available.</div>
                                            </Card.Body>
                                        </Card>
                                    )}
                                </Col>
                                <Col xs={12} md={6}>

                                    {/* Track Details */}
                                    <div className="mt-3">
                                        <h6 className="fw-bold mb-2">Track Details</h6>
                                        <Table bordered size="sm" className="mb-0">
                                            <tbody>
                                            <tr>
                                                <td><strong>Length</strong></td>
                                                <td>{formatLength(event.circuit.track.lenght_units)}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Width</strong></td>
                                                <td>{formatLength(event.circuit.track.width_units)}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Longest Straight</strong></td>
                                                <td>{formatLength(event.circuit.track.longest_straight_units)}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Left Corners</strong></td>
                                                <td>{event.circuit.track.left_corners}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Right Corners</strong></td>
                                                <td>{event.circuit.track.right_corners}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>First Grid Position</strong></td>
                                                <td>{event.circuit.track.first_grid}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Constructed</strong></td>
                                                <td>{event.circuit.constructed}</td>
                                            </tr>
                                            {event.circuit.modified &&
                                                <tr>
                                                    <td><strong>Modified</strong></td>
                                                    <td>{event.circuit.modified}</td>
                                                </tr>
                                            }
                                            <tr>
                                                <td><strong>Designer</strong></td>
                                                <td>{event.circuit.designer}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Address</strong></td>
                                                <td>{event.circuit.address}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Region</strong></td>
                                                <td>{event.circuit.region}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Capacity</strong></td>
                                                <td>{event.circuit.capacity ? event.circuit.capacity : 'N/A'}</td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <div className="text-muted py-4">No event selected or available for this year.</div>
                    )}
                </Container>
            </Card.Body>
        </Card>
    );
}