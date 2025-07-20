import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getRiderNameByLegacyId, getRidersIds, getRiderStats } from "../../../data/jsonAPI.js";
import { Form, FormGroup, FormLabel, FormSelect, Container, Row, Col } from 'react-bootstrap';

const statKeys = [
    { key: 'wins', label: 'Wins' },
    { key: 'podiums', label: 'Podiums' },
    { key: 'totalRaces', label: 'Total Races' },
];

const DriverComparisonWidget = ({ riderLegacyId }) => {
    const [stats, setStats] = useState({
        name: '',
        totalRaces: 0,
        podiums: 0,
        wins: 0,
    });
    const [stats2, setStats2] = useState({
        name: '',
        totalRaces: 0,
        podiums: 0,
        wins: 0,
    });
    const [rider2LegacyId, setRider2LegacyId] = useState(null);
    const [riders, setRiders] = useState(null);

    useEffect(() => {
        const fetchRiders = async () => {
            const ridersList = await getRidersIds();
            setRiders(ridersList);
            setRider2LegacyId(ridersList[0]?.legacy_id ?? null); // Set default to first rider
        };
        fetchRiders();
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            if (!riderLegacyId) return;
            const stats1 = await getRiderStats(riderLegacyId);
            const riderName = await getRiderNameByLegacyId(riderLegacyId) || 'Unknown Rider';
            const data = {
                name: riderName,
                wins: stats1.all_wins ?? 0,
                podiums: stats1.all_podiums ?? 0,
                totalRaces: stats1.all_races ?? 0,
            }
            console.log(data, stats1);
            setStats(data);
        };
        fetchStats();
    }, [riderLegacyId]);

    useEffect(() => {
        const fetchStats2 = async () => {
            if (!rider2LegacyId) return;
            const stats2Data = await getRiderStats(rider2LegacyId);
            const riderName2 = await getRiderNameByLegacyId(rider2LegacyId) || 'Unknown Rider';
            const data = {
                name: riderName2,
                wins: stats2Data.all_wins ?? 0,
                podiums: stats2Data.all_podiums ?? 0,
                totalRaces: stats2Data.all_races ?? 0,
            }
            console.log(data);
            setStats2(data);
        };
        fetchStats2();
    }, [rider2LegacyId]);

    // Prepare radar chart data
    const chartData = statKeys.map(({ key, label }) => ({
        subject: label,
        [stats.name]: stats[key],
        [stats2.name]: stats2[key],
    }));

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Driver Comparison</h3>
                </Col>
            </Row>
            {riders && riders.length > 0 ? (
                <Row>
                    <Col>
                        <Form>
                            <FormGroup>
                                <FormLabel htmlFor="rider2Select">Select Rider 2:</FormLabel>
                                <FormSelect
                                    id="rider2Select"
                                    value={rider2LegacyId}
                                    onChange={(e) => setRider2LegacyId(e.target.value)}
                                    style={{ marginBottom: 16 }}
                                >
                                    <option value="">-- Select Rider --</option>
                                    {riders.map((rider) => (
                                        <option key={rider.legacy_id} value={rider.legacy_id}>
                                            {rider.full_name}
                                        </option>
                                    ))}
                                </FormSelect>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col>
                        <p>Loading...</p>
                    </Col>
                </Row>
            )}
            {riders && riders.length > 0 && (
                <Row>
                    <Col>
                        <div style={{ width: "100%", height: 350, minHeight: 250 }}>
                            <ResponsiveContainer>
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis angle={30} domain={[0, Math.max(stats.wins, stats2.wins, stats.podiums, stats2.podiums, stats.totalRaces, stats2.totalRaces, 10)]} />
                                    <Radar
                                        name={stats.name}
                                        dataKey={stats.name}
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.6}
                                    />
                                    <Radar
                                        name={stats2.name}
                                        dataKey={stats2.name}
                                        stroke="#82ca9d"
                                        fill="#82ca9d"
                                        fillOpacity={0.6}
                                    />
                                    <Legend />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default DriverComparisonWidget;