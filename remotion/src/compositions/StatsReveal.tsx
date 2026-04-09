/**
 * StatsReveal.tsx — Secuencia de números animados con counter
 * Optimizado para LinkedIn (1920x1080) — también soporta square y reels
 * Duración: 10 segundos (300 frames a 30fps)
 *
 * Props:
 *   stats          — array de { value, label, prefix?, suffix?, accent? }
 *   title          — título principal encima de los stats
 *   subtitle       — subtítulo / contexto
 *   format         — "youtube" | "square" | "reels"
 *   showProgression — mostrar flecha de progresión entre stats (default true)
 */

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  colors,
  fonts,
  fontWeights,
  radius,
  shadows,
  spacing,
  videoFormats,
} from "../lib/tokens";
import type { VideoFormat } from "../lib/tokens";

export interface StatItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  accent?: boolean;
}

export interface StatsRevealProps {
  stats: StatItem[];
  title?: string;
  subtitle?: string;
  format?: VideoFormat;
  showProgression?: boolean;
}

// ─── Easing personalizado ────────────────────────────────────────────────────

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// ─── Componente counter animado ──────────────────────────────────────────────

interface CounterProps {
  targetValue: number;
  prefix?: string;
  suffix?: string;
  startFrame: number;
  durationFrames: number;
  fontSize: number;
  accent?: boolean;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  targetValue,
  prefix = "",
  suffix = "",
  startFrame,
  durationFrames,
  fontSize,
  accent = false,
}) => {
  const frame = useCurrentFrame();

  const rawProgress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const progress = easeOutExpo(rawProgress);
  const currentValue = Math.round(progress * targetValue);

  // Formato con separador de miles
  const formattedValue = currentValue.toLocaleString("es-CO");

  // Opacidad al entrar
  const opacity = interpolate(frame, [startFrame, startFrame + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scale de entrada
  const scale = spring({
    frame: Math.max(0, frame - startFrame),
    fps: 30,
    config: { damping: 14, stiffness: 100, mass: 1 },
    from: 0.75,
    to: 1,
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "center",
        gap: 4,
      }}
    >
      {prefix && (
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: fontSize * 0.45,
            fontWeight: fontWeights.bold,
            color: accent ? colors.gold : colors.white,
            lineHeight: 1,
            alignSelf: "flex-start",
            paddingTop: fontSize * 0.08,
          }}
        >
          {prefix}
        </span>
      )}
      <span
        style={{
          fontFamily: fonts.display,
          fontSize,
          fontWeight: fontWeights.black,
          color: accent ? colors.gold : colors.white,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          textShadow: accent ? shadows.gold : "none",
        }}
      >
        {formattedValue}
      </span>
      {suffix && (
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: fontSize * 0.35,
            fontWeight: fontWeights.bold,
            color: accent ? colors.gold : colors.gray400,
            lineHeight: 1,
            alignSelf: "flex-end",
            paddingBottom: fontSize * 0.05,
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  );
};

// ─── Flecha de progresión ────────────────────────────────────────────────────

const ProgressionArrow: React.FC<{ opacity: number; vertical?: boolean }> = ({
  opacity,
  vertical = false,
}) => (
  <div
    style={{
      opacity,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: colors.gold,
      fontSize: vertical ? 32 : 40,
      transform: vertical ? "rotate(90deg)" : undefined,
      textShadow: shadows.goldSm,
    }}
  >
    →
  </div>
);

// ─── Composición principal ───────────────────────────────────────────────────

export const StatsReveal: React.FC<StatsRevealProps> = ({
  stats,
  title = "Resultados que hablan",
  subtitle = "Clientes UGC Colombia · 2025–2026",
  format = "youtube",
  showProgression = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const { width, height } = videoFormats[format];

  const isVertical = format === "reels";
  const isSquare = format === "square";

  // ─── Timing global ────────────────────────────────────────────────────────
  // 0-20    : Intro / fondo
  // 20-50   : Título + subtítulo
  // 50+     : Stats secuenciales (~50 frames por stat)
  // Últimos 30: CTA / logo

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Título
  const titleY = interpolate(frame, [20, 45], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtítulo
  const subtitleOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA al final
  const ctaOpacity = interpolate(
    frame,
    [durationInFrames - 40, durationInFrames - 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ─── Configuración por formato ─────────────────────────────────────────────

  const counterFontSize = isVertical ? 96 : isSquare ? 80 : 96;
  const titleFontSize = isVertical ? 36 : isSquare ? 28 : 32;
  const statLabelFontSize = isVertical ? 16 : isSquare ? 13 : 14;
  const framesPerStat = Math.floor((durationInFrames - 80 - 30) / Math.max(stats.length, 1));

  // ─── Layout ─────────────────────────────────────────────────────────────────

  const statItems = stats.map((stat, i) => {
    const statStart = 50 + i * framesPerStat;
    const statOpacity = interpolate(frame, [statStart, statStart + 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const labelOpacity = interpolate(
      frame,
      [statStart + 30, statStart + 48],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    const showArrow = showProgression && i < stats.length - 1;
    const arrowOpacity = interpolate(
      frame,
      [statStart + 20, statStart + 35],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return { stat, statStart, statOpacity, labelOpacity, showArrow, arrowOpacity };
  });

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.black,
        width,
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: bgOpacity,
      }}
    >
      {/* Fondo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 100% 60% at 50% 50%, ${colors.gray900} 0%, ${colors.black} 100%)`,
        }}
      />

      {/* Líneas decorativas horizontales */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: colors.gold,
          boxShadow: shadows.gold,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: colors.gold,
          opacity: 0.3,
        }}
      />

      {/* Contenido central */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: isVertical ? 900 : undefined,
          padding: isVertical
            ? `0 ${spacing[12]}px`
            : `0 ${spacing[16]}px`,
          gap: isVertical ? spacing[10] : spacing[8],
        }}
      >
        {/* Título */}
        <div
          style={{
            textAlign: "center" as const,
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          <h1
            style={{
              fontFamily: fonts.display,
              fontSize: titleFontSize,
              fontWeight: fontWeights.bold,
              color: colors.white,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Subtítulo */}
        <div
          style={{
            opacity: subtitleOpacity,
            fontFamily: fonts.body,
            fontSize: statLabelFontSize + 1,
            fontWeight: fontWeights.regular,
            color: colors.gray600,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            textAlign: "center" as const,
            marginTop: -spacing[4],
          }}
        >
          {subtitle}
        </div>

        {/* Stats grid / lista */}
        <div
          style={{
            display: "flex",
            flexDirection: isVertical ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: isVertical ? spacing[8] : spacing[6],
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {statItems.map(
            ({ stat, statStart, labelOpacity, showArrow, arrowOpacity }, i) => (
              <React.Fragment key={i}>
                {/* Stat card */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: spacing[3],
                    backgroundColor: stat.accent
                      ? `rgba(255,214,10,0.05)`
                      : `rgba(255,255,255,0.02)`,
                    border: `1px solid ${stat.accent ? colors.gold : colors.gray800}`,
                    borderRadius: radius.sm,
                    padding: isVertical
                      ? `${spacing[8]}px ${spacing[10]}px`
                      : `${spacing[6]}px ${spacing[10]}px`,
                    minWidth: isVertical ? 300 : 200,
                    boxShadow: stat.accent ? shadows.gold : "none",
                  }}
                >
                  <AnimatedCounter
                    targetValue={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    startFrame={statStart}
                    durationFrames={Math.min(framesPerStat - 10, 60)}
                    fontSize={counterFontSize}
                    accent={stat.accent}
                  />
                  <div
                    style={{
                      opacity: labelOpacity,
                      fontFamily: fonts.body,
                      fontSize: statLabelFontSize,
                      fontWeight: fontWeights.medium,
                      color: stat.accent ? colors.gold : colors.gray500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      textAlign: "center" as const,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>

                {/* Flecha de progresión */}
                {showArrow && (
                  <ProgressionArrow
                    opacity={arrowOpacity}
                    vertical={isVertical}
                  />
                )}
              </React.Fragment>
            )
          )}
        </div>
      </div>

      {/* CTA / Handle */}
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? 96 : 40,
          opacity: ctaOpacity,
          display: "flex",
          alignItems: "center",
          gap: spacing[4],
        }}
      >
        <div
          style={{
            height: 1,
            width: 48,
            backgroundColor: colors.gold,
            opacity: 0.5,
          }}
        />
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: isVertical ? 16 : 14,
            fontWeight: fontWeights.medium,
            color: colors.gray500,
            letterSpacing: "0.08em",
          }}
        >
          @agenciaugccolombia
        </span>
        <div
          style={{
            height: 1,
            width: 48,
            backgroundColor: colors.gold,
            opacity: 0.5,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
