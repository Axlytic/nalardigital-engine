import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { VirtualCursor } from "../components/VirtualCursor";

export const SceneConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const hookScale = spring({ frame, fps, config: { damping: 12 } });
  const hookOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Phase 1: 0 - 200 (Hook)
  // Phase 2: 200 - 420 (Kurir Copy-Paste Trap Simulation)
  // Phase 3: 420 - 540 (Harness Paradigm Shift)
  const isTrapPhase = frame >= 200 && frame < 420;
  const isShiftPhase = frame >= 420;

  // Virtual Cursor Motion for Phase 2
  // 210-240: move to Chatbot copy button
  // 240-260: click copy button
  // 260-310: move to VS Code editor
  // 310-330: click and paste
  // 340+: error occurs, move back
  let cursorX = 540;
  let cursorY = 960;
  let cursorClick = false;
  let cursorLabel = "";

  if (isTrapPhase) {
    const pFrame = frame - 200;
    if (pFrame < 50) {
      // Move to copy button in Chat window (x: 420, y: 1050)
      cursorX = interpolate(pFrame, [0, 40], [540, 420], { extrapolateRight: "clamp" });
      cursorY = interpolate(pFrame, [0, 40], [1300, 1050], { extrapolateRight: "clamp" });
      cursorClick = pFrame >= 35 && pFrame <= 45;
      cursorLabel = cursorClick ? "Click Copy" : "Select Code";
    } else if (pFrame < 120) {
      // Move to VS Code editor (x: 820, y: 1050)
      cursorX = interpolate(pFrame, [50, 100], [420, 820], { extrapolateRight: "clamp" });
      cursorY = interpolate(pFrame, [50, 100], [1050, 1050], { extrapolateRight: "clamp" });
      cursorClick = pFrame >= 95 && pFrame <= 110;
      cursorLabel = cursorClick ? "Paste Code" : "Switch to IDE";
    } else {
      // Panic move back
      cursorX = interpolate(pFrame, [120, 170], [820, 420], { extrapolateRight: "clamp" });
      cursorY = interpolate(pFrame, [120, 170], [1050, 1180], { extrapolateRight: "clamp" });
      cursorClick = pFrame >= 165 && pFrame <= 180;
      cursorLabel = "Copy Error Msg...";
    }
  }

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
      {/* Top Brand Pill */}
      <div
        style={{
          position: "absolute",
          top: 100,
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          border: "1px solid rgba(56, 189, 248, 0.4)",
          padding: "10px 28px",
          borderRadius: 30,
          backdropFilter: "blur(12px)",
        }}
      >
        <span style={{ fontSize: 24 }}>⚡</span>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#38bdf8" }}>
          @nalardigital • INSIGHT #01
        </span>
      </div>

      {/* PHASE 1: Hook Headline (0 - 200) */}
      {!isTrapPhase && !isShiftPhase && (
        <div
          style={{
            transform: `scale(${hookScale})`,
            opacity: hookOpacity,
            textAlign: "center",
            maxWidth: 960,
          }}
        >
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "1px solid #ef4444",
              color: "#f87171",
              padding: "12px 30px",
              borderRadius: 24,
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 40,
            }}
          >
            Fatal Mistake Developer 2026
          </div>

          <h1
            style={{
              fontSize: 72,
              lineHeight: 1.25,
              fontWeight: 900,
              background: "linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 50,
            }}
          >
            Programmer Pemula Minta AI Nulis Kode...
          </h1>

          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "2px solid #38bdf8",
              borderRadius: 28,
              padding: "36px 48px",
              boxShadow: "0 0 60px rgba(56, 189, 248, 0.2)",
            }}
          >
            <p style={{ fontSize: 36, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
              Engineer profesional ngajarin AI:
              <br />
              <strong style={{ fontSize: 44, color: "#38bdf8", textDecoration: "underline" }}>
                Ngetes kodenya sendiri sampai hijau!
              </strong>
            </p>
          </div>
        </div>
      )}

      {/* PHASE 2: Interactive Kurir Copy-Paste Trap (200 - 420) */}
      {isTrapPhase && (
        <div style={{ width: "100%", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: 35 }}>
            <span
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                border: "1px solid #ef4444",
                color: "#fca5a5",
                padding: "8px 24px",
                borderRadius: 20,
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              ⚠️ Perangkap Kurir Manual
            </span>
            <h2 style={{ fontSize: 50, fontWeight: 900, marginTop: 15, margin: 0 }}>
              Bolak-Balik Copy-Paste Error?
            </h2>
          </div>

          {/* Dual Interactive Window */}
          <div style={{ display: "flex", gap: 24, width: "100%", height: 780 }}>
            {/* Left: Chatbot Mockup */}
            <div
              style={{
                flex: 1,
                backgroundColor: "#0f172a",
                border: "2px solid #334155",
                borderRadius: 24,
                padding: 30,
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700, color: "#94a3b8", marginBottom: 20 }}>
                🤖 Web Chat AI
              </div>
              <div
                style={{
                  backgroundColor: "#1e293b",
                  borderRadius: 14,
                  padding: 20,
                  fontSize: 22,
                  color: "#cbd5e1",
                  lineHeight: 1.5,
                  marginBottom: 20,
                }}
              >
                "Coba copy fungsi ini ke file kamu..."
              </div>
              <div
                style={{
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  borderRadius: 12,
                  padding: 16,
                  fontFamily: "monospace",
                  fontSize: 18,
                  color: "#38bdf8",
                  flex: 1,
                }}
              >
                {`function checkout(cart) {
  let discount = cart.total * 0.5;
  return discount;
}`}
              </div>
              {/* Copy Button */}
              <button
                style={{
                  marginTop: 16,
                  padding: "14px 20px",
                  backgroundColor: frame > 240 ? "#22c55e" : "#38bdf8",
                  color: "#0f172a",
                  fontWeight: 800,
                  fontSize: 20,
                  border: "none",
                  borderRadius: 12,
                }}
              >
                {frame > 240 ? "✔ Copied to Clipboard!" : "📋 Copy Code"}
              </button>
            </div>

            {/* Right: VS Code Editor Mockup */}
            <div
              style={{
                flex: 1,
                backgroundColor: "#0b0f19",
                border: "2px solid #334155",
                borderRadius: 24,
                padding: 30,
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700, color: "#94a3b8", marginBottom: 20 }}>
                💻 VS Code (checkout.js)
              </div>
              <div
                style={{
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  borderRadius: 12,
                  padding: 16,
                  fontFamily: "monospace",
                  fontSize: 18,
                  color: frame > 300 ? "#4ade80" : "#64748b",
                  flex: 1,
                }}
              >
                {frame > 300
                  ? `// Paste Berhasil\nfunction checkout(cart) {\n  let discount = cart.total * 0.5;\n  return discount;\n}`
                  : `// Editor Kosong...\n// Menunggu paste`}
              </div>

              {/* Shaking Red Error Popup after paste */}
              {frame > 320 && (
                <div
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.2)",
                    border: "2px solid #ef4444",
                    borderRadius: 14,
                    padding: 18,
                    marginTop: 16,
                  }}
                >
                  <p style={{ color: "#f87171", fontSize: 20, fontWeight: 800, margin: 0 }}>
                    ✖ RUNTIME ERROR!
                  </p>
                  <p style={{ color: "#fca5a5", fontSize: 16, margin: "6px 0 0 0" }}>
                    AssertionError: Diskon tembus batas limit!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Warning Stamp Footer */}
          <div
            style={{
              marginTop: 35,
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "2px dashed #ef4444",
              borderRadius: 20,
              padding: "20px 30px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 900, color: "#f87171" }}>
              📦 Lu bukan lagi dibantu AI — Lu cuma jadi kurir teks manual!
            </span>
          </div>

          {/* Virtual Mouse Cursor */}
          <VirtualCursor x={cursorX} y={cursorY} isClicking={cursorClick} label={cursorLabel} />
        </div>
      )}

      {/* PHASE 3: Autonomous Harness Paradigm Shift (420 - 540) */}
      {isShiftPhase && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: 960 }}>
          <div
            style={{
              backgroundColor: "rgba(168, 85, 247, 0.2)",
              border: "2px solid #a855f7",
              color: "#d8b4fe",
              padding: "12px 30px",
              borderRadius: 30,
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 40,
              display: "inline-block",
            }}
          >
            LOMPATAN PARADIGMA
          </div>

          <h2
            style={{
              fontSize: 66,
              fontWeight: 900,
              lineHeight: 1.25,
              marginBottom: 40,
              background: "linear-gradient(135deg, #38bdf8 0%, #c084fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Autonomous Harness Protocol
          </h2>

          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              border: "2px solid #38bdf8",
              borderRadius: 28,
              padding: 44,
              boxShadow: "0 20px 60px rgba(56, 189, 248, 0.2)",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor: "rgba(56, 189, 248, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                }}
              >
                👁️
              </div>
              <div>
                <h4 style={{ fontSize: 30, fontWeight: 800, margin: 0, color: "#f8fafc" }}>
                  Mata: Membaca Seluruh Workspace
                </h4>
                <p style={{ fontSize: 22, color: "#94a3b8", margin: "6px 0 0 0" }}>
                  Bukan potongan kode terisolasi, tapi paham kaitan file satu dengan yang lain.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor: "rgba(168, 85, 247, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                }}
              >
                ⚡
              </div>
              <div>
                <h4 style={{ fontSize: 30, fontWeight: 800, margin: 0, color: "#f8fafc" }}>
                  Tangan: Eksekusi Terminal Mandiri
                </h4>
                <p style={{ fontSize: 22, color: "#94a3b8", margin: "6px 0 0 0" }}>
                  Bisa run test, baca error trace, dan auto-loop perbaikan sampai hijau.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
