/**
 * ScriptedReelTemplate.tsx — Template de Reel con guion + audio ElevenLabs
 * Duración: dinámica según durationSec del script
 * Formato: 1080x1920 (Reels / TikTok / Shorts)
 *
 * Props:
 *   script         — objeto ReelScript del archivo data/scripts.ts
 *   audioSrc       — ruta al archivo de audio (ej. "/audio/ep1-voiceover.mp3")
 *   showCaptions   — mostrar subtítulos del scene overlay (default: true)
 *   showHandle     — mostrar @handle en pantalla (default: true)
 *   accentColor    — color de acento (default: gold del brand)
 *
 * Estructura de timing:
 *   - 0-90f (3s)   : LogoReveal integrado
 *   - 90f+         : Escenas del guion, sincronizadas con audio
 *   - Último 5s    : CTA card
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, fontWeights, radius, shadows, spacing } from "../lib/tokens";
import type { ReelScript, Scene } from "../data/scripts";

export interface ScriptedReelTemplateProps {
  script: ReelScript;
  audioSrc: string;
  showCaptions?: boolean;
  showHandle?: boolean;
  accentColor?: string;
}

// ─── Constantes ──────────────────────────────────────────────────────────────

const INTRO_FRAMES = 90;   // 3s logo reveal integrado
const CTA_FRAMES = 90;     // 3s CTA al final
const FPS = 30;

// ─── Hook type → paleta visual ───────────────────────────────────────────────

function getHookAccent(hookType: ReelScript["hookType"]): string {
  const map: Record<ReelScript["hookType"], string> = {
    pain: colors.red,
    curiosity: colors.gold,
    direct: colors.white,
    controversial: colors.red,
    resultado: colors.gold,
    transformacion: colors.gold,
    historia: colors.cream,
  };
  return map[hookType];
}

// ─── Mini LogoReveal inline ──────────────────────────────────────────────────

const InlineLogoReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const lineProgress = spring({
    frame,
    fps: FPS,
    config: { damping: 20, stiffness: 120, mass: 0.8 },
  });

  const logoOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = spring({
    frame: Math.max(0, frame - 8),
    fps: FPS,
    config: { damping: 14, stiffness: 90, mass: 1 },
    from: 0.7,
    to: 1,
  });

  const fadeOut = interpolate(frame, [60, 85], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.black,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${colors.gray900} 0%, ${colors.black} 100%)`,
        }}
      />

      {/* Líneas laterales */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: `${lineProgress * 240}px`,
          height: 3,
          backgroundColor: colors.gold,
          transform: "translateY(-50%)",
          boxShadow: shadows.gold,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          width: `${lineProgress * 240}px`,
          height: 3,
          backgroundColor: colors.gold,
          transform: "translateY(-50%)",
          boxShadow: shadows.gold,
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: fonts.display,
            fontSize: 100,
            fontWeight: fontWeights.black,
            color: colors.white,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
          }}
        >
          UGC
        </span>
        <div
          style={{
            width: `${lineProgress * 280}px`,
            height: 2,
            backgroundColor: colors.gold,
            marginTop: 8,
            marginBottom: 10,
            boxShadow: shadows.goldSm,
          }}
        />
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: 32,
            fontWeight: fontWeights.medium,
            color: colors.gold,
            letterSpacing: "0.22em",
          }}
        >
          COLOMBIA
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene overlay ───────────────────────────────────────────────────────────

interface SceneOverlayProps {
  scene: Scene;
  sceneFrameStart: number;
  sceneFrameEnd: number;
  hookType: ReelScript["hookType"];
  accentColor: string;
}

