import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { increment, setDashLayout } from '../../store/store.js';
import EmptyWidget from "./widgets/emptyWidget.jsx";
import TopSpeedWidget from "./widgets/TopSpeedWidget.jsx";
// import DriverTopSpeedWidget from './widgets/DriverTopSpeedWidget.jsx';
// import BaseWidget from "./widgets/baseWidgets.jsx";
import mockdata from '../../data/mockdata.json';
import { useSearchParams } from 'react-router';

const getUniqueRiders = () => {
    const riderMap = {};
    mockdata.sessions.forEach(session => {
        session.classification.forEach(entry => {
            const rider = entry.rider;
            if (rider && !riderMap[rider.id]) {
                riderMap[rider.id] = rider;
            }
        });
    });
    return Object.values(riderMap);
};

const PilotsDashboard = () => {
    const counter = useSelector((state) => state.counter.value);
    const layout = useSelector((state) => state.dashboard.layout);
    const dispatch = useDispatch();

    // const [layout, setLayout] = useState(dlayout);
    const [gridWidth, setGridWidth] = useState(window.innerWidth);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedRider, setSelectedRider] = useState(searchParams.get('rider') || '');
    const uniqueRiders = getUniqueRiders();


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

    const getComponent = (id) => {
        switch (id.split('-')[0]) {
            case 'top':
                return <TopSpeedWidget riderUuid={selectedRider}/>;
            case 'square':
                return <div>Square Widget</div>; // Replace with actual Square Widget component
            case 'custom':
                return <div>Custom Widget</div>; // Replace with actual Custom Widget component
            default:
                return <EmptyWidget />; // Default case for empty widget
        }
    }

    return (
        <div>
            <label htmlFor="rider-select">Choose a pilot: </label>
            <select
                id="rider-select"
                value={selectedRider}
                onChange={e => setSelectedRider(e.target.value)}
            >
                <option value="">-- Select a pilot --</option>
                {uniqueRiders.map(rider => (
                    <option key={rider.id} value={rider.id}>{rider.full_name}</option>
                ))}
            </select>
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

export default PilotsDashboard;

