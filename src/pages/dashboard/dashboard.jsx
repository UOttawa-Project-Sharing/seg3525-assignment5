import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { increment, setDashLayout } from '../../store/store';

const Dashboard = () => {
  const counter = useSelector((state) => state.counter.value);
  const layout = useSelector((state) => state.dashboard.layout);
  const dispatch = useDispatch();

  // const [layout, setLayout] = useState(dlayout);
  const [gridWidth, setGridWidth] = useState(window.innerWidth);


  const setNewLayout = (newLayout) => {
    // setLayout(newLayout);
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

  return (
    <div>
      <button onClick={addWidget}>Add Widget</button>
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
          <div
            key={item.i}
            data-grid={item}
            style={{
              backgroundColor: item.i.startsWith('custom') ? '#ffcccb' : '#575757',
              padding: '10px',
              border: '1px solid #ccc',
              position: 'relative',
              cursor: 'default', // Disable dragging from the main widget area
            }}
          >
            <div
              className="drag-handle" // Add this class to enable dragging from the top-left corner
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#000',
                position: 'absolute',
                top: '5px',
                left: '5px',
                cursor: 'move',
              }}
            ></div>
            <span>{item.i.startsWith('custom') ? 'Custom Widget' : `Widget ${item.i}`}</span>
            <button
              onClick={() => removeWidget(item.i)}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                backgroundColor: '#ff0000',
                color: '#fff',
                border: 'none',
                borderRadius: '3px',
                padding: '5px',
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
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

export default Dashboard;
