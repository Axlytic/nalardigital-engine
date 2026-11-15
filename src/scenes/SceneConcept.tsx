import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const SceneConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animasi masuk teks judul hook
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const scale = spring({ frame, fps, config: { damping: 12 } });

  // Transisi perbandingan di frame 540 (detik 18)
  const isComparisonPhase = frame > 540;

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
        position: "relative",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: isComparisonPhase
            ? "radial-gradient(circle, rgba(163,113,247,0.15) 0%, rgba(0,0,0,0) 70%)"
            : "radial-gradient(circle, rgba(239,68,68,0.18) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Badge Atas */}
      <div
        style={{
          opacity: titleOpacity,
          backgroundColor: isComparisonPhase ? "rgba(163,113,247,0.2)" : "rgba(239,68,68,0.2)",
          border: isComparisonPhase ? "2px solid #a371f7" : "2px solid #ef4444",
          color: isComparisonPhase ? "#d2a8ff" : "#fca5a5",
          padding: "12px 30px",
          borderRadius: 30,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 40,
        }}
      >
        {isComparisonPhase ? "Arsitektur Sistem: Harness Protocol" : "Kesalahan Umum Programmer AI"}
      </div>

      {/* Main Title Hook */}
      {!isComparisonPhase ? (
        <div style={{ transform: `scale(${scale})`, opacity: titleOpacity, zIndex: 10 }}>
          <h1
            style={{
              fontSize: 68,
              lineHeight: 1.25,
              fontWeight: 900,
              background: "linear-gradient(180deg, #ffffff 0%, #94a3b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 40,
            }}
          >
            Stop Jadi Kurir
            <br />
            <span style={{ color: "#ef4444", WebkitTextFillColor: "#ef4444" }}>Copy-Paste AI</span>
          </h1>
          <p style={{ fontSize: 34, color: "#94a3b8", lineHeight: 1.6, maxWidth: 860 }}>
            Programmer pemula minta AI nulisin kode.
            <br />
            Engineer pro ngajarin AI <strong style={{ color: "#38bdf8" }}>ngetes kodenya sendiri</strong>.
          </p>
        </div>
      ) : (
        <div style={{ zIndex: 10, width: "100%" }}>
          <h2 style={{ fontSize: 52, fontWeight: 800, marginBottom: 50, color: "#f8fafc" }}>
            Chatbot Pasif vs Autonomous Harness
          </h2>
          <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
            {/* Box 1: Chatbot */}
            <div
              style={{
                flex: 1,
                backgroundColor: "#111827",
                border: "2px solid #374151",
                borderRadius: 24,
                padding: 40,
                textAlign: "left",
              }}
            >
              <div style={{ fontSize: 50, marginBottom: 20 }}>📦</div>
              <h3 style={{ fontSize: 36, color: "#f87171", marginBottom: 15 }}>Chatbot Biasa</h3>
              <p style={{ fontSize: 26, color: "#9ca3af", lineHeight: 1.5 }}>
                • 'Buta' sistem & terminal
                <br />
                • Gak bisa baca file lain
                <br />
                • Manusia jadi perantara manual
              </p>
            </div>

            {/* Box 2: Autonomous Harness */}
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(163,113,247,0.1)",
                border: "2px solid #a371f7",
                borderRadius: 24,
                padding: 40,
                textAlign: "left",
              }}
            >
              <div style={{ fontSize: 50, marginBottom: 20 }}>⚡</div>
              <h3 style={{ fontSize: 36, color: "#c084fc", marginBottom: 15 }}>Harness Agent</h3>
              <p style={{ fontSize: 26, color: "#e2e8f0", lineHeight: 1.5 }}>
                • Akses terminal langsung
                <br />
                • Baca error log sendiri
                <br />
                • Auto-looping sampai test PASS
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
