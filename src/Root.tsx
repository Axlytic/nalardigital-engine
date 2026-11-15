import React from "react";
import { Composition, Sequence, Audio, staticFile, AbsoluteFill } from "remotion";
import { BridgeShort, BRIDGE_FRAMES } from "./3d/Bridge";
import { SceneConcept } from "./scenes/SceneConcept";
import { SyntheticTerminalIDE } from "./scenes/SyntheticTerminalIDE";
import { SceneOutro } from "./scenes/SceneOutro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. Komposisi 3D Asli dari Engine cartoon-3d-short (The Bridge Short) */}
      <Composition
        id="Cartoon3DShort"
        component={BridgeShort}
        durationInFrames={BRIDGE_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 2. Komposisi NalarDigital01 dengan Three.js 3D Toon Living World + UI HUD */}
      <Composition
        id="NalarDigital01"
        component={() => (
          <AbsoluteFill style={{ backgroundColor: "#06090f" }}>
            {/* Audio Voice-Over */}
            <Audio src={staticFile("voice_over_90s.mp3")} />

            {/* 3D Toon World Living Background */}
            <AbsoluteFill style={{ opacity: 0.82 }}>
              <BridgeShort />
            </AbsoluteFill>

            {/* Cinematic Gradient Vignette untuk kontras teks optimal */}
            <AbsoluteFill
              style={{
                background:
                  "radial-gradient(circle at center, rgba(6,9,15,0.35) 0%, rgba(6,9,15,0.78) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Act 1: Hook & Concept (0 - 45s / 1350 frames) */}
            <Sequence from={0} durationInFrames={1350}>
              <SceneConcept />
            </Sequence>

            {/* Act 2: Autonomous Harness Live Terminal & IDE (45 - 75s / 900 frames) */}
            <Sequence from={1350} durationInFrames={900}>
              <SyntheticTerminalIDE />
            </Sequence>

            {/* Act 3: Golden Outro & CTA (75 - 90s / 450 frames) */}
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
