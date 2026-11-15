import React from "react";
import { Composition, Sequence, Audio, staticFile, AbsoluteFill } from "remotion";

// Import Scene Video 01 (Autonomous Agent Harness)
import { TechBackground } from "./3d/TechBackground";
import { SceneConcept } from "./scenes/SceneConcept";
import { SceneArchitecture } from "./scenes/SceneArchitecture";
import { SyntheticTerminalIDE } from "./scenes/SyntheticTerminalIDE";
import { SceneOutro } from "./scenes/SceneOutro";

// Import Scene Video 02 (Subsea Internet Cables - Motion 3D)
import { SubseaGlobeScene } from "./3d/SubseaGlobeScene";
import { CableCrossSectionScene } from "./3d/CableCrossSectionScene";
import { DeepSeaAbyssScene } from "./3d/DeepSeaAbyssScene";
import { SubseaOutroScene } from "./3d/SubseaOutroScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ========================================================
          VIDEO 01: Autonomous Agent Harness (90s / 2700 frames)
          ======================================================== */}
      <Composition
        id="NalarDigital01"
        component={() => (
          <AbsoluteFill style={{ backgroundColor: "#06090f" }}>
            <AbsoluteFill style={{ opacity: 0.65 }}>
              <TechBackground />
            </AbsoluteFill>
            <Audio src={staticFile("voice_over_90s.mp3")} />
            <AbsoluteFill
              style={{
                background:
                  "radial-gradient(circle at center, rgba(6,9,15,0.45) 0%, rgba(6,9,15,0.85) 100%)",
                pointerEvents: "none",
              }}
            />
            <Sequence from={0} durationInFrames={540}>
              <SceneConcept />
            </Sequence>
            <Sequence from={540} durationInFrames={720}>
              <SceneArchitecture />
            </Sequence>
            <Sequence from={1260} durationInFrames={990}>
              <SyntheticTerminalIDE />
            </Sequence>
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

      {/* ========================================================
          VIDEO 02: Jalur Kabel Bawah Laut Internet (42s / 1260 frames)
          Style: 3D Motion Graphic ala @ginaroyoga / @Thehistoryofall_eng
          ======================================================== */}
      <Composition
        id="NalarDigital02"
        component={() => (
          <AbsoluteFill style={{ backgroundColor: "#020617" }}>
            {/* Audio Voice-Over Neural */}
            <Audio src={staticFile("voice_over_kabel_laut.mp3")} />

            {/* Babak 1: Mitos Satelit vs Realita Samudra (0 - 11s / 330 frames) */}
            <Sequence from={0} durationInFrames={330}>
              <SubseaGlobeScene />
            </Sequence>

            {/* Babak 2: Anatomi 3D Kabel Seukuran Selang Taman (11 - 23s / 360 frames) */}
            <Sequence from={330} durationInFrames={360}>
              <CableCrossSectionScene />
            </Sequence>

            {/* Babak 3: Tekanan 8000m, Gigitan Hiu & Robot ROV (23 - 35s / 360 frames) */}
            <Sequence from={690} durationInFrames={360}>
              <DeepSeaAbyssScene />
            </Sequence>

            {/* Babak 4: Mental Model & Brand Outro (35 - 42s / 210 frames) */}
            <Sequence from={1050} durationInFrames={210}>
              <SubseaOutroScene />
            </Sequence>
          </AbsoluteFill>
        )}
        durationInFrames={1260}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
