import React from 'react';
import { LED, Resistor, Microcontroller } from './circuit-components';


const Sidebar = () => {
  const handleDragStart = (e, componentType) => {
    e.dataTransfer.setData('componentType', componentType);
  };

  return (
    <div className="sidebar">
      <h2>Elements</h2>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'LED')}
      >
        <LED />
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'Resistor')}
      >
        <Resistor />
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'Microcontroller')}
      >
        <Microcontroller />
      </div>
    </div>
  );
};

export default Sidebar;
