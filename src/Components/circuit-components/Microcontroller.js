import React from 'react';
import './cicruit-components-style.css';

const Microcontroller = ({ id, onTerminalClick }) => {
  return (
    <div className="cicruit-element microcontroller">
      <div className="label">Microcontroller</div>
      <div className="terminals">
        <div
          className="terminal"
          id={`${id}-3v3`}
          onClick={() => onTerminalClick(`${id}-3v3`)}
        >
          3V3
        </div>
        <div
          className="terminal"
          id={`${id}-gnd`}
          onClick={() => onTerminalClick(`${id}-gnd`)}
        >
          GND
        </div>
        <div
          className="terminal"
          id={`${id}-tx`}
          onClick={() => onTerminalClick(`${id}-tx`)}
        >
          TX
        </div>
        <div
          className="terminal"
          id={`${id}-rx`}
          onClick={() => onTerminalClick(`${id}-rx`)}
        >
          RX
        </div>
        <div
          className="terminal"
          id={`${id}-d1`}
          onClick={() => onTerminalClick(`${id}-d1`)}
        >
          D1
        </div>
        <div
          className="terminal"
          id={`${id}-d2`}
          onClick={() => onTerminalClick(`${id}-d2`)}
        >
          D2
        </div>
        <div
          className="terminal"
          id={`${id}-a0`}
          onClick={() => onTerminalClick(`${id}-a0`)}
        >
          A0
        </div>
      </div>
    </div>
  );
};

export default Microcontroller;
