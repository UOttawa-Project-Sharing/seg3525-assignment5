import React, {useEffect, useState} from 'react';
import { Card, Badge, Row, Col, Container } from 'react-bootstrap';
import {getCareerTimeline} from "../../../data/jsonAPI.js";

// Helper for team badge color
function TeamBadge({ team }) {
    if (!team) return null;
    return (
        <Badge
            style={{
                background: team.color || "#888",
                color: team.text_color || "#fff",
                fontSize: "0.9em",
                marginBottom: 2,
            }}
            className="mt-1"
        >
            {team.name}
        </Badge>
    );
}

// Main widget: vertical stepper/list, scrollable
const CareerTimelineWidget = ({ riderLegacyId }) => {
    const [data, setData] = useState(null);
    const [timeline, setTimeline] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const careerData = await getCareerTimeline(riderLegacyId);
            setData(careerData);
            const sortedTimeline = careerData.career.sort((a, b) => b.season - a.season);
            setTimeline(sortedTimeline);
        };
        fetchData();
    }, [riderLegacyId]);
    return (
        <Card className="mb-4 h-100 bg-transparent border-0 pb-5">
            {data !== null ? (
            <Card.Body className="h-100">
                <Card.Title>Career Timeline</Card.Title>
                <div style={{ height: "100%", overflowY: 'scroll', paddingRight: 8 }} className="custom-scrollbar">
                    <Container fluid>
                        <Row className="gx-0 gy-4 flex-column">
                            {timeline.map((item, idx) => (
                                <Col key={idx} xs={12}>
                                    <div className="d-flex align-items-start">
                                        <div style={{ minWidth: 70, textAlign: 'center', marginRight: 16 }}>
                                            <div style={{
                                                fontSize: '2rem',
                                                fontWeight: 700,
                                                color: '#ffa726',
                                                lineHeight: 1,
                                            }}>
                                                {item.season}
                                            </div>
                                            {item.pictures?.profile?.main && (
                                                <img
                                                    src={item.pictures.profile.main}
                                                    alt={item.team?.name || ""}
                                                    style={{
                                                        width: 85,
                                                        // height: 80,
                                                        objectFit: "cover",
                                                        // borderRadius: "50%",
                                                        // border: "2px solid #eee",
                                                        // background: "#f8f9fa",
                                                        marginTop: 8,
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <TeamBadge team={item.team} />
                                            <div className="mb-2" style={{ fontWeight: 500 }}>
                                                <span>{item.sponsored_team}</span>
                                                {item.category?.name && (
                                                    <span className="ms-2 badge bg-secondary">{item.category.name}</span>
                                                )}
                                            </div>
                                            <div className="small mb-1">
                                                <strong>Number:</strong> {item.number}
                                            </div>
                                            <div className="small mb-1">
                                                <strong>Short Nickname:</strong> {item.short_nickname || <em>N/A</em>}
                                            </div>
                                            <div className="small mb-1">
                                                <strong>Type:</strong> {item.type || <em>N/A</em>}
                                            </div>
                                            <div className="small mb-1">
                                                <strong>Constructor:</strong> {item.team?.constructor?.name || <em>N/A</em>}
                                            </div>
                                            <div className="mt-2">
                                                {item.current && (
                                                    <Badge pill bg="success" className="me-1 mb-1">Current</Badge>
                                                )}
                                                {item.in_grid && (
                                                    <Badge pill bg="primary" className="me-1 mb-1">In Grid</Badge>
                                                )}
                                                {item.type === "Wildcard" && (
                                                    <Badge pill bg="warning" text="dark" className="me-1 mb-1">Wildcard</Badge>
                                                )}
                                            </div>
                                            {item.pictures?.bike?.main && (
                                                <div className="mt-2">
                                                    <img
                                                        src={item.pictures.bike.main}
                                                        alt="Bike"
                                                        style={{
                                                            width: "100%",
                                                            maxWidth: 120,
                                                            // borderRadius: 6,
                                                            // background: "#f8f9fa"
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {idx !== timeline.length - 1 && (
                                        <hr className="my-3" />
                                    )}
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            </Card.Body>
                ) : (
                <Card.Body>
                    <Card.Title>Career Timeline</Card.Title>
                    <div>No career data available.</div>
                </Card.Body>
                )}
        </Card>
    );
};

export default CareerTimelineWidget;

