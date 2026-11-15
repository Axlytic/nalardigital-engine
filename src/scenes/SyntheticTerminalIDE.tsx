import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const SyntheticTerminalIDE: React.FC = () => {
  const frame = useCurrentFrame();

  // Animasi ketik perintah
  const cmd = "node --test";
  const chars = Math.floor(interpolate(frame, [30, 80], [0, cmd.length], { extrapolateRight: "clamp" }));

  const showError = frame > 110;
  const showFix = frame > 320;
  const showPass = frame > 560;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "transparent",
        color: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
        fontFamily: "'JetBrains Mono', Consolas, monospace",
      }}
    >
      {/* Container Terminal Window */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#0d1117",
          borderRadius: 24,
          border: "2px solid #30363d",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            backgroundColor: "#161b22",
            padding: "22px 30px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            borderBottom: "1px solid #21262d",
          }}
        >
          <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "#ff5f56" }} />
          <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
          <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "#27c93f" }} />
          <span style={{ marginLeft: 20, fontSize: 24, color: "#8b949e", fontWeight: 600 }}>
            nalardigital-kit — terminal (node v24)
          </span>
        </div>

        {/* Content Body */}
        <div style={{ padding: 40, fontSize: 27, lineHeight: 1.6 }}>
          <p style={{ color: "#58a6ff" }}>
            $ {cmd.slice(0, chars)}
            <span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>_</span>
          </p>

          {showError && (
            <div style={{ marginTop: 25 }}>
              <p style={{ color: "#7ee787" }}>✔ 1. Normal checkout tanpa kupon (3ms)</p>
              <p style={{ color: "#7ee787" }}>✔ 2. Diskon HARBOLNAS50 untuk belanja kecil (1ms)</p>
              <p style={{ color: "#f85149", fontWeight: 700 }}>
                ✖ 3. Diskon HARBOLNAS50 untuk belanja besar (GAGAL)
              </p>
              <p
                style={{
                  color: "#fca5a5",
                  backgroundColor: "rgba(239,68,68,0.15)",
                  borderLeft: "6px solid #ef4444",
                  padding: "14px 20px",
                  borderRadius: 8,
                  marginTop: 10,
                  fontSize: 24,
                }}
              >
                AssertionError: Diskon bocor melebihi batas maksimal Rp 50.000! (150000 !== 50000)
              </p>
            </div>
          )}

          {showFix && (
            <div
              style={{
                marginTop: 35,
                backgroundColor: "#161b22",
                border: "2px solid #a371f7",
                borderRadius: 14,
                padding: 25,
              }}
            >
              <p style={{ color: "#d2a8ff", fontWeight: 700, marginBottom: 12 }}>
                🤖 Autonomous Agent: Memperbaiki src/checkout.js sesuai AGENTS.md...
              </p>
              <p style={{ color: "#f87171", textDecoration: "line-through", margin: 0 }}>
                - discount = subtotal * 0.5;
              </p>
              <p style={{ color: "#4ade80", fontWeight: 700, margin: 0 }}>
                + discount = Math.min(subtotal * 0.5, 50000);
              </p>
            </div>
          )}

          {showPass && (
            <div
              style={{
                marginTop: 35,
                backgroundColor: "rgba(34,197,94,0.12)",
                border: "2px solid #22c55e",
                borderRadius: 14,
                padding: 25,
              }}
            >
              <p style={{ color: "#4ade80", fontSize: 32, fontWeight: 800, margin: 0 }}>
                ✔ All 4 tests passed (100% verified)
              </p>
              <p style={{ color: "#86efac", fontSize: 24, margin: "8px 0 0 0" }}>
                ℹ pass 4 | fail 0 | duration: 18ms
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
