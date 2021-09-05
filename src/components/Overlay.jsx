import React from "react";
import "./overlay.css";

const Overlay = ({ message, onReset }) => {
  return (
    <div className="overlay">
      <div className="text glass">{message}</div>
      <button className="glass" type="reset" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default Overlay;
