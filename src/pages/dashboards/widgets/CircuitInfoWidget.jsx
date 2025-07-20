import React, { useEffect, useState } from 'react';
import { getTrackInfoByEventId } from '../../../data/jsonAPI.js';
import {Card, Col, Table} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { useSelector } from 'react-redux';
import translations from '../../../data/lang';

const CircuitInfoWidget = ({ eventId }) => {
    const [event, setevent] = useState(null);
    const language = useSelector((state) => state.language.value);

    useEffect(() => {
        const fetchCircuitInfo = async () => {
            const info = await getTrackInfoByEventId(eventId);
            console.log("aa", info);
            setevent(info);
        };

        if (eventId) {
            fetchCircuitInfo();
        }
    }, [eventId]);

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
        <>
        {event === null ? (
            <div>{translations[language].loading}</div>
        ) : (
        <div className="overflow-y-auto overflow-x-hidden h-100 w-100 custom-scrollbar">
            <h3>{translations[language].widgets.circuitInfo.title}</h3>
            <p><strong>{translations[language].widgets.circuitInfo.name}:</strong> {event.circuit.name}</p>
            <Row>
            <Col xs={6} md={12}>
                {event.circuit?.track?.assets?.info?.path ? (
                    <Card className="border-0 bg-transparent">
                        <Card.Body>
                            <div className="fw-bold mb-2">{translations[language].widgets.circuitInfo.svg}:</div>
                            <img
                                src={event.circuit.track.assets.info.path}
                                alt="Circuit SVG"
                                style={{ width: '50%', height: '50%', borderRadius: '0.5rem'/*, background: '#f8f9fa', border: '1px solid #eee'*/ }}
                            />
                        </Card.Body>
                    </Card>
                ) : (
                    <Card className="h-100 border-0">
                        <Card.Body>
                            <div>{translations[language].widgets.circuitInfo.noTrackInfo}</div>
                        </Card.Body>
                    </Card>
                )}
            </Col>
            <Col xs={12} md={12}>

                {/* Track Details */}
                <div className="mt-3">
                    <h6 className="fw-bold mb-2">{translations[language].widgets.circuitInfo.trackDetails}</h6>
                    <Table bordered size="sm" className="mb-0">
                        <tbody>
                        {event.circuit.track.lenght_units && (
                        <tr>
                            <td><strong>{translations[language].widgets.circuitInfo.length}</strong></td>
                            <td>{formatLength(event.circuit.track.lenght_units)}</td>
                        </tr>
                        )}
                        {event.circuit.track.width_units && (
                        <tr>
                            <td><strong>{translations[language].widgets.circuitInfo.width}</strong></td>
                            <td>{formatLength(event.circuit.track.width_units)}</td>
                        </tr>
                        )}
                        {event.circuit.track.longest_straight_units && (
                        <tr>
                            <td><strong>{translations[language].widgets.circuitInfo.longuestStraight}</strong></td>
                            <td>{formatLength(event.circuit.track.longest_straight_units)}</td>
                        </tr>
                        )}
                        {event.circuit.track.left_corners && (
                        <tr>
                            <td><strong>{translations[language].widgets.circuitInfo.leftCorners}</strong></td>
                            <td>{event.circuit.track.left_corners}</td>
                        </tr>
                        )}
                        {event.circuit.track.right_corners && (
                        <tr>
                            <td><strong>{translations[language].widgets.circuitInfo.rightCorners}</strong></td>
                            <td>{event.circuit.track.right_corners}</td>
                        </tr>
                        )}
                        {event.circuit.track.first_grid && (
                        <tr>
                            <td><strong>{translations[language].widgets.circuitInfo.firstGridPosition}</strong></td>
                            <td>{event.circuit.track.first_grid}</td>
                        </tr>
                        )}
                        {event.circuit.constructed && (
                        <tr>
                            <td><strong>{translations[language].widgets.circuitInfo.constructed}</strong></td>
                            <td>{event.circuit.constructed}</td>
                        </tr>
                        )}
                        {event.circuit.modified &&
                            <tr>
                                <td><strong>{translations[language].widgets.circuitInfo.modified}</strong></td>
                                <td>{event.circuit.modified}</td>
                            </tr>
                        }
                        {event.circuit.designer && (
                        <tr>
                            <td><strong>{translations[language].widgets.circuitInfo.designer}</strong></td>
                            <td>{event.circuit.designer}</td>
                        </tr>
                        )}
                        {event.circuit.address && (
                        <tr>
                            <td><strong>{translations[language].widgets.circuitInfo.address}</strong></td>
                            <td>{event.circuit.address}</td>
                        </tr>
                        )}
                        { event.circuit.region && (
                        <tr>
                            <td><strong>{translations[language].widgets.circuitInfo.region}</strong></td>
                            <td>{event.circuit.region}</td>
                        </tr>
                        )}
                        {event.circuit.capacity && (
                        <tr>
                            <td><strong>{translations[language].widgets.circuitInfo.capacity}</strong></td>
                            <td>{event.circuit.capacity ? event.circuit.capacity : 'N/A'}</td>
                        </tr>
                        )}
                        </tbody>
                    </Table>
                </div>
            </Col>
            </Row>
        </div>
    )}</>
    );
};

export default CircuitInfoWidget;
