import React from "react";

interface VirtualCursorProps {
  x: number;
  y: number;
  isClicking?: boolean;
  label?: string;
}

export const VirtualCursor: React.FC<VirtualCursorProps> = ({ x, y, isClicking = false, label }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 9999,
        transform: `translate(-2px, -2px) scale(${isClicking ? 0.85 : 1})`,
        transition: "transform 0.08s ease-out",
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
      }}
    >
      {/* Sleek SVG Mouse Pointer */}
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 3L10.07 20.97L12.58 13.58L19.97 11.07L3 3Z"
          fill="#38bdf8"
          stroke="#0f172a"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Click ripple circle */}
      {isClicking && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "2px solid #38bdf8",
            animation: "pulse 0.3s ease-out infinite",
            transform: "translate(-8px, -8px)",
          }}
        />
      )}

      {/* Floating tooltip label */}
      {label && (
        <div
          style={{
            position: "absolute",
            left: 28,
            top: 14,
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1px solid #38bdf8",
            borderRadius: 6,
            padding: "4px 10px",
            fontSize: 16,
            color: "#38bdf8",
            whiteSpace: "nowrap",
            fontFamily: "'JetBrains Mono', Consolas, monospace",
            fontWeight: 600,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
