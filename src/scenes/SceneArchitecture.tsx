import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { VirtualCursor } from "../components/VirtualCursor";

export const SceneArchitecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part 1: 0 - 360 frames (12s): The Autonomous Self-Healing Loop Diagram
  // Part 2: 360 - 720 frames (12s): Karpathy's 4 Rules in AGENTS.md
  const isRulesPhase = frame >= 360;

  // Pulse animation for the traveling data packet around the 4 nodes
  const loopT = (frame * 0.05) % 4; // 0 to 4
  const activeNodeIdx = Math.floor(loopT);

  // Karpathy card springs
  const card1Spring = spring({ frame: frame - 360, fps, config: { damping: 12 } });
  const card2Spring = spring({ frame: frame - 430, fps, config: { damping: 12 } });
  const card3Spring = spring({ frame: frame - 500, fps, config: { damping: 12 } });
  const card4Spring = spring({ frame: frame - 570, fps, config: { damping: 12 } });

  // Virtual Cursor for Rules Phase
  let cursorX = 540;
  let cursorY = 960;
  let cursorClick = false;
  let cursorLabel = "";

  if (isRulesPhase) {
    const rFrame = frame - 360;
    if (rFrame < 90) {
      cursorX = interpolate(rFrame, [0, 40], [200, 320], { extrapolateRight: "clamp" });
      cursorY = interpolate(rFrame, [0, 40], [1400, 750], { extrapolateRight: "clamp" });
      cursorClick = rFrame >= 35 && rFrame <= 45;
      cursorLabel = "Audit Rule #1";
    } else if (rFrame < 180) {
      cursorX = interpolate(rFrame, [90, 130], [320, 760], { extrapolateRight: "clamp" });
      cursorY = interpolate(rFrame, [90, 130], [750, 750], { extrapolateRight: "clamp" });
      cursorClick = rFrame >= 125 && rFrame <= 135;
      cursorLabel = "Audit Rule #2";
    } else if (rFrame < 270) {
      cursorX = interpolate(rFrame, [180, 220], [760, 320], { extrapolateRight: "clamp" });
      cursorY = interpolate(rFrame, [180, 220], [750, 1180], { extrapolateRight: "clamp" });
      cursorClick = rFrame >= 215 && rFrame <= 225;
      cursorLabel = "Audit Rule #3";
    } else {
      cursorX = interpolate(rFrame, [270, 310], [320, 760], { extrapolateRight: "clamp" });
      cursorY = interpolate(rFrame, [270, 310], [1180, 1180], { extrapolateRight: "clamp" });
      cursorClick = rFrame >= 305 && rFrame <= 315;
      cursorLabel = "Audit Rule #4";
    }
  }

  const nodes = [
    { title: "1. Workspace Scan", sub: "Membaca context & AST", icon: "📂" },
    { title: "2. Terminal Test", sub: "Jalankan $ node --test", icon: "⚡" },
    { title: "3. Error Analyzer", sub: "Isolasi baris AssertionError", icon: "🔍" },
    { title: "4. Self-Healing", sub: "Tulis Minimal Diff & Rerun", icon: "🛠️" },
  ];

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "transparent",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        fontFamily: "'Inter', sans-serif",
        position: "relative",
      }}
    >
      {/* Top Header Pill */}
      <div
        style={{
          position: "absolute",
          top: 100,
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          border: "1px solid rgba(168, 85, 247, 0.4)",
          padding: "10px 28px",
          borderRadius: 30,
          backdropFilter: "blur(12px)",
        }}
      >
        <span style={{ fontSize: 24 }}>🧠</span>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#c084fc" }}>
          @nalardigital • ARSITEKTUR LOOP
        </span>
      </div>

      {/* PART 1: The Autonomous Loop Diagram (0 - 360) */}
      {!isRulesPhase && (
        <div style={{ width: "100%", zIndex: 10, textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              border: "1px solid #38bdf8",
              color: "#7dd3fc",
              padding: "10px 26px",
              borderRadius: 20,
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            SISTEM REKAYASA MANDIRI
          </div>

          <h2 style={{ fontSize: 56, fontWeight: 900, marginBottom: 50, color: "#f8fafc" }}>
            The Autonomous Harness Loop
          </h2>

          {/* Interactive 4-Node Grid with Live Packet Pulse */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 28,
              position: "relative",
            }}
          >
            {nodes.map((n, i) => {
              const isActive = activeNodeIdx === i;
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: isActive ? "rgba(56, 189, 248, 0.18)" : "rgba(15, 23, 42, 0.85)",
                    border: isActive ? "3px solid #38bdf8" : "2px solid #334155",
                    borderRadius: 24,
                    padding: 34,
                    textAlign: "left",
                    transform: isActive ? "scale(1.04)" : "scale(1)",
                    transition: "all 0.15s ease-out",
                    boxShadow: isActive ? "0 0 40px rgba(56, 189, 248, 0.4)" : "none",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 44 }}>{n.icon}</span>
                    {isActive && (
                      <span
                        style={{
                          backgroundColor: "#38bdf8",
                          color: "#0f172a",
                          fontSize: 16,
                          fontWeight: 800,
                          padding: "4px 10px",
                          borderRadius: 8,
                        }}
                      >
                        RUNNING
                      </span>
                    )}
                  </div>
                  <h3
                    style={{
                      fontSize: 32,
                      fontWeight: 800,
                      margin: "18px 0 8px 0",
                      color: isActive ? "#38bdf8" : "#f1f5f9",
                    }}
                  >
                    {n.title}
                  </h3>
                  <p style={{ fontSize: 22, color: "#94a3b8", margin: 0 }}>{n.sub}</p>
                </div>
              );
            })}
          </div>

          {/* Center Energy Pulse Badge */}
          <div
            style={{
              marginTop: 40,
              backgroundColor: "rgba(168, 85, 247, 0.15)",
              border: "2px solid #a855f7",
              borderRadius: 20,
              padding: "20px 30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 15px #22c55e",
              }}
            />
            <span style={{ fontSize: 26, fontWeight: 700, color: "#e2e8f0" }}>
              Looping Berjalan Sampai 100% Test PASS Tanpa Sentuhan Manusia
            </span>
          </div>
        </div>
      )}

      {/* PART 2: Karpathy's 4 Rules in AGENTS.md (360 - 720) */}
      {isRulesPhase && (
        <div style={{ width: "100%", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: 35 }}>
            <span
              style={{
                backgroundColor: "rgba(168, 85, 247, 0.2)",
                border: "1px solid #a855f7",
                color: "#d8b4fe",
                padding: "8px 24px",
                borderRadius: 20,
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              📄 Standard Operating Procedure: AGENTS.md
            </span>
            <h2 style={{ fontSize: 50, fontWeight: 900, marginTop: 15, margin: 0 }}>
              4 Aturan Emas Andrej Karpathy
            </h2>
          </div>

          {/* 4 Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Rule 1 */}
            <div
              style={{
                transform: `scale(${card1Spring})`,
                backgroundColor: "rgba(15, 23, 42, 0.88)",
                border: frame > 360 && frame < 450 ? "3px solid #38bdf8" : "2px solid #334155",
                borderRadius: 24,
                padding: 30,
                boxShadow: frame > 360 && frame < 450 ? "0 0 35px rgba(56, 189, 248, 0.3)" : "none",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🧠</div>
              <h4 style={{ fontSize: 28, fontWeight: 800, color: "#38bdf8", margin: "0 0 8px 0" }}>
                1. Think First
              </h4>
              <p style={{ fontSize: 20, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>
                Analisis arsitektur &amp; rencana detail sebelum utak-atik berkas proyek.
              </p>
            </div>

            {/* Rule 2 */}
            <div
              style={{
                transform: `scale(${card2Spring})`,
                backgroundColor: "rgba(15, 23, 42, 0.88)",
                border: frame >= 450 && frame < 540 ? "3px solid #c084fc" : "2px solid #334155",
                borderRadius: 24,
                padding: 30,
                boxShadow: frame >= 450 && frame < 540 ? "0 0 35px rgba(192, 132, 252, 0.3)" : "none",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
              <h4 style={{ fontSize: 28, fontWeight: 800, color: "#c084fc", margin: "0 0 8px 0" }}>
                2. Minimal Diffs
              </h4>
              <p style={{ fontSize: 20, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>
                Hanya modifikasi baris yang rusak. Hindari perubahan liar tak berdasar.
              </p>
            </div>

            {/* Rule 3 */}
            <div
              style={{
                transform: `scale(${card3Spring})`,
                backgroundColor: "rgba(15, 23, 42, 0.88)",
                border: frame >= 540 && frame < 630 ? "3px solid #22c55e" : "2px solid #334155",
                borderRadius: 24,
                padding: 30,
                boxShadow: frame >= 540 && frame < 630 ? "0 0 35px rgba(34, 197, 94, 0.3)" : "none",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🧪</div>
              <h4 style={{ fontSize: 28, fontWeight: 800, color: "#4ade80", margin: "0 0 8px 0" }}>
                3. Verification Loop
              </h4>
              <p style={{ fontSize: 20, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>
                Wajib jalankan unit test otomatis di terminal sampai terbukti hijau.
              </p>
            </div>

            {/* Rule 4 */}
            <div
              style={{
                transform: `scale(${card4Spring})`,
                backgroundColor: "rgba(15, 23, 42, 0.88)",
                border: frame >= 630 ? "3px solid #f59e0b" : "2px solid #334155",
                borderRadius: 24,
                padding: 30,
                boxShadow: frame >= 630 ? "0 0 35px rgba(245, 158, 11, 0.3)" : "none",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🛡️</div>
              <h4 style={{ fontSize: 28, fontWeight: 800, color: "#fbbf24", margin: "0 0 8px 0" }}>
                4. Proof Over Assumption
              </h4>
              <p style={{ fontSize: 20, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>
                Jangan pernah berasumsi selesai sebelum output terminal membuktikannya.
              </p>
            </div>
          </div>

          {/* Virtual Cursor */}
          <VirtualCursor x={cursorX} y={cursorY} isClicking={cursorClick} label={cursorLabel} />
        </div>
      )}
    </div>
  );
};
