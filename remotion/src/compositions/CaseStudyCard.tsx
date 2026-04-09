/**
 * CaseStudyCard.tsx — Tarjeta animada de caso de estudio
 * Duración: 15 segundos (450 frames a 30fps)
 * Formato: 1080x1920 (Reels / TikTok / Shorts)
 *
 * Props:
 *   client        — nombre del cliente (ej. "Suplementos Andina")
 *   industry      — industria (ej. "Suplementos deportivos")
 *   metricBefore  — valor antes (ej. "1.1x")
 *   metricAfter   — valor después (ej. "4.2x")
 *   metricLabel   — etiqueta de métrica (ej. "ROAS")
 *   roasMultiplier — multiplicador (ej. "3.8x más")
 *   daysToResult  — días al resultado (ej. "21 días")
 *   budgetSpent   — inversión UGC (ej. "$800")
 *   revenueGen    — revenue generado (ej. "$12,000")
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
} from "../lib/tokens";

export interface CaseStudyCardProps {
  client: string;
  industry: string;
  metricBefore: string;
  metricAfter: string;
  metricLabel: string;
  roasMultiplier: string;
  daysToResult: string;
  budgetSpent: string;
  revenueGen: string;
}

// ─── Componente interno: número animado con counter ──────────────────────────

interface AnimatedStatProps {
  value: string;
  label: string;
  accent?: boolean;
  delay?: number;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({
  value,
  label,
  accent = false,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 12, stiffness: 100, mass: 1 },
    from: 0.5,
    to: 1,
  });

  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: spacing[1],
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <span
        style={{
          fontFamily: fonts.display,
          fontSize: 56,
          fontWeight: fontWeights.black,
          color: accent ? colors.gold : colors.white,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          textShadow: accent ? shadows.gold : "none",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: fonts.body,
          fontSize: 13,
          fontWeight: fontWeights.medium,
          color: colors.gray500,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
        }}
      >
        {label}
      </span>
    </div>
  );
};

// ─── Barra de progreso animada ───────────────────────────────────────────────

interface ProgressBarProps {
  fromValue: number;
  toValue: number;
  max: number;
  delay: number;
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  fromValue,
  toValue,
  max,
  delay,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beforeProgress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 18, stiffness: 80, mass: 1 },
    from: 0,
    to: fromValue / max,
  });

  const afterProgress = spring({
    frame: Math.max(0, frame - delay - 20),
    fps,
    config: { damping: 14, stiffness: 70, mass: 1.1 },
    from: fromValue / max,
    to: toValue / max,
  });

  const barWidth = 540;

  return (
    <div style={{ width: barWidth }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: spacing[2],
        }}
      >
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: 12,
            color: colors.gray500,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}
        >
          {label}
        </span>
      </div>

      {/* Barra "antes" */}
      <div
        style={{
          position: "relative",
          height: 8,
          backgroundColor: colors.gray800,
          borderRadius: radius.full,
          marginBottom: spacing[2],
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${beforeProgress * 100}%`,
            backgroundColor: colors.gray600,
            borderRadius: radius.full,
          }}
        />
      </div>

      {/* Barra "después" con dorado */}
      <div
        style={{
          position: "relative",
          height: 8,
          backgroundColor: colors.gray800,
          borderRadius: radius.full,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${afterProgress * 100}%`,
            background: `linear-gradient(90deg, ${colors.gold} 0%, #FFE55C 100%)`,
            borderRadius: radius.full,
            boxShadow: shadows.goldSm,
          }}
        />
      </div>
    </div>
  );
};

