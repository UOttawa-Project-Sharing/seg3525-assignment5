import React, {useEffect, useState} from 'react';
import {
    getCategories,
    getCategoryIdByLegacyId,
    getGridPositionByEventCat,
    getStandingsByCategory,
    getTeamColor
} from '../../../data/jsonAPI';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

const GridStandingsWidget = (eventId, categoryId) => {
    const [standings, setStandings] = useState(null);
    const [teamsColors, setTeamsColors] = useState(null);
    const [year, setYear] = useState(2025);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const cats = await getCategories();
            setCategories(cats);
            const catId = await getCategoryIdByLegacyId(categoryId, eventId.eventId);
            setCategory( cats.find(c => c.seasonUuid === catId) || cats[0]);
            const data = await getGridPositionByEventCat(eventId, catId);
            setStandings(
                data
            );
        };
        fetchCategories();
    }, [categoryId, eventId]);

    useEffect(() => {
        const fetchStandings = async () => {
            const color = await getTeamColor(
                category !== null ? category.bc_id : "737ab122-76e1-4081-bedb-334caaa18c70",
                year
            );
            setTeamsColors(color);
        };
        fetchStandings();
    }, [category, year, categories]);

    const getBarColor = team => {
        if (!teamsColors) return '#fff';
        const teamColor = teamsColors.find(t => t.name === team);
        return teamColor ? teamColor.color : '#fff';
    };

    const getTeamTextColor = team => {
        if (!teamsColors) return '#000';
        const teamColor = teamsColors.find(t => t.name === team);
        return teamColor ? teamColor.textColor : '#000';
    };

    const maxPoints =
        standings !== null && standings.length > 0
            ? Math.max(...standings.map(s => s.points))
            : 0;

    return (
        <div className="h-100">
            <h2>Grid Standings</h2>
            <div
                className="table-responsive overflow-auto flex-grow-1 custom-scrollbar"
                style={{
                    height: '75%',
                    background: '#23272b',
                }}
            >
                <Table
                    striped
                    bordered
                    hover
                    responsive
                    size="sm"
                    className="align-middle mb-0 h-100"
                    style={{
                        background: '#23272b',
                        color: '#fff',
                        minWidth: '700px',
                        width: '100%',
                        height: '100%',
                        marginBottom: 0,
                        tableLayout: 'fixed',
                    }}
                >
                    <thead>
                    <tr
                        style={{
                            background: '#111',
                            color: '#fff',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                        }}
                    >
                        <th className="text-center" style={{width: 50}}>
                            Pos
                        </th>
                        <th className="text-center" style={{width: 180}}>
                            Rider
                        </th>
                        <th className="text-center" style={{width: 180}}>
                            Team
                        </th>
                        <th className="text-center" style={{width: 160}}>
                            Qualifying Time
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {standings === null ? (
                        <tr>
                            <td colSpan={6} className="text-center py-4">
                                <Spinner
                                    animation="border"
                                    variant="light"
                                    size="sm"
                                    className="me-2"
                                />
                                Loading...
                            </td>
                        </tr>
                    ) : (
                        standings.map(row => {
                            return (
                                <tr
                                    key={row.position}
                                    className={row.position <= 3 ? 'fw-bold' : ''}
                                    style={{
                                        background:
                                            row.position === 1
                                                ? '#ffd70033'
                                                : row.position === 2
                                                    ? '#c0c0c033'
                                                    : row.position === 3
                                                        ? '#cd7f3233'
                                                        : 'inherit',
                                    }}
                                >
                                    <td className="text-center">{row.position}</td>
                                    <td className="text-center">
                                        <span>{row.rider}</span>
                                    </td>
                                    <td className="text-center">
                      <span className="d-flex align-items-center justify-content-center">
                        <span
                            style={{
                                display: 'inline-block',
                                width: 18,
                                height: 18,
                                borderRadius: '50%',
                                background: getBarColor(row.team),
                                marginRight: '0.5em',
                                border: '2px solid #fff',
                            }}
                            title={row.team}
                        ></span>
                        <span style={{fontWeight: 500}}>{row.team}</span>
                      </span>
                                    </td>
                                    <td className="text-center" style={{minWidth: 120}}>
                                        <div
                                            className="position-relative"
                                            style={{
                                                height: 26,
                                                background: '#111',
                                                borderRadius: 8,
                                                overflow: 'hidden',
                                                minWidth: 90,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: barWidthPx,
                                                    background: getBarColor(row.team),
                                                    height: '100%',
                                                    borderRadius: 8,
                                                    transition: 'width 0.5s',
                                                    minWidth: minBarWidthPx,
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                }}
                                            />
                                            <span
                                                className="position-absolute start-0 px-2 fw-bold"
                                                style={{
                                                    color: getTeamTextColor(row.team),
                                                    fontSize: '1em',
                                                    lineHeight: '26px',
                                                    left: 0,
                                                }}
                                            >
                          {row.points}
                        </span>
                                        </div>
                                    </td>
                                    <td className="text-center">{row.podiums}</td>
                                    <td className="text-center">{row.wins}</td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default GridStandingsWidget;