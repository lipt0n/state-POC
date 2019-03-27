import React  from "react";

const status_colors = {
  new: "white",
  up_to_date: "green",
  outdated: "gray",
  in_progress: "blue",
  error: "red"
};
export const Step = ({ position, name, status, value, onClick }) => {
  const p = position * 300 + 50;
  return (
    <g>
      <rect
        x={p}
        y="20"
        rx="20"
        ry="20"
        width="150"
        height="150"
        style={{
          fill: status_colors[status],
          stroke: "black",
          strokeWidth: 5,
          opacity: 0.5
        }}
        onClick={onClick}
      />
      <svg width="150" height="50" x={p}>
        <text
          x="50%"
          y="10"
          fill="black"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {name}
        </text>
      </svg>
      <svg width="150" height="50" x={p} y="80">
        <text
          x="50%"
          y="10"
          fill="black"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          status: {status}
        </text>
        {value && (
          <text
            x="50%"
            y="40"
            fill="black"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            value : {value}
          </text>
        )}
      </svg>
    </g>
  )
}
