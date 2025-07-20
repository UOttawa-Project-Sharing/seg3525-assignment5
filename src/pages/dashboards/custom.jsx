import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { increment, setDashLayout } from '../../store/store.js';
import EmptyWidget from "./widgets/emptyWidget.jsx";
import TopSpeedWidget from "./widgets/TopSpeedWidget.jsx";
import RiderStatsWidget from "./widgets/RiderStatsWidget.jsx";
import SpeedBySeasonWidget from "./widgets/SpeedBySeasonWidget.jsx";
import SeasonEvolutionWidget from "./widgets/SeasonEvolutionWidget.jsx";
import RiderMilestonesWidget from "./widgets/RiderMilestonesWidget.jsx";
import RiderProfileWidget from "./widgets/RiderProfileWidget.jsx";
import CareerTimelineWidget from "./widgets/CareerTimelineWidget.jsx";
import TrophyDisplayWidget from "./widgets/TrophyDisplayWidget.jsx";
import ChampionshipStandingsWidget from "./widgets/ChampionshipStandingsWidget.jsx";
import { useSearchParams } from 'react-router';
// import mockdata from '../../data/mockdata.json';
import NextEventWidget from "./widgets/NextEventWidget.jsx";
import { TeamAnalysisWidget, TeamAchievementsWidget, TeamComparisonWidget, TeamPerformanceCardsWidget } from "./widgets/TeamWidgets.jsx";
import { SessionClassificationWidget } from "./widgets/SessionClassificationWidget.jsx";
import { SeasonStandingsLeaderboardWidget } from "./widgets/SeasonStandingsLeaderboardWidget.jsx";
import { BMWAwardWidget } from "./widgets/BMWAwardWidget.jsx";
import { RiderSeasonHistoryWidget } from "./widgets/RiderSeasonHistoryWidget.jsx";
import { CircuitComparisonWidget } from "./widgets/CircuitComparisonWidget.jsx";
import { SessionTypeWeatherWidget } from "./widgets/SessionTypeWeatherWidget.jsx";
import { EventOverviewWidget } from "./widgets/EventOverviewWidget.jsx";
import CircuitInfoWidget from "./widgets/CircuitInfoWidget.jsx";
import { getCategories, getFinishedEventByYear, getRidersIds } from "../../data/jsonAPI.js";
import CircuitDescriptionWidget from "./widgets/CircuitDescriptionWidget.jsx";
import GridStandingsWidget from "./widgets/GridStandings.jsx";
import DriverComparisonWidget from './widgets/DriverComparisonWidget';
import { Container, Row, Col, Form, Button, ButtonGroup, Card } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import translations from '../../data/lang';

