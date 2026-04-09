/**
 * LogoReveal.tsx — Intro brandeada UGC Colombia
 * Duración: 3 segundos (90 frames a 30fps)
 * Formatos: reels (1080x1920), youtube (1920x1080), square (1080x1080)
 *
 * Props:
 *   format         — "reels" | "youtube" | "square"
 *   tagline        — texto bajo el logo (default: "Contenido que convierte.")
 *   showTagline    — mostrar tagline (default: true)
 */

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, fontWeights, shadows, videoFormats } from "../lib/tokens";
import type { VideoFormat } from "../lib/tokens";

export interface LogoRevealProps {
  format?: VideoFormat;
  tagline?: string;
  showTagline?: boolean;
}

export const LogoReveal: React.FC<LogoRevealProps> = ({
  format = "reels",
  tagline = "Contenido que convierte.",
  showTagline = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { width, height } = videoFormats[format];

  // ─── Animaciones ────────────────────────────────────────────────────────────

  // Línea dorada superior: entra desde izquierda
  const lineProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 120, mass: 0.8 },
  });

  // Logo principal: escala desde 0.7 con spring
  const logoScale = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { damping: 14, stiffness: 90, mass: 1 },
    from: 0.7,
    to: 1,
  });

  const logoOpacity = interpolate(frame, [6, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "UGC" sube desde abajo
  const ugcTranslateY = interpolate(frame, [10, 22], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "COLOMBIA" entra desde derecha
  const colombiaTranslateX = interpolate(frame, [14, 26], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline: fade in suave al final
  const taglineOpacity = interpolate(frame, [52, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow dorado en el logo
  const glowOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ─── Tamaños responsivos según formato ──────────────────────────────────────

  const isVertical = format === "reels";
  const isSquare = format === "square";

  const ugcFontSize = isVertical ? 120 : isSquare ? 96 : 88;
  const colombiaFontSize = isVertical ? 38 : isSquare ? 30 : 26;
  const taglineFontSize = isVertical ? 22 : isSquare ? 18 : 16;
  const lineWidth = isVertical ? 280 : isSquare ? 240 : 320;
  const lineHeight = 3;

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.black,
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Fondo: gradiente sutil */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${colors.gray900} 0%, ${colors.black} 100%)`,
        }}
      />

      {/* Línea dorada izquierda */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: `${lineProgress * lineWidth}px`,
          height: lineHeight,
          backgroundColor: colors.gold,
          transform: "translateY(-50%)",
          boxShadow: shadows.gold,
        }}
      />

      {/* Línea dorada derecha */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          width: `${lineProgress * lineWidth}px`,
          height: lineHeight,
          backgroundColor: colors.gold,
          transform: "translateY(-50%)",
          boxShadow: shadows.gold,
        }}
      />

      {/* Logo container */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        {/* Glow dorado de fondo */}
        <div
          style={{
            position: "absolute",
            width: ugcFontSize * 3,
            height: ugcFontSize * 1.5,
            background: `radial-gradient(ellipse, rgba(255,214,10,${glowOpacity * 0.12}) 0%, transparent 70%)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />

        {/* "UGC" — display serif bold */}
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: ugcFontSize,
            fontWeight: fontWeights.black,
            color: colors.white,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            transform: `translateY(${ugcTranslateY}px)`,
            textShadow: `0 0 40px rgba(255,214,10,${glowOpacity * 0.3})`,
          }}
        >
          UGC
        </div>

        {/* Línea divisora dorada */}
        <div
          style={{
            width: `${lineProgress * 100}%`,
            maxWidth: ugcFontSize * 2.8,
            height: 2,
            backgroundColor: colors.gold,
            marginTop: 8,
            marginBottom: 10,
            boxShadow: shadows.goldSm,
          }}
        />

        {/* "COLOMBIA" — body sans, tracking wide */}
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: colombiaFontSize,
            fontWeight: fontWeights.medium,
            color: colors.gold,
            letterSpacing: "0.25em",
            transform: `translateX(${colombiaTranslateX}px)`,
          }}
        >
          COLOMBIA
        </div>
      </div>

      {/* Tagline */}
      {showTagline && (
        <div
          style={{
            position: "absolute",
            bottom: isVertical ? 180 : 80,
            opacity: taglineOpacity,
            fontFamily: fonts.body,
            fontSize: taglineFontSize,
            fontWeight: fontWeights.regular,
            color: colors.gray400,
            letterSpacing: "0.08em",
            textAlign: "center",
          }}
        >
          {tagline}
        </div>
      )}

      {/* Handle @agenciaugccolombia — esquina inferior */}
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? 80 : 32,
          opacity: taglineOpacity * 0.6,
          fontFamily: fonts.body,
          fontSize: isVertical ? 14 : 11,
          fontWeight: fontWeights.medium,
          color: colors.gray600,
          letterSpacing: "0.05em",
        }}
      >
        @agenciaugccolombia
      </div>
    </AbsoluteFill>
  );
};
