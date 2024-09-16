import React from 'react';
import './cicruit-components-style.css';

const LED = ({ id, onTerminalClick }) => {
  return (
    <div className="cicruit-element led">
      <div className="label">LED</div>
      <div className="terminals">
        <div
          className="terminal"
          id={`${id}-pos`}
          onClick={() => onTerminalClick(`${id}-pos`)}
        >
          +
        </div>
        <div
          className="terminal"
          id={`${id}-neg`}
          onClick={() => onTerminalClick(`${id}-neg`)}
        >
          -
        </div>
      </div>
    </div>
  );
};

export default LED;