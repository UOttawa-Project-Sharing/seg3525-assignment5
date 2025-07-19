import React, {useEffect, useState} from 'react';
import {getTrackInfoByEventId} from "../../../data/jsonAPI.js";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {useSelector} from "react-redux";

const CircuitDescriptionWidget = ({ eventId }) => {
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

    return (
        <>
            {event && event.circuit && event.circuit.circuit_descriptions && (
                // <Col xs={12} md={6}>
                //     <Card className="border-0">
                //         <Card.Body>
                <div>
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
                        {/*// </Card.Body>*/}
                    {/*// </Card>*/}
                {/*// </Col>*/}
                </div>
            )}
        </>
    );
};

export default CircuitDescriptionWidget;
