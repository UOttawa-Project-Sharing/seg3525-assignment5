import React, { useEffect, useState } from 'react';
import { getRiderMilestones } from "../../../data/jsonAPI.js";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

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
                setCategories(['Any', ...uniqueCats]);
                setSelectedCategory('Any');
            }
        });
    }, [riderLegacyId]);

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
        if (selectedCategory === 'Any') {
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
                    <Card.Title className="h4 fw-bold mb-0">Rider Milestones</Card.Title>
                    {categories.length > 0 && (
                        <Form.Select
                            className="w-auto"
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            aria-label="Select milestone category"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </Form.Select>
                    )}
                </div>
                {data === null ? (
                    <div className="d-flex align-items-center gap-2">
                        <Spinner animation="border" variant="primary" size="sm" />
                        <span>Loading milestones...</span>
                    </div>
                ) : (
                    <Table bordered hover size="sm" className="mb-0">
                        <thead className="table-light">
                        <tr>
                            <th>Milestone</th>
                            <th>Year</th>
                            <th>Category</th>
                            <th>Event</th>
                        </tr>
                        </thead>
                        <tbody>
                        {milestonesToShow.length > 0 ? milestonesToShow : (
                            <tr>
                                <td colSpan="4" className="text-center text-muted">No milestones found for this category.</td>
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