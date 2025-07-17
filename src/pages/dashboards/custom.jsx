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
import { useSearchParams } from 'react-router';
import mockdata from '../../data/mockdata.json';

const CustomDashboard = () => {
    const counter = useSelector((state) => state.counter.value);
    const layout = useSelector((state) => state.dashboard.layout);
    const dispatch = useDispatch();
    const [gridWidth, setGridWidth] = useState(window.innerWidth);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedRider, setSelectedRider] = useState(searchParams.get('rider') || '');

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

    const getComponent = (id) => {
        switch (id.split('-')[0]) {
            case 'top':
                return <TopSpeedWidget riderUuid={selectedRider} />;
            case 'rider':
                if (id.startsWith('rider-stats')) return <RiderStatsWidget riderUuid={selectedRider} />;
                if (id.startsWith('rider-milestones')) return <RiderMilestonesWidget riderUuid={selectedRider} />;
                if (id.startsWith('rider-profile')) return <RiderProfileWidget riderUuid={selectedRider} />;
                break;
            case 'speed':
                if (id.startsWith('speed-by-season')) return <SpeedBySeasonWidget riderUuid={selectedRider} />;
                break;
            case 'season':
                if (id.startsWith('season-evolution')) return <SeasonEvolutionWidget riderUuid={selectedRider}/>; // Placeholder
                break;
            case 'career':
                if (id.startsWith('career-timeline')) return <CareerTimelineWidget riderUuid={selectedRider} />;
                break;
            case 'trophy':
                if (id.startsWith('trophy-display')) return <TrophyDisplayWidget riderUuid={selectedRider} />;
                break;
            case 'square':
                return <div>Square Widget</div>;
            case 'custom':
                return <div>Custom Widget</div>;
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
                    {mockdata.riders.map((rider) => (
                        <option key={rider.id} value={rider.rider.id}>
                            {rider.rider.full_name}
                        </option>
                    ))}
                </select>
            </div>
            {/* Add widget buttons UI (insert in render return) */}
            <div className="widget-buttons">
                <button onClick={addRiderStatsWidget}>Add Rider Stats</button>
                <button onClick={addSpeedBySeasonWidget}>Add Speed by Season</button>
                <button onClick={addSeasonEvolutionWidget}>Add Season Evolution</button>
                <button onClick={addRiderMilestonesWidget}>Add Rider Milestones</button>
                <button onClick={addRiderProfileWidget}>Add Rider Profile</button>
                <button onClick={addCareerTimelineWidget}>Add Career Timeline</button>
                <button onClick={addTrophyDisplayWidget}>Add Trophy Display</button>
            </div>
            <button onClick={addWidget}>Add Widget</button>
            <button onClick={addTopSpeedWidget}>Add Top Speed Widget</button>
            <button onClick={addSquareWidget}>Add Square Widget</button>
            <button onClick={addCustomWidget}>Add Custom Widget</button>
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
                    // <BaseWidget item={item} onRemove={() => removeWidget(item.i)} />
                    // <h1>{item.i}</h1>
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

