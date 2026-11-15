import React from "react";
import { Composition, Sequence, Audio, staticFile, AbsoluteFill } from "remotion";
import { TechBackground } from "./3d/TechBackground";
import { SceneConcept } from "./scenes/SceneConcept";
import { SceneArchitecture } from "./scenes/SceneArchitecture";
import { SyntheticTerminalIDE } from "./scenes/SyntheticTerminalIDE";
import { SceneOutro } from "./scenes/SceneOutro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Komposisi Utama NalarDigital01: Autonomous Agent Harness */}
      <Composition
        id="NalarDigital01"
        component={() => (
          <AbsoluteFill style={{ backgroundColor: "#06090f" }}>
            {/* 1. High Performance 3D Three.js Cybernetic Living Background */}
            <AbsoluteFill style={{ opacity: 0.65 }}>
              <TechBackground />
            </AbsoluteFill>

            {/* 2. Audio Voice-Over Neural (id-ID-ArdiNeural, 80s + Outro) */}
            <Audio src={staticFile("voice_over_90s.mp3")} />

            {/* 3. Cinematic Vignette Gradient untuk Kontras Teks Tajam */}
            <AbsoluteFill
              style={{
                background:
                  "radial-gradient(circle at center, rgba(6,9,15,0.45) 0%, rgba(6,9,15,0.85) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Babak 1: Hook & Kurir Copy-Paste Trap (0 - 18s / 540 frames) */}
            <Sequence from={0} durationInFrames={540}>
              <SceneConcept />
            </Sequence>

            {/* Babak 2: Architecture & 4 Aturan Karpathy (18 - 42s / 720 frames) */}
            <Sequence from={540} durationInFrames={720}>
              <SceneArchitecture />
            </Sequence>

            {/* Babak 3: Live Interactive IDE & Self-Healing Terminal (42 - 75s / 990 frames) */}
            <Sequence from={1260} durationInFrames={990}>
              <SyntheticTerminalIDE />
            </Sequence>

            {/* Babak 4: High Value Mental Model & Interactive Outro (75 - 90s / 450 frames) */}
            <Sequence from={2250} durationInFrames={450}>
              <SceneOutro />
            </Sequence>
          </AbsoluteFill>
        )}
        durationInFrames={2700}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
