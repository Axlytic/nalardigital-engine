import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 10 } });

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
        padding: 80,
        fontFamily: "'Inter', sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ transform: `scale(${scale})` }}>
        {/* Glow Logo */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: 45,
            background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 90,
            margin: "0 auto 40px auto",
            boxShadow: "0 0 80px rgba(168,85,247,0.5)",
          }}
        >
          ⚡
        </div>

        <h1 style={{ fontSize: 72, fontWeight: 900, letterSpacing: -1, margin: "0 0 20px 0" }}>
          @nalardigital
        </h1>

        <p style={{ fontSize: 36, color: "#a855f7", fontWeight: 700, margin: "0 0 50px 0" }}>
          Upgrade Cara Berpikir Sebelum Diganti Mesin
        </p>

        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "2px solid rgba(255,255,255,0.15)",
            padding: "24px 48px",
            borderRadius: 50,
            fontSize: 32,
            fontWeight: 600,
            display: "inline-block",
            color: "#e2e8f0",
          }}
        >
          Follow &amp; Simpan untuk Wawasan Tech Berikutnya
        </div>
      </div>
    </div>
  );
};
