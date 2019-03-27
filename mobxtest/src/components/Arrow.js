import React from "react";

export const Arrow = ({ from, to }) => (
    <line
      x1={from * 300 + 210}
      y1="90"
      x2={to * 300}
      y2="90"
      stroke="#000"
      strokeWidth="5"
      markerEnd="url(#arrow)"
    />
  )