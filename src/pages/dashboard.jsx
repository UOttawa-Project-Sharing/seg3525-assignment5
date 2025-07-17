import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import CustomDashboard from "./dashboards/custom.jsx";
import PilotsDashboard from "./dashboards/pilots.jsx";

const Dashboard = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const dashboardType = queryParams.get('type');

    // Render content based on dashboardType
    const renderDashboardContent = () => {
        switch (dashboardType) {
            case 'custom':
                return <CustomDashboard />;
            case 'pilots':
                return <PilotsDashboard />;
            case 'race':
                return <RaceDashboard />;
            case 'seasons':
                return <SeasonsDashboard />;
            default:
                return <p>Please select a valid dashboard type.</p>;
        }
    };

    return (
        <>
            <Container fluid className={"m-0 p-0 overflow-hidden"}>
                <Row>
                    <Col md={12}>
                        <h1>Dashboard for {dashboardType}</h1>
                        <div className="w-100">
                            {renderDashboardContent()}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;