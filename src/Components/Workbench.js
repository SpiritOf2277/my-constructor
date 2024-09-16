import React, { useState, useEffect, useRef } from 'react';
import { LED, Resistor, Microcontroller } from './circuit-components';
import Xarrow from 'react-xarrows';

const Workbench = () => {
  const [components, setComponents] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [currentConnection, setCurrentConnection] = useState(null);
  const [connections, setConnections] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringOverToast, setIsHoveringOverToast] = useState(false);
  const [toastRect, setToastRect] = useState(null);
  const workbenchRef = useRef(null);

  useEffect(() => {
    const toastElement = document.getElementById('delete-toast');
    if (toastElement) {
      setToastRect(toastElement.getBoundingClientRect());
    }
  }, [isDragging]);

  const handleDrop = (e) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('componentType');
    const newComponent = {
      type: componentType,
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
    setComponents([...components, newComponent]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleMouseDown = (index, e) => {
    if (e.target.classList.contains('terminal')) {
      setCurrentConnection({ start: e.target.id });
    } else {
      setDraggingIndex(index);
      setOffset({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (draggingIndex !== null) {
      const newComponents = components.map((component, index) =>
        index === draggingIndex
          ? { ...component, x: e.clientX - offset.x, y: e.clientY - offset.y }
          : component
      );
      setComponents(newComponents);
    }

    if (currentConnection) {
      const workbenchRect = workbenchRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - workbenchRect.left,
        y: e.clientY - workbenchRect.top,
      });
    }

    if (toastRect) {
      setIsHoveringOverToast(
        e.clientX >= toastRect.left &&
        e.clientX <= toastRect.right &&
        e.clientY >= toastRect.top &&
        e.clientY <= toastRect.bottom
      );
    }
  };

  const handleMouseUp = (e) => {
    if (currentConnection) {
      if (e.target.classList.contains('terminal')) {
        setConnections((prevConnections) => [
          ...prevConnections,
          { ...currentConnection, end: e.target.id },
        ]);
      }
      setCurrentConnection(null);
    }

    if (isDragging && isHoveringOverToast) {
      const componentToRemove = `component-${draggingIndex}`;
      setComponents((prevComponents) =>
        prevComponents.filter((_, index) => index !== draggingIndex)
      );
      setConnections((prevConnections) =>
        prevConnections.filter(
          (connection) =>
            !connection.start.startsWith(componentToRemove) &&
            !connection.end.startsWith(componentToRemove)
        )
      );
    }

    setDraggingIndex(null);
    setIsDragging(false);
  };

  const renderComponent = (component, index) => {
    const style = {
      position: 'absolute',
      left: `${component.x}px`,
      top: `${component.y}px`,
      cursor: draggingIndex === index ? 'grabbing' : 'grab',
      zIndex: 100,
    };

    const idPrefix = `component-${index}`;
    switch (component.type) {
      case 'LED':
        return (
          <div
            key={idPrefix}
            className="component-container"
            style={style}
            onMouseDown={(e) => handleMouseDown(index, e)}
            onMouseUp={handleMouseUp}
          >
            <LED id={idPrefix} />
          </div>
        );
      case 'Resistor':
        return (
          <div
            key={idPrefix}
            className="component-container"
            style={style}
            onMouseDown={(e) => handleMouseDown(index, e)}
            onMouseUp={handleMouseUp}
          >
            <Resistor id={idPrefix} />
          </div>
        );
      case 'Microcontroller':
        return (
          <div
            key={idPrefix}
            className="component-container"
            style={style}
            onMouseDown={(e) => handleMouseDown(index, e)}
            onMouseUp={handleMouseUp}
          >
            <Microcontroller id={idPrefix} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="workbench"
      ref={workbenchRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h2>Workbench</h2>
      <div className="arrow-container">
        {connections.map((connection, index) => (
          <Xarrow
            key={index}
            start={connection.start}
            end={connection.end}
          />
        ))}
        {currentConnection && (
          <Xarrow
            start={currentConnection.start}
            end={mousePosition}
            color="gray"
            dashness
          />
        )}
      </div>
      {components.map((component, index) => (
        <div key={index}>
          {renderComponent(component, index)}
        </div>
      ))}
      {isDragging && (
        <div
          id="delete-toast"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: isHoveringOverToast ? '#04699f' : '#0288d1',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
            border: '2px solid white',
            zIndex: 50,
            height: 150,
            width: 200,
          }}
        >
          Удалить
        </div>
      )}
    </div>
  );
};

export default Workbench;
