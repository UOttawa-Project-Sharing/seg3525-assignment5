import React, { useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
} from 'recharts';
import { Container, Card, Spinner } from 'react-bootstrap';
import { getRiderNameByLegacyId, getRiderSeasonHistory } from '../../../data/jsonAPI.js';

const LINE_COLORS = {
    points: '#e53935',
    poles: '#43a047',
    podiums: '#8884d8',
    first_position: '#ec407a',
    starts: '#1e88e5',
    position: '#ffa726',
};

const CHART_LABELS = {
    points: 'Points',
    poles: 'Poles',
    podiums: 'Podiums',
    first_position: 'Wins',
    starts: 'Race Starts',
    position: 'Championship Position',
};

export function RiderSeasonHistoryWidget({ riderName }) {
    const [seasonHistory, setSeasonHistory] = useState([]);
    const [riderData, setRiderData] = useState("UNKNOWN");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            getRiderNameByLegacyId(riderName),
            getRiderSeasonHistory(riderName),
        ]).then(([name, history]) => {
            setRiderData(name || "UNKNOWN");
            setSeasonHistory(history || []);
            setLoading(false);
        });
    }, [riderName]);

    // Flip the seasonHistory array for vertical axis inversion
    const flippedSeasonHistory = [...seasonHistory].reverse();

    return (
        <Container fluid className="p-0">
            <Card className="mb-4 bg-transparent border-0">
                <Card.Body>
                    <Card.Title as="h3" className="mb-4" style={{ color: "#fff", fontWeight: 600 }}>
                        Historique de Saison&nbsp;
                        <span style={{ color: '#ffa726', fontWeight: 700 }}>{riderData}</span>
                    </Card.Title>
                    {loading ? (
                        <div className="d-flex align-items-center justify-content-center" style={{ height: 320 }}>
                            <Spinner animation="border" variant="warning" className="me-2" />
                            <span style={{ color: "#bbb", fontWeight: 500 }}>Chargement des données...</span>
                        </div>
                    ) : !riderData || !seasonHistory.length ? (
                        <div className="text-center py-4" style={{ color: "#bbb" }}>
                            Aucune donnée pour {riderName}
                        </div>
                    ) : (
                        <div style={{ width: "100%", height: 320 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={flippedSeasonHistory}
                                    margin={{ top: 16, right: 30, left: 0, bottom: 8 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444b53" />
                                    <XAxis
                                        dataKey="season"
                                        tick={{ fill: "#fff", fontSize: 13 }}
                                        axisLine={{ stroke: "#fff" }}
                                        tickLine={false}
                                        label={{
                                            value: "Saison",
                                            position: "insideBottom",
                                            fill: "#aaa",
                                            fontSize: 14,
                                            dy: 12,
                                        }}
                                    />
                                    <YAxis
                                        yAxisId="left"
                                        tick={{ fill: "#fff", fontSize: 13 }}
                                        axisLine={{ stroke: "#fff" }}
                                        label={{
                                            value: "Statistiques",
                                            angle: -90,
                                            position: "insideLeft",
                                            fill: "#aaa",
                                            fontSize: 14,
                                        }}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        tick={{ fill: "#fff", fontSize: 13 }}
                                        axisLine={{ stroke: "#fff" }}
                                        label={{
                                            value: "Points",
                                            angle: -90,
                                            position: "insideRight",
                                            fill: "#aaa",
                                            fontSize: 14,
                                        }}
                                    />
                                    <YAxis
                                        yAxisId="position"
                                        orientation="right"
                                        reversed
                                        tick={{ fill: "#ffa726", fontSize: 13 }}
                                        axisLine={{ stroke: "#ffa726" }}
                                        label={{
                                            value: "Position",
                                            angle: -90,
                                            position: "outsideRight",
                                            fill: "#ffa726",
                                            fontSize: 14,
                                        }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: '#23272b',
                                            border: '1px solid #444b53',
                                            color: '#fff',
                                            borderRadius: 8,
                                        }}
                                        labelStyle={{ color: '#ffa726', fontWeight: 700 }}
                                    />
                                    <Legend
                                        verticalAlign="top"
                                        iconType="circle"
                                        wrapperStyle={{
                                            paddingBottom: 12,
                                            color: "#fff",
                                            fontSize: 14
                                        }}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="points"
                                        name={CHART_LABELS.points}
                                        stroke={LINE_COLORS.points}
                                        strokeWidth={3}
                                        dot={{ r: 2 }}
                                        activeDot={{ r: 5 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="poles"
                                        name={CHART_LABELS.poles}
                                        stroke={LINE_COLORS.poles}
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="podiums"
                                        name={CHART_LABELS.podiums}
                                        stroke={LINE_COLORS.podiums}
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="first_position"
                                        name={CHART_LABELS.first_position}
                                        stroke={LINE_COLORS.first_position}
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="starts"
                                        name={CHART_LABELS.starts}
                                        stroke={LINE_COLORS.starts}
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Line
                                        yAxisId="position"
                                        type="monotone"
                                        dataKey="position"
                                        name={CHART_LABELS.position}
                                        stroke={LINE_COLORS.position}
                                        strokeWidth={3}
                                        dot={{ r: 2 }}
                                        activeDot={{ r: 5 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}