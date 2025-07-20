import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import translations from '../data/lang';
import CustomDashboard from "./dashboards/custom.jsx";
import PilotsDashboard from "./dashboards/pilots.jsx";

const Dashboard = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const dashboardType = queryParams.get('type');
    const language = useSelector((state) => state.language.value);

    // Render content based on dashboardType
    const renderDashboardContent = () => {
        switch (dashboardType) {
            // case 'custom':
            //     return <CustomDashboard />;
            // case 'pilots':
            //     return <PilotsDashboard />;
            // case 'race':
            //     return <RaceDashboard />;
            // case 'seasons':
            //     return <SeasonsDashboard />;
            default:
                return <CustomDashboard />;
        }
    };

    return (
        <>
            <Container fluid className={"m-0 p-0 overflow-hidden"}>
                <Row>
                    <Col md={12}>
                        {/*<h1>Dashboard/!* for {dashboardType}*!/</h1>*/}
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