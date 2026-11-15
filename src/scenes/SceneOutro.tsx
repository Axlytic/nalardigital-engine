import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { VirtualCursor } from "../components/VirtualCursor";

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part 1: Mental Model Card (0 - 200 frames)
  // Part 2: Sleek Brand CTA & Interactive Follow Click (200 - 450 frames)
  const isCtaPhase = frame >= 200;

  const cardSpring = spring({ frame, fps, config: { damping: 12 } });
  const ctaSpring = spring({ frame: frame - 200, fps, config: { damping: 10 } });

  // Virtual cursor moves to follow button at frame 260, clicks at 310
  let cursorX = 850;
  let cursorY = 1600;
  let cursorClick = false;
  let cursorLabel = "";

  if (isCtaPhase) {
    const cFrame = frame - 200;
    if (cFrame < 110) {
      cursorX = interpolate(cFrame, [0, 80], [850, 540], { extrapolateRight: "clamp" });
      cursorY = interpolate(cFrame, [0, 80], [1600, 1380], { extrapolateRight: "clamp" });
      cursorClick = cFrame >= 75 && cFrame <= 95;
      cursorLabel = cursorClick ? "Click Follow!" : "Hover Button";
    } else {
      cursorX = 540;
      cursorY = 1380;
      cursorClick = false;
      cursorLabel = "✔ Following";
    }
  }

  const isClicked = frame >= 290;

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
        <span style={{ fontSize: 24 }}>💡</span>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#d8b4fe" }}>
          @nalardigital • MENTAL MODEL
        </span>
      </div>

      {/* PART 1: The High Value Insight (0 - 200) */}
      {!isCtaPhase && (
        <div
          style={{
            transform: `scale(${cardSpring})`,
            width: "100%",
            maxWidth: 960,
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(168, 85, 247, 0.2)",
              border: "1px solid #a855f7",
              color: "#e9d5ff",
              padding: "10px 28px",
              borderRadius: 20,
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 35,
            }}
          >
            HUKUM NILAI SOFTWARE ENGINEER 2026
          </div>

          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.88)",
              border: "2px solid #334155",
              borderRadius: 28,
              padding: 44,
              marginBottom: 30,
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 15 }}>
              <span style={{ fontSize: 40 }}>📉</span>
              <h3 style={{ fontSize: 34, fontWeight: 800, color: "#94a3b8", margin: 0 }}>
                Hafalan Sintaksis &amp; Ketik Kode:
              </h3>
            </div>
            <p style={{ fontSize: 24, color: "#f87171", margin: 0, paddingLeft: 60, fontWeight: 600 }}>
              Semakin murah dan mudah digantikan oleh generator AI.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(168, 85, 247, 0.15)",
              border: "2px solid #a855f7",
              borderRadius: 28,
              padding: 44,
              textAlign: "left",
              boxShadow: "0 0 50px rgba(168, 85, 247, 0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 15 }}>
              <span style={{ fontSize: 40 }}>🚀</span>
              <h3 style={{ fontSize: 34, fontWeight: 800, color: "#d8b4fe", margin: 0 }}>
                Arsitektur Harness &amp; Aturan Main AI:
              </h3>
            </div>
            <p style={{ fontSize: 24, color: "#38bdf8", margin: 0, paddingLeft: 60, fontWeight: 700 }}>
              Keahlian berdaya ungkit sangat tinggi yang dicari industri masa depan.
            </p>
          </div>
        </div>
      )}

      {/* PART 2: Sleek Brand Outro with Animated Follow Button (200 - 450) */}
      {isCtaPhase && (
        <div
          style={{
            transform: `scale(${ctaSpring})`,
            width: "100%",
            maxWidth: 960,
            textAlign: "center",
            zIndex: 10,
          }}
        >
          {/* Glowing Animated Logo */}
          <div
            style={{
              width: 170,
              height: 170,
              borderRadius: 45,
              background: "linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 84,
              margin: "0 auto 35px auto",
              boxShadow: "0 0 80px rgba(168, 85, 247, 0.5)",
            }}
          >
            ⚡
          </div>

          <h1
            style={{
              fontSize: 76,
              fontWeight: 900,
              letterSpacing: -1,
              margin: "0 0 15px 0",
              background: "linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            @nalardigital
          </h1>

          <p
            style={{
              fontSize: 34,
              color: "#38bdf8",
              fontWeight: 700,
              margin: "0 0 50px 0",
              lineHeight: 1.4,
            }}
          >
            Investasi Leher ke Atas
            <br />
            <span style={{ color: "#94a3b8", fontSize: 28, fontWeight: 500 }}>
              Upgrade Cara Berpikir Sebelum Diganti Mesin
            </span>
          </p>

          {/* Interactive Follow Button Card */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              backgroundColor: isClicked ? "#22c55e" : "#38bdf8",
              color: isClicked ? "#ffffff" : "#0f172a",
              padding: "24px 56px",
              borderRadius: 60,
              fontSize: 32,
              fontWeight: 900,
              boxShadow: isClicked
                ? "0 0 50px rgba(34, 197, 94, 0.6)"
                : "0 0 50px rgba(56, 189, 248, 0.5)",
              transform: isClicked ? "scale(1.05)" : "scale(1)",
              transition: "all 0.15s ease-out",
            }}
          >
            <span>{isClicked ? "✔" : "➕"}</span>
            <span>{isClicked ? "FOLLOWING @nalardigital" : "Follow & Simpan Video Ini"}</span>
          </div>

          <p style={{ marginTop: 35, fontSize: 24, color: "#64748b" }}>
            Materi: Autonomous Agent • Andrej Karpathy Rules • Full Node.js Kit
          </p>

          {/* Virtual Cursor */}
          <VirtualCursor x={cursorX} y={cursorY} isClicking={cursorClick} label={cursorLabel} />
        </div>
      )}
    </div>
  );
};
