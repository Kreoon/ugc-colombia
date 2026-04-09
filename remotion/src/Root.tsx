/**
 * Root.tsx — Registro de composiciones Remotion
 * UGC Colombia · @agenciaugccolombia
 *
 * Para preview: npx remotion studio
 * Para render:  ver README.md
 */

import React from "react";
import { Composition } from "remotion";

import { CaseStudyCard } from "./compositions/CaseStudyCard";
import { LogoReveal } from "./compositions/LogoReveal";
import { QuoteCard } from "./compositions/QuoteCard";
import { StatsReveal } from "./compositions/StatsReveal";
import { ScriptedReelTemplate } from "./compositions/ScriptedReelTemplate";
import { reelScripts } from "./data/scripts";
import { videoFormats } from "./lib/tokens";

// ─── Defaults de preview ────────────────────────────────────────────────────

const CASE_STUDY_DEFAULTS = {
  client: "Suplementos Andina",
  industry: "Suplementos deportivos · DTC Colombia",
  metricBefore: "1.1x",
  metricAfter: "4.2x",
  metricLabel: "ROAS",
  roasMultiplier: "3.8x",
  daysToResult: "21 días",
  budgetSpent: "$800",
  revenueGen: "$12,000",
};

const QUOTE_DEFAULTS = {
  quote:
    "Pasamos de un ROAS de 1.2 a 3.4 en dos meses. No cambié el presupuesto de pauta. Cambié el creativo. UGC Colombia hizo la diferencia.",
  authorName: "Valentina Ríos",
  authorRole: "Head of Growth",
  company: "Marca DTC · Skincare Colombia",
  resultStat: "3.4x",
  resultLabel: "ROAS final",
  rating: 5,
};

const STATS_DEFAULTS_YOUTUBE = {
  title: "12 → 35 → 110 clientes",
  subtitle: "Crecimiento UGC Colombia · 2024–2026",
  format: "youtube" as const,
  showProgression: true,
  stats: [
    { value: 12, label: "Clientes iniciales", suffix: "" },
    { value: 35, label: "A los 6 meses", suffix: "", accent: false },
    { value: 110, label: "Hoy", suffix: "+", accent: true },
  ],
};

const STATS_DEFAULTS_SQUARE = {
  title: "Resultados reales",
  subtitle: "Promedio de clientes UGC Colombia",
  format: "square" as const,
  showProgression: true,
  stats: [
    { value: 800, label: "Inversión UGC", prefix: "$" },
    { value: 4200, label: "ROAS promedio", suffix: "%" },
    { value: 21, label: "Días al resultado", suffix: "d", accent: true },
  ],
};

// Script #5 como ejemplo del ScriptedReel
const SCRIPT_EXAMPLE = reelScripts[4]; // "UGC de $800 que generó $12,000"

// ─── Root ─────────────────────────────────────────────────────────────────

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ─── LogoReveal — 3 formatos ─── */}
      <Composition
        id="LogoReveal-Reels"
        component={LogoReveal}
        durationInFrames={90}
        fps={30}
        width={videoFormats.reels.width}
        height={videoFormats.reels.height}
        defaultProps={{
          format: "reels",
          tagline: "Contenido que convierte.",
          showTagline: true,
        }}
      />

      <Composition
        id="LogoReveal-YouTube"
        component={LogoReveal}
        durationInFrames={90}
        fps={30}
        width={videoFormats.youtube.width}
        height={videoFormats.youtube.height}
        defaultProps={{
          format: "youtube",
          tagline: "Contenido que convierte.",
          showTagline: true,
        }}
      />

      <Composition
        id="LogoReveal-Square"
        component={LogoReveal}
        durationInFrames={90}
        fps={30}
        width={videoFormats.square.width}
        height={videoFormats.square.height}
        defaultProps={{
          format: "square",
          tagline: "Contenido que convierte.",
          showTagline: true,
        }}
      />

      {/* ─── CaseStudyCard — 15s Reels ─── */}
      <Composition
        id="CaseStudyCard"
        component={CaseStudyCard}
        durationInFrames={450}
        fps={30}
        width={videoFormats.reels.width}
        height={videoFormats.reels.height}
        defaultProps={CASE_STUDY_DEFAULTS}
      />

      {/* ─── QuoteCard — 8s Reels ─── */}
      <Composition
        id="QuoteCard"
        component={QuoteCard}
        durationInFrames={240}
        fps={30}
        width={videoFormats.reels.width}
        height={videoFormats.reels.height}
        defaultProps={QUOTE_DEFAULTS}
      />

      {/* ─── StatsReveal — YouTube 16:9 (LinkedIn) ─── */}
      <Composition
        id="StatsReveal-YouTube"
        component={StatsReveal}
        durationInFrames={300}
        fps={30}
        width={videoFormats.youtube.width}
        height={videoFormats.youtube.height}
        defaultProps={STATS_DEFAULTS_YOUTUBE}
      />

      {/* ─── StatsReveal — Square (Feed / LinkedIn) ─── */}
      <Composition
        id="StatsReveal-Square"
        component={StatsReveal}
        durationInFrames={300}
        fps={30}
        width={videoFormats.square.width}
        height={videoFormats.square.height}
        defaultProps={STATS_DEFAULTS_SQUARE}
      />

      {/* ─── StatsReveal — Reels ─── */}
      <Composition
        id="StatsReveal-Reels"
        component={StatsReveal}
        durationInFrames={300}
        fps={30}
        width={videoFormats.reels.width}
        height={videoFormats.reels.height}
        defaultProps={{
          title: "Resultados reales",
          subtitle: "Clientes UGC Colombia",
          format: "reels" as const,
          showProgression: true,
          stats: [
            { value: 12, label: "Clientes Q1 2024" },
            { value: 35, label: "Clientes Q3 2024" },
            { value: 110, label: "Clientes hoy", suffix: "+", accent: true },
          ],
        }}
      />

      {/* ─── ScriptedReelTemplate — 10 guiones de lanzamiento ─── */}
      {reelScripts.map((script) => (
        <Composition
          key={script.id}
          id={`Reel-G${String(script.id).padStart(2, "0")}-${script.title
            .replace(/[^a-zA-Z0-9]/g, "-")
            .slice(0, 30)}`}
          component={ScriptedReelTemplate}
          durationInFrames={(script.durationSec + 6) * 30} // +6s para intro + CTA
          fps={30}
          width={videoFormats.reels.width}
          height={videoFormats.reels.height}
          defaultProps={{
            script,
            audioSrc: `/audio/g${String(script.id).padStart(2, "0")}-voiceover.mp3`,
            showCaptions: true,
            showHandle: true,
          }}
        />
      ))}
    </>
  );
};
