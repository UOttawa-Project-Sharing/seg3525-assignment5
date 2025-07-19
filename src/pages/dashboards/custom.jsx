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
import mockdata from '../../data/mockdata.json';
import {getRidersUuids} from "../../data/getterAPI.js";
import NextEventWidget from "./widgets/NextEventWidget.jsx";
import { TeamAnalysisWidget, TeamAchievementsWidget, TeamComparisonWidget, TeamPerformanceCardsWidget } from "./widgets/TeamWidgets.jsx";
import { SessionClassificationWidget } from "./widgets/SessionClassificationWidget.jsx";
import { SeasonStandingsLeaderboardWidget } from "./widgets/SeasonStandingsLeaderboardWidget.jsx";
import { BMWAwardWidget } from "./widgets/BMWAwardWidget.jsx";
import { RiderSeasonHistoryWidget } from "./widgets/RiderSeasonHistoryWidget.jsx";
import { CircuitComparisonWidget } from "./widgets/CircuitComparisonWidget.jsx";
import { SessionTypeWeatherWidget } from "./widgets/SessionTypeWeatherWidget.jsx";
import { EventOverviewWidget } from "./widgets/EventOverviewWidget.jsx";
import {getRidersIds} from "../../data/jsonAPI.js";

const CustomDashboard = () => {
    const counter = useSelector((state) => state.counter.value);
    const layout = useSelector((state) => state.dashboard.layout);
    const dispatch = useDispatch();
    const [gridWidth, setGridWidth] = useState(window.innerWidth);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedRider, setSelectedRider] = useState(searchParams.get('rider') || '');
    const [riders, setRiders] = useState([]);

    const setNewLayout = (newLayout) => {
        dispatch(setDashLayout(newLayout));
    }

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
        getRidersIds().then(setRiders);
    }, []);

    const addWidget = () => {
        const newWidget = {
            i: `${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity, // places it at the bottom
            w: 2,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };

    const addSquareWidget = () => {
        const newWidget = {
            i: `square-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
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
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 3,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addSpeedBySeasonWidget = () => {
        const newWidget = {
            i: `speed-by-season-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 3,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addSeasonEvolutionWidget = () => {
        const newWidget = {
            i: `season-evolution-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 3,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addRiderMilestonesWidget = () => {
        const newWidget = {
            i: `rider-milestones-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 3,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addRiderProfileWidget = () => {
        const newWidget = {
            i: `rider-profile-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 3,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addCareerTimelineWidget = () => {
        const newWidget = {
            i: `career-timeline-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 4,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addTrophyDisplayWidget = () => {
        const newWidget = {
            i: `trophy-display-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 3,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addChampionshipStandingsWidget = () => {
        const newWidget = {
            i: `championship-standings-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 4,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addNextEventWidget = () => {
        const newWidget = {
            i: `next-event-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 3,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };

    // Adders for team widgets
    const addTeamAnalysisWidget = () => {
        const newWidget = {
            i: `team-analysis-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 4,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addTeamAchievementsWidget = () => {
        const newWidget = {
            i: `team-achievements-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 4,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addTeamComparisonWidget = () => {
        const newWidget = {
            i: `team-comparison-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 3,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addTeamPerformanceCardsWidget = () => {
        const newWidget = {
            i: `team-performance-cards-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
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
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 4,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    // const addSeasonStandingsLeaderboardWidget = () => {
    //     const newWidget = {
    //         i: `season-standings-leaderboard-${layout.length + 1}`,
    //         x: (layout.length * 2) % Math.floor(gridWidth / 100),
    //         y: Infinity,
    //         w: 4,
    //         h: 3,
    //     };
    //     setNewLayout([...layout, newWidget]);
    // };
    const addBMWAwardWidget = () => {
        const newWidget = {
            i: `bmw-award-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 3,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addRiderSeasonHistoryWidget = (riderName) => {
        const newWidget = {
            i: `rider-season-history-${riderName}-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 4,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };

    // Adders for event/circuit/session performance widgets
    const addCircuitComparisonWidget = () => {
        const newWidget = {
            i: `circuit-comparison-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 4,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addSessionTypeWeatherWidget = (type) => {
        const newWidget = {
            i: `session-type-weather-${type || 'all'}-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 4,
            h: 2,
        };
        setNewLayout([...layout, newWidget]);
    };
    const addEventOverviewWidget = (eventId) => {
        const newWidget = {
            i: `event-overview-${eventId}-${layout.length + 1}`,
            x: (layout.length * 2) % Math.floor(gridWidth / 100),
            y: Infinity,
            w: 4,
            h: 3,
        };
        setNewLayout([...layout, newWidget]);
    };

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
                return <CircuitComparisonWidget />;
            case 'event':
                return <EventOverviewWidget />;
            default:
                return <EmptyWidget />;
        }
    }

    return (
        <div>
            {/*add rider selection */}
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="rider-select">Select Rider:</label>
                <select
                    id="rider-select"
                    value={selectedRider}
                    onChange={(e) => setSelectedRider(e.target.value)}
                >
                    <option value="">-- Select Rider --</option>
                    {riders.map((rider) => (
                        <option key={rider.legacy_id} value={rider.legacy_id}>
                            {rider.full_name}
                        </option>
                    ))}
                </select>
            </div>
            {/* Add widget buttons UI (insert in render return) */}
            <div className="widget-buttons">
                <button style={{background:"green"}} onClick={addRiderStatsWidget}>Add Rider Stats</button>
                {/*<button style={{background:"red"}} onClick={addSpeedBySeasonWidget}>Add Speed by Season</button>*/}
                <button style={{background:"red"}} onClick={addSeasonEvolutionWidget}>Add Season Evolution</button>
                <button style={{background:"green"}} onClick={addRiderMilestonesWidget}>Add Rider Milestones</button>
                <button style={{background:"green"}} onClick={addRiderProfileWidget}>Add Rider Profile</button>
                <button style={{background:"green"}} onClick={addCareerTimelineWidget}>Add Career Timeline</button>
                {/*<button style={{background:"red"}} onClick={addTrophyDisplayWidget}>Add Trophy Display</button>*/}
                <button style={{background:"green"}} onClick={addChampionshipStandingsWidget}>Add Championship Standings</button>
                <button style={{background:"green"}} onClick={addNextEventWidget}>Add Next Event Widget</button>
                <button style={{background:"red"}} onClick={addTeamAnalysisWidget}>Add Team Analysis</button>
                <button style={{background:"red"}} onClick={addTeamAchievementsWidget}>Add Team Achievements</button>
                <button style={{background:"red"}} onClick={addTeamComparisonWidget}>Add Team Comparison</button>
                <button style={{background:"red"}} onClick={addTeamPerformanceCardsWidget}>Add Team Performance Cards</button>
                <button style={{background:"red"}} onClick={addSessionClassificationWidget}>Add Session Classification</button>
                {/*<button style={{background:"red"}} onClick={addSeasonStandingsLeaderboardWidget}>Add Season Standings</button>*/}
                <button style={{background:"red"}} onClick={addBMWAwardWidget}>Add BMW Award</button>
                <button style={{background:"green"}} onClick={() => addRiderSeasonHistoryWidget("rider1")}>Add Rider Season History</button>
                <button style={{background:"red"}} onClick={addCircuitComparisonWidget}>Add Circuit Comparison</button>
                <button style={{background:"red"}} onClick={() => addSessionTypeWeatherWidget("dry")}>Add Session Type/Weather</button>
                <button style={{background:"orange"}} onClick={() => addEventOverviewWidget("event1")}>Add Event Overview</button>
                <button style={{background:"red"}} onClick={addTopSpeedWidget}>Add Top Speed Widget</button>
                <button style={{background:"red"}} onClick={addTopSpeedWidget}>Add Riders Comparison</button>
            </div>
            {/*<button onClick={addWidget}>Add Widget</button>*/}
            {/*<button onClick={addSquareWidget}>Add Square Widget</button>*/}
            {/*<button onClick={addCustomWidget}>Add Custom Widget</button>*/}
            <button onClick={clearWidgets}>Clear Widgets</button>
            <GridLayout
                className="layout"
                layout={layout}
                cols={gridWidth / 100}
                rowHeight={100} // Set row height to match column width
                width={gridWidth}
                onLayoutChange={(newLayout) => enforceSquareRatio(newLayout)}
                draggableHandle=".drag-handle" // Restrict dragging to elements with the drag-handle class
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
                     }}
                 >
                     <i className="bi bi-grip-horizontal" style={{ color: '#fff', fontSize: '20px' }}></i>
                 </div>
                            <div style={{top: '0px'}}>
                     <span>{item.i}</span>
                            </div>
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
                         zIndex: 1,
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
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => dispatch(increment())}>Increment Counter</button>
                <p>Counter Value: {counter}</p>
            </div>
        </div>
    );
};

export default CustomDashboard;

