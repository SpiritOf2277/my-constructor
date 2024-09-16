import React from 'react';
import './cicruit-components-style.css';

const Resistor = ({ id, onTerminalClick }) => {
  return (
    <div className="cicruit-element resistor">
      <div className="label">Resistor</div>
      <div className="terminals">
        <div
          className="terminal"
          id={`${id}-pos`}
          onClick={() => onTerminalClick(`${id}-pos`)}
        >
          ~
        </div>
        <div
          className="terminal"
          id={`${id}-neg`}
          onClick={() => onTerminalClick(`${id}-neg`)}
        >
          ~
        </div>
      </div>
    </div>
  );
};

export default Resistor;