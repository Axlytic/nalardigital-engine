import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { VirtualCursor } from "../components/VirtualCursor";

export const SyntheticTerminalIDE: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing events (relative to scene start 0 to 990 frames)
  // 0 - 150: Typing node --test in terminal
  // 150 - 350: Test runs, fails with red assertion error
  // 350 - 620: Autonomous Agent activates, edits src/checkout.js (Minimal Diff)
  // 620 - 990: Terminal automatically re-runs, all 4 tests PASS in green, stats display

  const cmd = "node --test test/checkout.test.js";
  const typeProgress = Math.floor(interpolate(frame, [30, 110], [0, cmd.length], { extrapolateRight: "clamp" }));

  const isTestFailing = frame >= 130 && frame < 360;
  const isAgentFixing = frame >= 360 && frame < 640;
  const isTestPassing = frame >= 640;

  // Agent HUD spring
  const agentHudSpring = spring({ frame: frame - 360, fps, config: { damping: 12 } });
  const successBadgeSpring = spring({ frame: frame - 670, fps, config: { damping: 10 } });

  // Virtual cursor positions
  let cursorX = 540;
  let cursorY = 1400;
  let cursorClick = false;
  let cursorLabel = "";

  if (frame < 130) {
    // Focus terminal input
    cursorX = interpolate(frame, [0, 30], [540, 380], { extrapolateRight: "clamp" });
    cursorY = interpolate(frame, [0, 30], [900, 1420], { extrapolateRight: "clamp" });
    cursorClick = frame >= 25 && frame <= 35;
    cursorLabel = "Focus Terminal";
  } else if (isAgentFixing) {
    // Move to Line 14 in Editor
    const aFrame = frame - 360;
    cursorX = interpolate(aFrame, [0, 50], [380, 560], { extrapolateRight: "clamp" });
    cursorY = interpolate(aFrame, [0, 50], [1420, 810], { extrapolateRight: "clamp" });
    cursorClick = aFrame >= 45 && aFrame <= 60;
    cursorLabel = "Applying Minimal Diff...";
  } else if (isTestPassing) {
    // Re-verify in terminal
    const pFrame = frame - 640;
    cursorX = interpolate(pFrame, [0, 40], [560, 480], { extrapolateRight: "clamp" });
    cursorY = interpolate(pFrame, [0, 40], [810, 1580], { extrapolateRight: "clamp" });
    cursorClick = pFrame >= 35 && pFrame <= 45;
    cursorLabel = "Auto-Verified ✔";
  }

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
          border: "1px solid rgba(34, 197, 94, 0.4)",
          padding: "10px 28px",
          borderRadius: 30,
          backdropFilter: "blur(12px)",
        }}
      >
        <span style={{ fontSize: 24 }}>🧪</span>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#4ade80" }}>
          @nalardigital • LIVE INTERACTIVE DEMO
        </span>
      </div>

      {/* Main Full IDE Window Container */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#0d1117",
          borderRadius: 24,
          border: isAgentFixing ? "2px solid #a855f7" : isTestPassing ? "2px solid #22c55e" : "2px solid #30363d",
          overflow: "hidden",
          boxShadow: isTestPassing
            ? "0 0 60px rgba(34, 197, 94, 0.25)"
            : isAgentFixing
            ? "0 0 60px rgba(168, 85, 247, 0.25)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          transition: "border 0.3s, box-shadow 0.3s",
        }}
      >
        {/* IDE Top Window Bar */}
        <div
          style={{
            backgroundColor: "#161b22",
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #21262d",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#ff5f56" }} />
            <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
            <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#27c93f" }} />
            <span style={{ marginLeft: 16, fontSize: 20, color: "#8b949e", fontWeight: 600 }}>
              nalardigital-engine — Visual Studio Code
            </span>
          </div>

          {/* Active Status Badge */}
          <div
            style={{
              padding: "4px 14px",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
              backgroundColor: isTestPassing
                ? "rgba(34, 197, 94, 0.2)"
                : isAgentFixing
                ? "rgba(168, 85, 247, 0.2)"
                : "rgba(56, 189, 248, 0.2)",
              color: isTestPassing ? "#4ade80" : isAgentFixing ? "#c084fc" : "#38bdf8",
            }}
          >
            {isTestPassing ? "STATUS: VERIFIED ✔" : isAgentFixing ? "AGENT EDITING..." : "TESTING..."}
          </div>
        </div>

        {/* Editor Tab Bar */}
        <div style={{ display: "flex", backgroundColor: "#0b0f19", borderBottom: "1px solid #21262d" }}>
          <div
            style={{
              padding: "12px 24px",
              backgroundColor: "#161b22",
              borderTop: "2px solid #38bdf8",
              color: "#f0f6fc",
              fontSize: 18,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>📄</span> checkout.js
          </div>
          <div
            style={{
              padding: "12px 24px",
              color: "#8b949e",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>🧪</span> checkout.test.js
          </div>
          <div
            style={{
              padding: "12px 24px",
              color: "#8b949e",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>📜</span> AGENTS.md
          </div>
        </div>

        {/* Code Editor Pane */}
        <div
          style={{
            padding: "24px 30px",
            backgroundColor: "#0d1117",
            fontFamily: "'JetBrains Mono', Consolas, monospace",
            fontSize: 22,
            lineHeight: 1.6,
          }}
        >
          <div style={{ display: "flex", gap: 20 }}>
            <span style={{ color: "#484f58", userSelect: "none" }}>12</span>
            <span style={{ color: "#e6edf3" }}>function calculateDiscount(subtotal, coupon) &#123;</span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <span style={{ color: "#484f58", userSelect: "none" }}>13</span>
            <span style={{ color: "#e6edf3", paddingLeft: 24 }}>if (coupon === 'HARBOLNAS50') &#123;</span>
          </div>

          {/* Line 14: Buggy vs Fixed Diff */}
          <div
            style={{
              display: "flex",
              gap: 20,
              backgroundColor: isAgentFixing || isTestPassing ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.08)",
              padding: "4px 0",
              borderRadius: 6,
            }}
          >
            <span style={{ color: isAgentFixing || isTestPassing ? "#22c55e" : "#ef4444", fontWeight: 700 }}>
              14
            </span>
            <span style={{ paddingLeft: 48 }}>
              {!isAgentFixing && !isTestPassing ? (
                <span style={{ color: "#f87171" }}>return subtotal * 0.5; // ❌ Bug: Tanpa batas cap!</span>
              ) : (
                <span style={{ color: "#4ade80", fontWeight: 700 }}>
                  return Math.min(subtotal * 0.5, 50000); // ✔ Rule #2: Minimal Diff
                </span>
              )}
            </span>
          </div>

          <div style={{ display: "flex", gap: 20 }}>
            <span style={{ color: "#484f58", userSelect: "none" }}>15</span>
            <span style={{ color: "#e6edf3", paddingLeft: 24 }}>&#125;</span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <span style={{ color: "#484f58", userSelect: "none" }}>16</span>
            <span style={{ color: "#e6edf3" }}>&#125;</span>
          </div>
        </div>

        {/* Integrated Terminal Header */}
        <div
          style={{
            backgroundColor: "#161b22",
            padding: "12px 24px",
            borderTop: "1px solid #21262d",
            borderBottom: "1px solid #21262d",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#8b949e",
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ color: "#58a6ff", fontWeight: 700 }}>TERMINAL</span>
            <span>PROBLEMS (0)</span>
            <span>OUTPUT</span>
          </div>
          <span>node v24.2.0 • bash</span>
        </div>

        {/* Terminal Body */}
        <div
          style={{
            padding: "24px 30px",
            backgroundColor: "#06090f",
            fontFamily: "'JetBrains Mono', Consolas, monospace",
            fontSize: 21,
            lineHeight: 1.6,
            minHeight: 380,
          }}
        >
          {/* Typed Command Line */}
          <p style={{ color: "#58a6ff", margin: "0 0 16px 0" }}>
            $ {cmd.slice(0, typeProgress)}
            <span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>_</span>
          </p>

          {/* Test Failure Output */}
          {isTestFailing && (
            <div style={{ animation: "fadeIn 0.2s" }}>
              <p style={{ color: "#7ee787", margin: "4px 0" }}>✔ 1. Normal checkout tanpa kupon (3ms)</p>
              <p style={{ color: "#7ee787", margin: "4px 0" }}>✔ 2. Kupon HARBOLNAS50 subtotal kecil (1ms)</p>
              <p style={{ color: "#f85149", fontWeight: 700, margin: "8px 0" }}>
                ✖ 3. Kupon HARBOLNAS50 subtotal besar Rp 300.000 (GAGAL)
              </p>
              <div
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  borderLeft: "5px solid #ef4444",
                  padding: "12px 18px",
                  borderRadius: 6,
                  marginTop: 10,
                  fontSize: 19,
                  color: "#fca5a5",
                }}
              >
                AssertionError: Diskon bocor! Expected limit Rp 50.000, tapi sistem memberi Rp 150.000!
              </div>
            </div>
          )}

          {/* Autonomous Agent Patch HUD */}
          {isAgentFixing && (
            <div
              style={{
                transform: `scale(${agentHudSpring})`,
                backgroundColor: "rgba(168, 85, 247, 0.15)",
                border: "2px solid #a855f7",
                borderRadius: 12,
                padding: 18,
                marginTop: 10,
              }}
            >
              <p style={{ color: "#d8b4fe", fontWeight: 800, margin: "0 0 6px 0", fontSize: 20 }}>
                🤖 Autonomous Agent: Membaca AGENTS.md &amp; Mendiagnosa Error...
              </p>
              <p style={{ color: "#94a3b8", fontSize: 18, margin: 0 }}>
                Target: <code>src/checkout.js:14</code> ➔ Mengunci dengan <code>Math.min(subtotal * 0.5, 50000)</code>
              </p>
            </div>
          )}

          {/* Success Re-Run Pass Output */}
          {isTestPassing && (
            <div style={{ animation: "fadeIn 0.3s" }}>
              <p style={{ color: "#58a6ff", margin: "0 0 10px 0" }}>$ node --test (Auto-Rerun Verification)</p>
              <p style={{ color: "#4ade80", margin: "4px 0" }}>✔ 1. Normal checkout tanpa kupon (2ms)</p>
              <p style={{ color: "#4ade80", margin: "4px 0" }}>✔ 2. Kupon HARBOLNAS50 subtotal kecil (1ms)</p>
              <p style={{ color: "#4ade80", margin: "4px 0" }}>✔ 3. Kupon HARBOLNAS50 subtotal besar Rp 300.000 (2ms)</p>
              <p style={{ color: "#4ade80", margin: "4px 0" }}>✔ 4. Verifikasi batasan kupon maksimum (1ms)</p>

              {/* Green Pass Card */}
              <div
                style={{
                  transform: `scale(${successBadgeSpring})`,
                  backgroundColor: "rgba(34, 197, 94, 0.18)",
                  border: "2px solid #22c55e",
                  borderRadius: 14,
                  padding: 20,
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h4 style={{ color: "#4ade80", fontSize: 26, fontWeight: 900, margin: 0 }}>
                    ✔ All 4 tests passed (100% verified)
                  </h4>
                  <p style={{ color: "#86efac", fontSize: 18, margin: "4px 0 0 0" }}>
                    pass: 4 | fail: 0 | execution: 14ms
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    color: "#052e16",
                    fontWeight: 900,
                    fontSize: 18,
                    padding: "8px 16px",
                    borderRadius: 10,
                  }}
                >
                  ZERO HUMAN TOUCH
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Virtual Cursor */}
      <VirtualCursor x={cursorX} y={cursorY} isClicking={cursorClick} label={cursorLabel} />
    </div>
  );
};