const SceneOverlay: React.FC<SceneOverlayProps> = ({
  scene,
  sceneFrameStart,
  sceneFrameEnd,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const sceneDuration = sceneFrameEnd - sceneFrameStart;

  // Entrada del texto
  const textOpacity = interpolate(
    frame,
    [sceneFrameStart + 4, sceneFrameStart + 16],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const textY = interpolate(
    frame,
    [sceneFrameStart + 4, sceneFrameStart + 16],
    [16, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Salida del texto al final de la escena
  const textFade = interpolate(
    frame,
    [sceneFrameEnd - 8, sceneFrameEnd],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (!scene.overlayText) return null;

  // Separar líneas del overlay text
  const lines = scene.overlayText.split("\n");
  const isHeroLine = lines.length === 1 && lines[0].length < 40;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 280,
        left: 80,
        right: 80,
        opacity: textOpacity * textFade,
        transform: `translateY(${textY}px)`,
      }}
    >
      {/* Barra de progreso de la escena */}
      <div
        style={{
          position: "absolute",
          bottom: -20,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: colors.gray800,
          borderRadius: radius.full,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${interpolate(
              frame,
              [sceneFrameStart, sceneFrameEnd],
              [0, 100],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}%`,
            backgroundColor: accentColor,
            borderRadius: radius.full,
            boxShadow: `0 0 6px ${accentColor}`,
            transition: "none",
          }}
        />
      </div>

      {/* Texto overlay */}
      <div
        style={{
          backgroundColor: "rgba(10,10,10,0.82)",
          backdropFilter: "blur(8px)",
          borderRadius: radius.sm,
          borderLeft: `3px solid ${accentColor}`,
          padding: isHeroLine
            ? `${spacing[5]}px ${spacing[6]}px`
            : `${spacing[4]}px ${spacing[6]}px`,
        }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: i === 0 && isHeroLine ? fonts.display : fonts.body,
              fontSize: i === 0 && isHeroLine ? 36 : 22,
              fontWeight:
                i === 0 ? fontWeights.bold : fontWeights.regular,
              color:
                i === 0
                  ? colors.white
                  : colors.gray400,
              lineHeight: 1.3,
              letterSpacing: i === 0 ? "-0.01em" : "0em",
              marginBottom: i < lines.length - 1 ? spacing[2] : 0,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Hook visual de entrada (primeros 3 segundos del contenido) ───────────────

interface HookBannerProps {
  hookText: string;
  accentColor: string;
}

const HookBanner: React.FC<HookBannerProps> = ({ hookText, accentColor }) => {
  const frame = useCurrentFrame();

  const scale = spring({
    frame,
    fps: FPS,
    config: { damping: 12, stiffness: 90, mass: 1.1 },
    from: 0.85,
    to: 1,
  });

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [65, 85], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 180,
        left: 80,
        right: 80,
        opacity: opacity * fadeOut,
        transform: `scale(${scale})`,
      }}
    >
      {/* Overline */}
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 11,
          fontWeight: fontWeights.medium,
          color: accentColor,
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          marginBottom: spacing[3],
        }}
      >
        @agenciaugccolombia
      </div>

      {/* Hook text */}
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 46,
          fontWeight: fontWeights.black,
          color: colors.white,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          textShadow: "0 2px 20px rgba(0,0,0,0.8)",
        }}
      >
        {hookText}
      </div>
    </div>
  );
};

// ─── CTA card final ───────────────────────────────────────────────────────────

interface CTACardProps {
  ctaText: string;
  accentColor: string;
}

const CTACard: React.FC<CTACardProps> = ({ ctaText, accentColor }) => {
  const frame = useCurrentFrame();

  const cardScale = spring({
    frame,
    fps: FPS,
    config: { damping: 14, stiffness: 100, mass: 1 },
    from: 0.8,
    to: 1,
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulso del borde
  const glow = interpolate(frame, [0, 45, 90], [0.3, 0.9, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.black,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${colors.gray900} 0%, ${colors.black} 100%)`,
        }}
      />

      <div
        style={{
          transform: `scale(${cardScale})`,
          width: 800,
          backgroundColor: colors.gray900,
          borderRadius: radius.sm,
          border: `2px solid ${accentColor}`,
          padding: `${spacing[12]}px ${spacing[10]}px`,
          textAlign: "center" as const,
          boxShadow: `0 0 ${30 + glow * 30}px rgba(255,214,10,${glow * 0.3})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: spacing[6],
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 56,
            fontWeight: fontWeights.black,
            color: colors.white,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
          }}
        >
          UGC
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 18,
            fontWeight: fontWeights.medium,
            color: accentColor,
            letterSpacing: "0.18em",
          }}
        >
          COLOMBIA
        </div>

        {/* Divisor */}
        <div
          style={{
            width: 80,
            height: 2,
            backgroundColor: accentColor,
            boxShadow: shadows.goldSm,
          }}
        />

        {/* CTA text */}
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 22,
            fontWeight: fontWeights.regular,
            color: colors.white,
            lineHeight: 1.4,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {ctaText}
        </p>

        {/* Handle */}
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 18,
            fontWeight: fontWeights.bold,
            color: accentColor,
            letterSpacing: "0.04em",
          }}
        >
          @agenciaugccolombia
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Composición principal ───────────────────────────────────────────────────

export const ScriptedReelTemplate: React.FC<ScriptedReelTemplateProps> = ({
  script,
  audioSrc,
  showCaptions = true,
  showHandle = true,
  accentColor,
}) => {
  const { durationInFrames } = useVideoConfig();

  const hookAccent = accentColor ?? getHookAccent(script.hookType);
  const contentFrames = durationInFrames - INTRO_FRAMES - CTA_FRAMES;

  // Calcular frame start/end por escena dentro del segmento de contenido
  const totalSceneSec = script.scenes.reduce(
    (acc, s) => Math.max(acc, s.endSec),
    0
  );

  const sceneWithFrames = script.scenes.map((scene) => {
    const sceneStart =
      INTRO_FRAMES +
      Math.round((scene.startSec / totalSceneSec) * contentFrames);
    const sceneEnd =
      INTRO_FRAMES +
      Math.round((scene.endSec / totalSceneSec) * contentFrames);
    return { scene, sceneStart, sceneEnd };
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.black,
        width: 1080,
        height: 1920,
        overflow: "hidden",
      }}
    >
      {/* Audio ElevenLabs — comienza con el contenido, después del logo */}
      <Sequence from={INTRO_FRAMES}>
        <Audio src={audioSrc} />
      </Sequence>

      {/* ─── INTRO: Logo Reveal (0-90f) ─── */}
      <Sequence from={0} durationInFrames={INTRO_FRAMES}>
        <InlineLogoReveal />
      </Sequence>

      {/* ─── CONTENIDO: fondo permanente ─── */}
      <Sequence from={INTRO_FRAMES} durationInFrames={contentFrames}>
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${colors.gray900} 0%, ${colors.black} 100%)`,
          }}
        />
      </Sequence>

      {/* ─── Hook banner (primeros 3s del contenido) ─── */}
      <Sequence from={INTRO_FRAMES} durationInFrames={90}>
        <AbsoluteFill>
          <HookBanner hookText={script.hook} accentColor={hookAccent} />
        </AbsoluteFill>
      </Sequence>

      {/* ─── Escenas del guion ─── */}
      {showCaptions &&
        sceneWithFrames.map(({ scene, sceneStart, sceneEnd }, i) => (
          <Sequence
            key={i}
            from={sceneStart}
            durationInFrames={sceneEnd - sceneStart}
          >
            <AbsoluteFill>
              <SceneOverlay
                scene={scene}
                sceneFrameStart={sceneStart}
                sceneFrameEnd={sceneEnd}
                hookType={script.hookType}
                accentColor={hookAccent}
              />
            </AbsoluteFill>
          </Sequence>
        ))}

      {/* ─── Handle persistente ─── */}
      {showHandle && (
        <Sequence from={INTRO_FRAMES} durationInFrames={contentFrames}>
          <HandleBadge />
        </Sequence>
      )}

      {/* ─── CTA card (últimos 3s) ─── */}
      <Sequence
        from={durationInFrames - CTA_FRAMES}
        durationInFrames={CTA_FRAMES}
      >
        <CTACard ctaText={script.cta} accentColor={hookAccent} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ─── Handle badge (esquina superior) ─────────────────────────────────────────

const HandleBadge: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        right: 80,
        opacity,
        backgroundColor: "rgba(10,10,10,0.7)",
        backdropFilter: "blur(8px)",
        borderRadius: radius.full,
        border: `1px solid ${colors.gray700}`,
        padding: `${spacing[2]}px ${spacing[4]}px`,
        display: "flex",
        alignItems: "center",
        gap: spacing[2],
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: radius.full,
          backgroundColor: colors.gold,
          boxShadow: shadows.goldSm,
        }}
      />
      <span
        style={{
          fontFamily: fonts.body,
          fontSize: 13,
          fontWeight: fontWeights.medium,
          color: colors.white,
          letterSpacing: "0.03em",
        }}
      >
        @agenciaugccolombia
      </span>
    </div>
  );
};
