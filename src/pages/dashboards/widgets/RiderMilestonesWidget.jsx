import React, { useEffect, useState } from 'react';
import { getRiderMilestones } from "../../../data/jsonAPI.js";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import translations from "../../../data/lang.jsx";
import {useSelector} from "react-redux";

const milestoneLabels = {
    first_race: { label: "First Race", color: "primary" },
    first_podium: { label: "First Podium", color: "info" },
    first_win: { label: "First Win", color: "success" },
    last_win: { label: "Last Win", color: "warning" }
};

const RiderMilestonesWidget = ({ riderLegacyId }) => {
    const [data, setData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const language = useSelector((state) => state.language.value);

    useEffect(() => {
        getRiderMilestones(riderLegacyId).then((milestones) => {
            setData(milestones);
            // Collect unique categories from all milestone arrays
            if (milestones) {
                const cats = [
                    ...(milestones.first_race || []).map(m => m.category),
                    ...(milestones.first_podium || []).map(m => m.category),
                    ...(milestones.first_win || []).map(m => m.category),
                    ...(milestones.last_win || []).map(m => m.category)
                ];
                const uniqueCats = [...new Set(cats.filter(Boolean))];
                setCategories([translations[language].widgets.milestones.emptyDropdown, ...uniqueCats]);
                setSelectedCategory(translations[language].widgets.milestones.emptyDropdown);
            }
        });
    }, [riderLegacyId, language]);

    const milestoneLabels = {
        first_race: { label: translations[language].widgets.milestones.firstRace, color: "primary" },
        first_podium: { label: translations[language].widgets.milestones.firstPodium, color: "info" },
        first_win: { label: translations[language].widgets.milestones.firstWin, color: "success" },
        last_win: { label: translations[language].widgets.milestones.lastWin, color: "warning" }
    };

    const renderMilestoneRow = (milestoneType, milestone) => (
        <tr key={milestoneType + milestone.year + milestone.category + milestone.event}>
            <td>
                <Badge bg={milestoneLabels[milestoneType].color} className="me-2">
                    {milestoneLabels[milestoneType].label}
                </Badge>
            </td>
            <td>{milestone.year}</td>
            <td>{milestone.category}</td>
            <td>{milestone.event}</td>
        </tr>
    );

    let milestonesToShow = [];
    if (data) {
        if (selectedCategory === translations[language].widgets.milestones.emptyDropdown) {
            Object.keys(milestoneLabels).forEach(type => {
                if (data[type] && data[type].length > 0) {
                    // Show the earliest milestone for each type
                    const first = data[type].reduce((a, b) => a.year < b.year ? a : b);
                    milestonesToShow.push(renderMilestoneRow(type, first));
                }
            });
        } else {
            Object.keys(milestoneLabels).forEach(type => {
                if (data[type]) {
                    data[type]
                        .filter(m => m.category === selectedCategory)
                        .forEach(m => milestonesToShow.push(renderMilestoneRow(type, m)));
                }
            });
        }
    }

    return (
        <Card className="w-100 h-100 bg-transparent border-0 m-0 p-0">
            <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <Card.Title className="h4 fw-bold mb-0">{translations[language].widgets.milestones.title}</Card.Title>
                    {categories.length > 0 && (
                        <div style={{position: 'relative', minWidth: 120}}>
                        <Form.Select
                            className="w-auto"
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            aria-label={translations[language].widgets.milestones.emptyDropdown}
                            style={{
                                background: '#23272b',
                                color: '#fff',
                                border: '1px solid #444b53',
                                borderRadius: '8px',
                                padding: '6px 32px 6px 12px',
                                fontSize: '1rem',
                                outline: 'none',
                                appearance: 'none',
                                width: '100%',
                                minWidth: '100px',
                                cursor: 'pointer',
                            }}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </Form.Select>
                        <span
                        style={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '1.2em',
                        color: '#bbb',
                    }}
                >
                    ▼
                </span>
            </div>
                    )}
                </div>
                {data === null ? (
                    <div className="d-flex align-items-center gap-2">
                        <Spinner animation="border" variant="primary" size="sm" />
                        <span>{translations[language].loading}</span>
                    </div>
                ) : (
                    <Table bordered hover size="sm" className="mb-0">
                        <thead className="table-light">
                        <tr>
                            <th>{translations[language].widgets.milestones.milestone}</th>
                            <th>{translations[language].widgets.milestones.year}</th>
                            <th>{translations[language].widgets.milestones.category}</th>
                            <th>{translations[language].widgets.milestones.event}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {milestonesToShow.length > 0 ? milestonesToShow : (
                            <tr>
                                <td colSpan="4" className="text-center text-muted">{translations[language].widgets.milestones.noMilestones}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
};

export default RiderMilestonesWidget;