const CustomDashboard = () => {
    const counter = useSelector((state) => state.counter.value);
    const layout = useSelector((state) => state.dashboard.layout);
    const dispatch = useDispatch();
    const [gridWidth, setGridWidth] = useState(window.innerWidth);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedRider, setSelectedRider] = useState(searchParams.get('rider') || '');
    const [selectedYear, setSelectedYear] = useState(searchParams.get('year') || '2025');
    const [selectedTeam, setSelectedTeam] = useState(searchParams.get('team') || '');
    const [selectedEvent, setSelectedEvent] = useState(searchParams.get('event') || '');
    const [selectedCircuit, setSelectedCircuit] = useState(searchParams.get('circuit') || '');
    const [selectedSession, setSelectedSession] = useState(searchParams.get('session') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [riders, setRiders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [events, setEvents] = useState([]);
    const language = useSelector((state) => state.language.value);

    const setNewLayout = (newLayout) => {
        dispatch(setDashLayout(newLayout));
    }

    useEffect(() => {
        getRidersIds().then(setRiders);
        getCategories().then(setCategories).finally(e => {
            console.log(e);
        });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setGridWidth(window.innerWidth);
            const updatedLayout = layout.map((item) => {
                const newX = Math.min(item.x, Math.floor(gridWidth / 100) - item.w);
                return { ...item, x: newX };
            });
            setNewLayout(updatedLayout);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [layout, gridWidth]);

    useEffect(() => {
        if (selectedRider) {
            searchParams.set('rider', selectedRider);
            setSearchParams(searchParams, { replace: true });
        } else {
            searchParams.delete('rider');
            setSearchParams(searchParams, { replace: true });
        }
    }, [selectedRider]);

    useEffect(() => {
        if (selectedYear) {
            searchParams.set('year', selectedYear);
            setSearchParams(searchParams, { replace: true });
        } else {
            searchParams.delete('year');
            setSearchParams(searchParams, { replace: true });
        }
        const fetch = async () => {
            const evs = await getFinishedEventByYear(Number(selectedYear));
            setEvents(evs);
            if (evs && evs.length > 0) {
                setSelectedEvent(evs[0].id);
            } else {
                setSelectedEvent(null);
            }
        };
        fetch();
        getFinishedEventByYear(selectedYear).then((evs) => {
            setEvents(evs);
            if (evs && evs.length > 0) {
                if (evs.find(e => e.id === selectedEvent) === null) {
                    setSelectedEvent(evs[0].id);
                }
            } else {
                setSelectedEvent(null);
            }
        });
        const cat = categories.find(c => c.seasonYear === Number(selectedYear));
        if (cat && cat.categories.find(c => c.legacy_id === selectedCategory) === null) {
            setSelectedCategory(cat?.categories[0]?.legacy_id || '');
        }
    }, [selectedYear]);

    useEffect(() => {
        if (selectedEvent) {
            searchParams.set('event', selectedEvent);
            setSearchParams(searchParams, { replace: true });
        } else {
            searchParams.delete('event');
            setSearchParams(searchParams, { replace: true });
        }
    }, [selectedEvent]);

    useEffect(() => {
        if (selectedCategory) {
            searchParams.set('category', selectedCategory);
            setSearchParams(searchParams, { replace: true });
        } else {
            searchParams.delete('category');
            setSearchParams(searchParams, { replace: true });
        }
    }, [selectedCategory]);

    const addWidget = () => {
        const newWidget = {
            i: `${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity, // places it at the bottom
            w: 2,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };

    const addSquareWidget = () => {
        const newWidget = {
            i: `square-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 2,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };

    const addCustomWidget = () => {
        const newWidget = {
            i: `custom-${layout.length + 1}`,
            x: (layout.length * 3) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 3,
            h: 1.5, // restricted ratio
        };
        setNewLayout([...layout, newWidget]);
    };

    const removeWidget = (id) => {
        setNewLayout(layout.filter((item) => item.i !== id));
    };

    const clearWidgets = () => {
        setNewLayout([]);
    };

    const enforceSquareRatio = (newLayout) => {
        const updatedLayout = newLayout.map((item) => {
            if (item.i.startsWith('square')) {
                let dh = Math.abs((layout.find((el) => el.i === item.i)?.h || 0) - item.h);
                let dw = Math.abs((layout.find((el) => el.i === item.i)?.w || 0) - item.w);
                if (dh < dw) {
                    item.h = item.w; // Make height equal to width
                } else {
                    item.w = item.h; // Make width equal to height
                }
            }
            return item;
        });
        setNewLayout(updatedLayout);
    };

    const addTopSpeedWidget = () => {
        const newWidget = {
            i: `top-speed-${layout.length + 1}`,
            x: (layout.length * 4) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 4,
            h: 4,
            minW: 4,
            minH: 4,
        };
        setNewLayout([...layout, newWidget]);
    }

    // Widget adders for each analytic
    const addRiderStatsWidget = () => {
        const newWidget = {
            i: `rider-stats-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 6,
            h: 5,
            minW: 4,
            minH: 4,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addSpeedBySeasonWidget = () => {
        const newWidget = {
            i: `speed-by-season-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 3,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addSeasonEvolutionWidget = () => {
        const newWidget = {
            i: `season-evolution-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 3,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addRiderMilestonesWidget = () => {
        const newWidget = {
            i: `rider-milestones-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 14,
            h: 5,
            minW: 8,
            minH: 5,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addRiderProfileWidget = () => {
        const newWidget = {
            i: `rider-profile-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 7,
            h: 5,
            minW: 7,
            minH: 5,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addCareerTimelineWidget = () => {
        const newWidget = {
            i: `career-timeline-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 9,
            h: 7,
            minW: 9,
            minH: 7,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addTrophyDisplayWidget = () => {
        const newWidget = {
            i: `trophy-display-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 3,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addChampionshipStandingsWidget = () => {
        const newWidget = {
            i: `championship-standings-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 18,
            h: 10,
            minW: 17,
            minH: 5,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addNextEventWidget = () => {
        const newWidget = {
            i: `next-event-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 11,
            h: 5,
            minW: 9,
            minH: 4,
            maxH: 6,
        };
        setNewLayout([...layout, newWidget]);
    };

    // Adders for team widgets
    const addTeamAnalysisWidget = () => {
        const newWidget = {
            i: `team-analysis-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 4,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addTeamAchievementsWidget = () => {
        const newWidget = {
            i: `team-achievements-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 4,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addTeamComparisonWidget = () => {
        const newWidget = {
            i: `team-comparison-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 3,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addTeamPerformanceCardsWidget = () => {
        const newWidget = {
            i: `team-performance-cards-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 4,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };

    // Adders for standings/results widgets
    const addSessionClassificationWidget = () => {
        const newWidget = {
            i: `session-classification-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 4,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    // const addSeasonStandingsLeaderboardWidget = () => {
    //     const newWidget = {
    //         i: `season-standings-leaderboard-${layout.length + 1}`,
    //         x: (layout.length * 5) % Math.floor(gridWidth / 50),
    //         y: Infinity,
    //         w: 4,
    //         h: 3,
    //     };
    //     setNewLayout([...layout, newWidget]);
    // };
    const addBMWAwardWidget = () => {
        const newWidget = {
            i: `bmw-award-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 3,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addRiderSeasonHistoryWidget = (riderName) => {
        const newWidget = {
            i: `rider-season-history-${riderName}-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 18,
            h: 8,
            minW: 10,
            minH: 8,
        };
        setNewLayout([...layout, newWidget]);
    };

    // Adders for event/circuit/session performance widgets
    const addCircuitComparisonWidget = () => {
        const newWidget = {
            i: `circuit-comparison-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 4,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addSessionTypeWeatherWidget = (type) => {
        const newWidget = {
            i: `session-type-weather-${type || 'all'}-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 4,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addEventOverviewWidget = (eventId) => {
        const newWidget = {
            i: `event-overview-${eventId}-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 4,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addCircuitInfoWidget = (eventId) => {
        const newWidget = {
            i: `circuit-info-${eventId}-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 9,
            h: 9,
            minW: 7,
            minH: 5,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addCircuitDescriptionWidget = (eventId) => {
        const newWidget = {
            i: `circuit-description-${eventId}-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 10,
            h: 8,
            minW: 4,
            minH: 2,
        };
        setNewLayout([...layout, newWidget]);
    }
    const addGridStandingsWidget = (eventId) => {
        const newWidget = {
            i: `grid-standings-${eventId}-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 4,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    }

    const addDriverComparisonWidget = () => {
        console.log("Adding Driver Comparison Widget");
        const newWidget = {
            i: `driver-comparison-${layout.length + 1}`,
            x: (layout.length * 5) % Math.floor(gridWidth / 50),
            y: Infinity,
            w: 9,
            h: 9,
            minW: 9,
            minH: 9,
            maxW: 12,
            maxH: 12,
        };
        setNewLayout([...layout, newWidget]);
    }

    const getComponent = (id) => {
        switch (id.split('-')[0]) {
            case 'top':
                return <TopSpeedWidget riderLegacyId={selectedRider} />;
            case 'rider':
                if (id.startsWith('rider-stats')) return <RiderStatsWidget riderLegacyId={selectedRider} />;
                if (id.startsWith('rider-milestones')) return <RiderMilestonesWidget riderLegacyId={selectedRider} />;
                if (id.startsWith('rider-profile')) return <RiderProfileWidget riderLegacyId={selectedRider} />;
                if (id.startsWith('rider-season-history')) return <RiderSeasonHistoryWidget riderName={selectedRider} />;
                break;
            case 'speed':
                if (id.startsWith('speed-by-season')) return <SpeedBySeasonWidget riderLegacyId={selectedRider} />;
                break;
            case 'season':
                if (id.startsWith('season-evolution')) return <SeasonEvolutionWidget riderLegacyId={selectedRider}/>; // Placeholder
                if (id.startsWith('season-standings-leaderboard')) return <SeasonStandingsLeaderboardWidget />;
                break;
            case 'career':
                if (id.startsWith('career-timeline')) return <CareerTimelineWidget riderLegacyId={selectedRider} />;
                break;
            case 'trophy':
                if (id.startsWith('trophy-display')) return <TrophyDisplayWidget riderLegacyId={selectedRider} />;
                break;
            case 'championship':
                if (id.startsWith('championship-standings')) return <ChampionshipStandingsWidget />;
                break;
            case 'next':
                if (id.startsWith('next-event')) return <NextEventWidget riderLegacyId={selectedRider} />;
                break;
            case 'square':
                return <div>Square Widget</div>;
            case 'custom':
                return <div>Custom Widget</div>;
            case 'team':
                if (id.startsWith('team-analysis')) return <TeamAnalysisWidget />;
                if (id.startsWith('team-achievements')) return <TeamAchievementsWidget />;
                if (id.startsWith('team-comparison')) return <TeamComparisonWidget />;
                if (id.startsWith('team-performance-cards')) return <TeamPerformanceCardsWidget />;
                break;
            case 'session':
                if (id.startsWith('session-classification')) return <SessionClassificationWidget />;
                if (id.startsWith('session-type-weather')) return <SessionTypeWeatherWidget />;
                break;
            case 'bmw':
                return <BMWAwardWidget />;
            case 'circuit':
                if (id.startsWith('circuit-info')) return <CircuitInfoWidget eventId={selectedEvent} />;
                if (id.startsWith('circuit-description')) return <CircuitDescriptionWidget eventId={selectedEvent} />;
                return <CircuitComparisonWidget />;
            case 'event':
                return <EventOverviewWidget />;
            case 'grid':
                if (id.startsWith('grid-standings')) return <GridStandingsWidget eventId={selectedEvent} categoryId={selectedCategory} />;
                break;
            case 'driver':
                return <DriverComparisonWidget riderLegacyId={selectedRider} />;
            default:
                return <EmptyWidget />;
        }
    }

    const exportLayout = () => {
        const layoutData = JSON.stringify(layout);
        const blob = new Blob([layoutData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'dashboard-layout.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    const importLayout = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedLayout = JSON.parse(e.target.result);
                    if (Array.isArray(importedLayout) && importedLayout.every(item => item.i && item.x >= 0 && item.y >= 0 && item.w > 0 && item.h > 0)) {
                        setNewLayout(importedLayout);
                    } else {
                        alert('Invalid layout format. Please upload a valid JSON file.');
                    }
                } catch (error) {
                    alert('Error parsing the file. Please ensure it is a valid JSON file.');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <Container fluid style={{ minHeight: '80vh', padding: '32px 0' }}>
            {/* Selection Bar */}
            <Card className="mb-4 mt-0 m-5 shadow-sm" bg="dark" text="light" style={{ borderRadius: '18px' }}>
                <Card.Body>
                    <Row className="align-items-end g-2">
                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label>{translations[language].dashboard.selectRider}</Form.Label>
                                <div style={{position: 'relative', minWidth: 120}}>
                                <Form.Select
                                    value={selectedRider}
                                    onChange={(e) => setSelectedRider(e.target.value)}
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
                                    <option value="">-- {translations[language].dashboard.selectRider} --</option>
                                    {riders.map((rider) => (
                                        <option key={rider.legacy_id} value={rider.legacy_id}>
                                            {rider.full_name}
                                        </option>
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
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={2}>
                            <Form.Group>
                                <Form.Label>{translations[language].dashboard.selectYear}</Form.Label>
                                <div style={{position: 'relative', minWidth: 120}}>
                                <Form.Select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
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
                                    {categories.map((category) => (
                                        <option key={category.year} value={category.year}>
                                            {category.seasonYear}
                                        </option>
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
                            </Form.Group>
                        </Col>
          {/*              <Col xs={12} md={3}>*/}
          {/*                  <Form.Group>*/}
          {/*                      <Form.Label>{translations[language].dashboard.selectCategory}</Form.Label>*/}
          {/*                      <div style={{position: 'relative', minWidth: 120}}>*/}
          {/*                      <Form.Select*/}
          {/*                          value={selectedCategory}*/}
          {/*                          onChange={(e) => setSelectedCategory(e.target.value)}*/}
          {/*                          style={{*/}
          {/*                              background: '#23272b',*/}
          {/*                              color: '#fff',*/}
          {/*                              border: '1px solid #444b53',*/}
          {/*                              borderRadius: '8px',*/}
          {/*                              padding: '6px 32px 6px 12px',*/}
          {/*                              fontSize: '1rem',*/}
          {/*                              outline: 'none',*/}
          {/*                              appearance: 'none',*/}
          {/*                              width: '100%',*/}
          {/*                              minWidth: '100px',*/}
          {/*                              cursor: 'pointer',*/}
          {/*                          }}*/}
          {/*                      >*/}
          {/*                          <option value="">-- {translations[language].dashboard.selectCategory} --</option>*/}
          {/*                          {categories.find(c => c.seasonYear === Number(selectedYear))?.categories.map((category) => (*/}
          {/*                              <option key={category.legacy_id} value={category.legacy_id}>*/}
          {/*                                  {category.bc_name}*/}
          {/*                              </option>*/}
          {/*                          ))}*/}
          {/*                      </Form.Select>*/}
          {/*                      <span*/}
          {/*                          style={{*/}
          {/*                              pointerEvents: 'none',*/}
          {/*                              position: 'absolute',*/}
          {/*                              right: 12,*/}
          {/*                              top: '50%',*/}
          {/*                              transform: 'translateY(-50%)',*/}
          {/*                              fontSize: '1.2em',*/}
          {/*                              color: '#bbb',*/}
          {/*                          }}*/}
          {/*                      >*/}
          {/*  ▼*/}
          {/*</span>*/}
          {/*                  </div>*/}
          {/*                  </Form.Group>*/}
          {/*              </Col>*/}
                        <Col xs={12} md={4}>
                            <Form.Group>
                                <Form.Label>{translations[language].dashboard.selectEvent}</Form.Label>
                                <div style={{position: 'relative', minWidth: 120}}>
                                <Form.Select
                                    value={selectedEvent}
                                    onChange={(e) => setSelectedEvent(e.target.value)}
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
                                    <option value="">-- {translations[language].dashboard.selectEvent} --</option>
                                    {events.map((event) => (
                                        <option key={event.id} value={event.id}>
                                            {event.name}
                                        </option>
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
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/* Widget Add Buttons */}
            <Card className="mb-4 mt-0 m-5 shadow-sm" bg="dark" text="light" style={{ borderRadius: '18px' }}>
                <Card.Body>
                    <Row className="g-2">
                        <Col>
                            <ButtonGroup>
                                <Button variant="success" onClick={addRiderStatsWidget}>{translations[language].widgets.riderStats.title}</Button>
                                <Button variant="success" onClick={addRiderMilestonesWidget}>{translations[language].widgets.milestones.title}</Button>
                                <Button variant="success" onClick={addRiderProfileWidget}>{translations[language].widgets.riderProfile.title}</Button>
                                <Button variant="success" onClick={addCareerTimelineWidget}>{translations[language].widgets.careerTimeline.title}</Button>
                                <Button variant="success" onClick={addChampionshipStandingsWidget}>{translations[language].widgets.championshipsStandings.title}</Button>
                                <Button variant="success" onClick={addNextEventWidget}>{translations[language].widgets.nextEvent.title}</Button>
                                <Button variant="success" onClick={() => addRiderSeasonHistoryWidget("rider1")}>{translations[language].widgets.seasonHistory.title}</Button>
                                <Button variant="success" onClick={() => addCircuitInfoWidget(selectedEvent)}>{translations[language].widgets.circuitInfo.title}</Button>
                                <Button variant="success" onClick={() => addCircuitDescriptionWidget(selectedEvent)}>{translations[language].widgets.circuitDescription.title}</Button>
                                <Button variant="success" onClick={() => addDriverComparisonWidget()}>{translations[language].widgets.driverComparison.title}</Button>
                            </ButtonGroup>
                        </Col>
                        <Col xs="auto">
                            <Button variant="danger" onClick={clearWidgets}>{translations[language].dashboard.clearWidget}</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/* Export/Import Buttons */}
            <Card className="mb-4 mt-0 m-5 shadow-sm" bg="dark" text="light" style={{ borderRadius: '18px', position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
                <Card.Body>
                    <Row className="g-2">
                        <Col>
                            <Button variant="secondary" onClick={exportLayout}>{translations[language].dashboard.exportLayout}</Button>
                            <input
                                type="file"
                                accept="application/json"

                                onChange={(event) => {
                                    // const fileName = event.target.files[0]?.name || 'No file selected';
                                    // alert(`Selected file: ${fileName}`);
                                    importLayout(event);
                                }}
                                style={{
                                    display: 'none',
                                }}
                                id="import-layout"
                            />
                            <Button
                                variant="light"
                                onClick={() => document.getElementById('import-layout').click()}
                                style={{
                                    marginLeft: '10px',
                                }}
                            >
                                {translations[language].dashboard.importLayout}
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/* Dashboard Grid */}
            <GridLayout
                className="layout"
                layout={layout}
                cols={gridWidth / 50}
                rowHeight={50}
                width={gridWidth}
                onLayoutChange={(newLayout) => enforceSquareRatio(newLayout)}
                draggableHandle=".drag-handle"
            >
                {layout.map((item) => (
                    <div
                    key={item.i}
                data-grid={item}
                style={{
                    // backgroundColor: item.i.startsWith('custom') ? '#ffcccb' : '#575757',
                    background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
                    borderRadius: '16px 16px 0 16px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    position: 'relative',
                    cursor: 'default', // Disable dragging from the main widget area
                    // display: 'flex',
                    // flexDirection: 'column',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                        <div>
                 <div
                     className="drag-handle" // Add this class to enable dragging from the top-left corner
                     style={{
                         width: '20px',
                         height: '20px',
                         // backgroundColor: '#000',
                         position: 'absolute',
                        top: '5px',
                         left: '10px',
                         cursor: 'move',
                            zIndex: 100,
                     }}
                 >
                     <i className="bi bi-grip-horizontal" style={{ color: '#fff', fontSize: '20px' }}></i>
                 </div>
                            {/*<div style={{position: "absolute",top: '0px', color: 'red', fontWeight: 'bold', fontSize: '25px', left: '10px', zIndex: 10000, background: '#fff', pointerEvents: 'none'}}>*/}
                     {/*<span>{item.i}</span>*/}
                     {/*           <span>h: {item.h} w: {item.w}</span>*/}
                     {/*       </div>*/}
                 <button
                     onClick={() => removeWidget(item.i)}
                     style={{
                        position: 'absolute',
                         top: '10px',
                         right: '10px',
                         backgroundColor: '#ff0000',
                         color: '#fff',
                         border: 'none',
                         borderRadius: '25%',
                         width: '32px',
                         height: '32px',
                         padding: '5px',
                         zIndex: 100,
                         cursor: 'pointer',
                     }}
                 >
                     <i className="bi bi-trash" style={{ fontSize: '16px' }}></i>
                 </button>
                </div>

                {/* content (switch statement that compare the beginning of a widget up til first dash) */}
                        <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {getComponent(item.i)}
                        </div>
                    </div>
                ))}
            </GridLayout>
        </Container>
    );
};

export default CustomDashboard;

