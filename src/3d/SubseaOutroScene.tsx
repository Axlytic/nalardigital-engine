import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { VirtualCursor } from "../components/VirtualCursor";

export const SubseaOutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isCtaPhase = frame > 80;
  const cardSpring = spring({ frame, fps, config: { damping: 12 } });
  const ctaSpring = spring({ frame: frame - 80, fps, config: { damping: 10 } });

  // Virtual cursor
  let cursorX = 850;
  let cursorY = 1600;
  let cursorClick = false;
  let cursorLabel = "";

  if (isCtaPhase) {
    const cFrame = frame - 80;
    if (cFrame < 70) {
      cursorX = interpolate(cFrame, [0, 50], [850, 540], { extrapolateRight: "clamp" });
      cursorY = interpolate(cFrame, [0, 50], [1600, 1380], { extrapolateRight: "clamp" });
      cursorClick = cFrame >= 45 && cFrame <= 65;
      cursorLabel = cursorClick ? "Click Follow!" : "Hover Button";
    } else {
      cursorX = 540;
      cursorY = 1380;
      cursorClick = false;
      cursorLabel = "✔ Following";
    }
  }

  const isClicked = frame >= 130;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#020617",
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
      {/* Background Radial Glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Top Header Pill */}
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
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: 24 }}>🌐</span>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#38bdf8" }}>
          @nalardigital • KESIMPULAN
        </span>
      </div>

      {/* PART 1: Mental Model Card */}
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
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              border: "1px solid #38bdf8",
              color: "#7dd3fc",
              padding: "10px 28px",
              borderRadius: 20,
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 35,
            }}
          >
            REALITA INFRASTRUKTUR GLOBAL
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
              <span style={{ fontSize: 40 }}>☁️</span>
              <h3 style={{ fontSize: 34, fontWeight: 800, color: "#94a3b8", margin: 0 }}>
                Internet Bukan di Awan Maya:
              </h3>
            </div>
            <p style={{ fontSize: 24, color: "#f87171", margin: 0, paddingLeft: 60, fontWeight: 600 }}>
              Cloud hanyalah komputer orang lain yang terhubung lewat kabel fisik.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              border: "2px solid #38bdf8",
              borderRadius: 28,
              padding: 44,
              textAlign: "left",
              boxShadow: "0 0 50px rgba(56, 189, 248, 0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 15 }}>
              <span style={{ fontSize: 40 }}>🌊</span>
              <h3 style={{ fontSize: 34, fontWeight: 800, color: "#38bdf8", margin: 0 }}>
                Keajaiban Rekayasa Bawah Samudra:
              </h3>
            </div>
            <p style={{ fontSize: 24, color: "#4ade80", margin: 0, paddingLeft: 60, fontWeight: 700 }}>
              Menghubungkan miliaran manusia di atas serat kaca mikroskopis.
            </p>
          </div>
        </div>
      )}

      {/* PART 2: Brand Outro CTA */}
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
              background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 84,
              margin: "0 auto 35px auto",
              boxShadow: "0 0 80px rgba(56, 189, 248, 0.5)",
            }}
          >
            🌐
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
            Bongkar Teknologi di Balik Layar
            <br />
            <span style={{ color: "#94a3b8", fontSize: 28, fontWeight: 500 }}>
              Investasi Leher ke Atas Setiap Hari
            </span>
          </p>

          {/* Interactive Follow Button */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              backgroundColor: isClicked ? "#22c55e" : "#38bdf8",
              color: isClicked ? "#ffffff" : "#020617",
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

          {/* Virtual Cursor */}
          <VirtualCursor x={cursorX} y={cursorY} isClicking={cursorClick} label={cursorLabel} />
        </div>
      )}
    </div>
  );
};
