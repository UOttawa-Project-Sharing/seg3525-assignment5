import React, { useEffect, useState } from 'react';
import { getRiderByLegacyId } from '../../../data/jsonAPI';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';

const RiderProfileWidget = ({ riderLegacyId }) => {
    const [rider, setRider] = useState(null);

    useEffect(() => {
        async function fetchRider() {
            const data = await getRiderByLegacyId(riderLegacyId);
            setRider(data);
        }
        fetchRider();
    }, [riderLegacyId]);

    if (!rider) {
        return (
            <Card className="mb-4 shadow-sm border-0">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col xs="auto">
                            <Spinner animation="border" variant="primary" />
                        </Col>
                        <Col>
                            <Card.Title className="h4 mb-0">Rider Profile</Card.Title>
                            <Card.Text className="text-muted">Loading rider data...</Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }

    const profilePic =
        rider.current_career_step?.pictures?.profile?.main ||
        rider.picture ||
        rider.photo ||
        'https://via.placeholder.com/80';

    return (
        <Card className={"w-100 h-100 z-0"}>
            <Card.Body>
                <Row className="align-items-center mb-3">
                    <Col xs="auto">
                        <Image
                            src={profilePic}
                            roundedCircle
                            width={90}
                            height={90}
                            alt={rider.full_name}
                            className="border border-primary"
                            style={{ objectFit: 'cover', objectPosition: 'top' }}
                        />
                    </Col>
                    <Col>
                        <Card.Title className="h3 mb-1 fw-bold">
                            {rider.full_name || 'Rider Profile'}
                        </Card.Title>
                        <div className="text-muted mb-2">
                            {rider.current_career_step?.team?.name || 'No current team'}
                        </div>
                        <div>
                            {rider.retired ? (
                                <Badge bg="secondary" className="me-2">
                                    Retired {rider.retired_year ? `in ${rider.retired_year}` : ''}
                                </Badge>
                            ) : (
                                <Badge bg="success" className="me-2">
                                    Active
                                </Badge>
                            )}
                        </div>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md={6} className="mb-2 mb-md-0">
                        <Badge bg="primary" className="me-2">
                            Country: {rider.country?.name || '-'}
                        </Badge>
                    </Col>
                    <Col md={6}>
                        <Badge bg="info" className="me-2">
                            Birthday: {rider.birth_date || '-'}
                        </Badge>
                        <Badge bg="light" text="dark" className="me-2">
                            Age: {rider.years_old || '-'}
                        </Badge>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md={6} className="mb-2 mb-md-0">
                        <Badge bg="secondary" className="me-2">
                            Birth City: {rider.birth_city || '-'}
                        </Badge>
                    </Col>
                    <Col md={6}>
                        <Badge bg="warning" text="light" className="me-2">
                            Category: {rider.current_career_step?.category?.name || '-'}
                        </Badge>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md={6} className="mb-2 mb-md-0">
                        <Badge bg="dark" className="me-2">
                            Start Year: {rider.start_year || '-'}
                        </Badge>
                    </Col>
                    <Col md={6}>
                        {rider.retired && (
                            <Badge bg="danger" className="me-2">
                                Career Ended: {rider.retired_year || '-'}
                            </Badge>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default RiderProfileWidget;