// ─── Composición principal ───────────────────────────────────────────────────

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  client,
  industry,
  metricBefore,
  metricAfter,
  metricLabel,
  roasMultiplier,
  daysToResult,
  budgetSpent,
  revenueGen,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ─── Timings (en frames, @30fps) ──────────────────────────────────────────
  // 0-15   : Logo reveal / intro
  // 15-60  : Card entrada + cliente info
  // 60-150 : Métrica "antes" aparece
  // 150-240: Métrica "después" con animación dorada
  // 240-330: Stats ROI (budget, revenue, días)
  // 330-390: ROAS multiplier — hero stat
  // 390-450: CTA + handle

  // Card entrada
  const cardSlide = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 18, stiffness: 100, mass: 1 },
    from: 80,
    to: 0,
  });

  const cardOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Header info del cliente
  const headerOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sección "antes"
  const beforeOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sección "después"
  const afterScale = spring({
    frame: Math.max(0, frame - 150),
    fps,
    config: { damping: 10, stiffness: 80, mass: 1.2 },
    from: 0.6,
    to: 1,
  });

  const afterOpacity = interpolate(frame, [150, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ROI stats
  const statsOpacity = interpolate(frame, [240, 265], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Multiplier hero
  const multiplierScale = spring({
    frame: Math.max(0, frame - 330),
    fps,
    config: { damping: 8, stiffness: 70, mass: 1.3 },
    from: 0,
    to: 1,
  });

  const multiplierOpacity = interpolate(frame, [330, 355], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA
  const ctaOpacity = interpolate(frame, [390, 415], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Extraer valores numéricos para las barras
  const parseMetric = (val: string): number => {
    const n = parseFloat(val.replace(/[^0-9.]/g, ""));
    return isNaN(n) ? 1 : n;
  };

  const beforeNum = parseMetric(metricBefore);
  const afterNum = parseMetric(metricAfter);
  const barMax = afterNum * 1.2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.black,
        width: 1080,
        height: 1920,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Fondo: gradiente editorial */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 50% at 50% 30%, ${colors.gray900} 0%, ${colors.black} 100%)`,
        }}
      />

      {/* Acento dorado superior */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: colors.gold,
          boxShadow: shadows.gold,
        }}
      />

      {/* Card principal */}
      <div
        style={{
          position: "relative",
          width: 864,
          backgroundColor: colors.gray900,
          borderRadius: radius.sm,
          border: `1px solid ${colors.gray700}`,
          padding: `${spacing[10]}px ${spacing[10]}px`,
          transform: `translateY(${cardSlide}px)`,
          opacity: cardOpacity,
          boxShadow: shadows.xl,
        }}
      >
        {/* Línea lateral dorada */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: spacing[8],
            bottom: spacing[8],
            width: 3,
            backgroundColor: colors.gold,
            boxShadow: shadows.goldSm,
          }}
        />

        {/* Header: cliente + industria */}
        <div
          style={{
            opacity: headerOpacity,
            marginBottom: spacing[10],
          }}
        >
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 11,
              fontWeight: fontWeights.medium,
              color: colors.gold,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              marginBottom: spacing[2],
            }}
          >
            Caso de éxito
          </div>
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: 36,
              fontWeight: fontWeights.bold,
              color: colors.white,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {client}
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 15,
              fontWeight: fontWeights.regular,
              color: colors.gray500,
              marginTop: spacing[2],
            }}
          >
            {industry}
          </div>
        </div>

        {/* Divisor */}
        <div
          style={{
            height: 1,
            backgroundColor: colors.gray800,
            marginBottom: spacing[10],
            opacity: headerOpacity,
          }}
        />

        {/* Métrica ANTES */}
        <div
          style={{
            opacity: beforeOpacity,
            marginBottom: spacing[6],
          }}
        >
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 11,
              fontWeight: fontWeights.medium,
              color: colors.gray600,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              marginBottom: spacing[3],
            }}
          >
            Antes
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: spacing[3],
            }}
          >
            <span
              style={{
                fontFamily: fonts.display,
                fontSize: 72,
                fontWeight: fontWeights.black,
                color: colors.gray600,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              {metricBefore}
            </span>
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 16,
                color: colors.gray600,
                letterSpacing: "0.05em",
              }}
            >
              {metricLabel}
            </span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div style={{ opacity: beforeOpacity, marginBottom: spacing[8] }}>
          <ProgressBar
            fromValue={beforeNum}
            toValue={afterNum}
            max={barMax}
            delay={60}
            label={metricLabel}
          />
        </div>

        {/* Métrica DESPUÉS */}
        <div
          style={{
            opacity: afterOpacity,
            transform: `scale(${afterScale})`,
            transformOrigin: "left center",
            marginBottom: spacing[10],
          }}
        >
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 11,
              fontWeight: fontWeights.medium,
              color: colors.gold,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              marginBottom: spacing[3],
            }}
          >
            Después
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: spacing[3],
            }}
          >
            <span
              style={{
                fontFamily: fonts.display,
                fontSize: 96,
                fontWeight: fontWeights.black,
                color: colors.gold,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                textShadow: shadows.gold,
              }}
            >
              {metricAfter}
            </span>
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 20,
                color: colors.gold,
                letterSpacing: "0.05em",
              }}
            >
              {metricLabel}
            </span>
          </div>
        </div>

        {/* Divisor */}
        <div
          style={{
            height: 1,
            backgroundColor: colors.gray800,
            marginBottom: spacing[10],
            opacity: statsOpacity,
          }}
        />

        {/* ROI Stats: budget, revenue, días */}
        <div
          style={{
            opacity: statsOpacity,
            display: "flex",
            justifyContent: "space-between",
            marginBottom: spacing[10],
          }}
        >
          <AnimatedStat
            value={budgetSpent}
            label="Inversión UGC"
            delay={240}
          />
          <div
            style={{
              width: 1,
              backgroundColor: colors.gray700,
              alignSelf: "stretch",
            }}
          />
          <AnimatedStat
            value={revenueGen}
            label="Revenue"
            accent
            delay={255}
          />
          <div
            style={{
              width: 1,
              backgroundColor: colors.gray700,
              alignSelf: "stretch",
            }}
          />
          <AnimatedStat
            value={daysToResult}
            label="Tiempo"
            delay={270}
          />
        </div>

        {/* ROAS Multiplier — hero stat */}
        <div
          style={{
            opacity: multiplierOpacity,
            transform: `scale(${multiplierScale})`,
            backgroundColor: colors.black,
            borderRadius: radius.sm,
            border: `1px solid ${colors.gold}`,
            padding: `${spacing[6]}px ${spacing[8]}px`,
            textAlign: "center" as const,
            boxShadow: shadows.gold,
          }}
        >
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 11,
              fontWeight: fontWeights.medium,
              color: colors.gray500,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              marginBottom: spacing[2],
            }}
          >
            Multiplicador de resultado
          </div>
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: 80,
              fontWeight: fontWeights.black,
              color: colors.gold,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              textShadow: `${shadows.gold}, 0 0 60px rgba(255,214,10,0.4)`,
            }}
          >
            {roasMultiplier}
          </div>
        </div>
      </div>

      {/* CTA + Handle */}
      <div
        style={{
          position: "absolute",
          bottom: 96,
          opacity: ctaOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: spacing[2],
        }}
      >
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 15,
            fontWeight: fontWeights.medium,
            color: colors.gray400,
            letterSpacing: "0.05em",
          }}
        >
          ¿Quieres resultados así?
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 18,
            fontWeight: fontWeights.bold,
            color: colors.gold,
            letterSpacing: "0.02em",
          }}
        >
          @agenciaugccolombia → Bio
        </div>
      </div>
    </AbsoluteFill>
  );
};
