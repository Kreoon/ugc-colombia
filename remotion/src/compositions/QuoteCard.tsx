/**
 * QuoteCard.tsx — Testimonial card premium
 * Duración: 8 segundos (240 frames a 30fps)
 * Formato: 1080x1920 (Reels / TikTok / Shorts)
 *
 * Props:
 *   quote         — texto del testimonial
 *   authorName    — nombre del autor
 *   authorRole    — cargo / rol del autor
 *   company       — empresa
 *   avatarUrl     — URL de foto (opcional, usa placeholder si no se pasa)
 *   resultStat    — resultado clave (ej. "ROAS 4.2x")
 *   resultLabel   — etiqueta del resultado (ej. "en 21 días")
 *   rating        — estrellas (1-5, default 5)
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
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

export interface QuoteCardProps {
  quote: string;
  authorName: string;
  authorRole: string;
  company: string;
  avatarUrl?: string;
  resultStat?: string;
  resultLabel?: string;
  rating?: number;
}

// ─── Comillas decorativas ────────────────────────────────────────────────────

const QuoteMark: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      fontFamily: fonts.display,
      fontSize: 160,
      fontWeight: fontWeights.black,
      color: colors.gold,
      lineHeight: 0.8,
      opacity: opacity * 0.15,
      position: "absolute",
      top: -20,
      left: -8,
      userSelect: "none" as const,
      pointerEvents: "none",
    }}
  >
    "
  </div>
);

// ─── Estrellas de rating ─────────────────────────────────────────────────────

const StarRating: React.FC<{ rating: number; opacity: number }> = ({
  rating,
  opacity,
}) => (
  <div
    style={{
      display: "flex",
      gap: spacing[1],
      opacity,
    }}
  >
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        style={{
          fontSize: 24,
          color: star <= rating ? colors.gold : colors.gray700,
          textShadow: star <= rating ? shadows.goldSm : "none",
        }}
      >
        ★
      </span>
    ))}
  </div>
);

// ─── Avatar placeholder ──────────────────────────────────────────────────────

const AvatarPlaceholder: React.FC<{
  name: string;
  size: number;
}> = ({ name, size }) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius.full,
        backgroundColor: colors.gray800,
        border: `2px solid ${colors.gold}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: shadows.goldSm,
      }}
    >
      <span
        style={{
          fontFamily: fonts.display,
          fontSize: size * 0.36,
          fontWeight: fontWeights.bold,
          color: colors.gold,
          letterSpacing: "-0.02em",
        }}
      >
        {initials}
      </span>
    </div>
  );
};

// ─── Composición principal ───────────────────────────────────────────────────

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  authorName,
  authorRole,
  company,
  avatarUrl,
  resultStat,
  resultLabel,
  rating = 5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ─── Timings (frames @30fps, total 240) ───────────────────────────────────
  // 0-20   : Fondo y marco entran
  // 20-50  : Comillas + estrellas
  // 50-100 : Quote aparece palabra por palabra (fade)
  // 100-145: Autor + avatar
  // 145-185: Result stat (si existe)
  // 185-210: CTA handle
  // 210-240: Hold final

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card entra desde abajo
  const cardY = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 20, stiffness: 110, mass: 0.9 },
    from: 60,
    to: 0,
  });

  const starsOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Quote: fade in con ligero slide up
  const quoteOpacity = interpolate(frame, [50, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const quoteY = interpolate(frame, [50, 90], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Autor
  const authorOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const authorX = interpolate(frame, [100, 130], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Result stat
  const statScale = spring({
    frame: Math.max(0, frame - 145),
    fps,
    config: { damping: 12, stiffness: 90, mass: 1.1 },
    from: 0.7,
    to: 1,
  });

  const statOpacity = interpolate(frame, [145, 168], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA
  const ctaOpacity = interpolate(frame, [185, 205], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulso sutil en el borde dorado
  const borderGlow = interpolate(
    frame,
    [0, 60, 120, 180, 240],
    [0.3, 0.7, 0.3, 0.7, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

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
        opacity: bgOpacity,
      }}
    >
      {/* Fondo texturizado */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 50% at 50% 40%, ${colors.gray900} 0%, ${colors.black} 100%)
          `,
        }}
      />

      {/* Partícula dorada superior */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 3,
          backgroundColor: colors.gold,
          boxShadow: `0 0 ${20 + borderGlow * 20}px rgba(255,214,10,${0.4 + borderGlow * 0.3})`,
        }}
      />

      {/* Card principal */}
      <div
        style={{
          position: "relative",
          width: 864,
          backgroundColor: colors.gray900,
          borderRadius: radius.sm,
          border: `1px solid rgba(255,214,10,${0.2 + borderGlow * 0.15})`,
          padding: `${spacing[12]}px ${spacing[10]}px`,
          transform: `translateY(${cardY}px)`,
          boxShadow: `${shadows.xl}, 0 0 40px rgba(255,214,10,${borderGlow * 0.08})`,
        }}
      >
        {/* Comillas decorativas */}
        <QuoteMark opacity={quoteOpacity} />

        {/* Rating stars */}
        <div style={{ marginBottom: spacing[6] }}>
          <StarRating rating={rating} opacity={starsOpacity} />
        </div>

        {/* Quote */}
        <blockquote
          style={{
            margin: 0,
            padding: 0,
            opacity: quoteOpacity,
            transform: `translateY(${quoteY}px)`,
            marginBottom: spacing[10],
          }}
        >
          <p
            style={{
              fontFamily: fonts.display,
              fontSize: 32,
              fontWeight: fontWeights.light,
              color: colors.white,
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {quote}
          </p>
        </blockquote>

        {/* Divisor */}
        <div
          style={{
            height: 1,
            backgroundColor: colors.gray800,
            marginBottom: spacing[8],
            opacity: authorOpacity,
          }}
        />

        {/* Autor */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing[5],
            opacity: authorOpacity,
            transform: `translateX(${authorX}px)`,
            marginBottom: resultStat ? spacing[10] : 0,
          }}
        >
          {/* Avatar */}
          {avatarUrl ? (
            <Img
              src={avatarUrl}
              style={{
                width: 72,
                height: 72,
                borderRadius: radius.full,
                border: `2px solid ${colors.gold}`,
                objectFit: "cover",
                flexShrink: 0,
                boxShadow: shadows.goldSm,
              }}
            />
          ) : (
            <AvatarPlaceholder name={authorName} size={72} />
          )}

          {/* Info del autor */}
          <div style={{ display: "flex", flexDirection: "column", gap: spacing[1] }}>
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 18,
                fontWeight: fontWeights.semibold,
                color: colors.white,
                lineHeight: 1.2,
              }}
            >
              {authorName}
            </span>
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 14,
                fontWeight: fontWeights.regular,
                color: colors.gray500,
              }}
            >
              {authorRole}
            </span>
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 13,
                fontWeight: fontWeights.medium,
                color: colors.gold,
                letterSpacing: "0.04em",
              }}
            >
              {company}
            </span>
          </div>
        </div>

        {/* Result Stat (opcional) */}
        {resultStat && (
          <div
            style={{
              opacity: statOpacity,
              transform: `scale(${statScale})`,
              backgroundColor: colors.black,
              borderRadius: radius.sm,
              border: `1px solid ${colors.gold}`,
              padding: `${spacing[5]}px ${spacing[8]}px`,
              textAlign: "center" as const,
              boxShadow: shadows.gold,
            }}
          >
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: 56,
                fontWeight: fontWeights.black,
                color: colors.gold,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                textShadow: shadows.gold,
              }}
            >
              {resultStat}
            </div>
            {resultLabel && (
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 14,
                  fontWeight: fontWeights.medium,
                  color: colors.gray500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  marginTop: spacing[2],
                }}
              >
                {resultLabel}
              </div>
            )}
          </div>
        )}
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
            fontSize: 14,
            fontWeight: fontWeights.regular,
            color: colors.gray600,
            letterSpacing: "0.06em",
          }}
        >
          Resultados reales de clientes UGC Colombia
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 17,
            fontWeight: fontWeights.semibold,
            color: colors.gold,
          }}
        >
          @agenciaugccolombia
        </div>
      </div>
    </AbsoluteFill>
  );
};
