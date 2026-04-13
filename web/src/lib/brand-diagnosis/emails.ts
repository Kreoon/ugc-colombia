// Email templates for brand diagnosis results via Resend

import type { DiagnosisResult } from "./prompt-chain";
import type { InstagramProfile } from "./apify";

interface LeadInfo {
  full_name: string;
  email: string;
  whatsapp: string;
  company_name: string;
  industry: string;
  instagram_handle?: string;
  website?: string;
}

function scoreColor(score: number): string {
  if (score >= 70) return "#F97316"; // orange for hot
  if (score >= 40) return "#F9B334"; // gold for warm
  return "#3B82F6"; // blue for cold
}

function scoreLabel(score: number): string {
  if (score >= 70) return "Alto potencial";
  if (score >= 40) return "Buen potencial";
  return "En crecimiento";
}

// ─── Email to the LEAD (client) ──────────────────────────────────────────────

export function buildLeadEmail(
  lead: LeadInfo,
  diagnosis: DiagnosisResult,
  igProfile: InstagramProfile | null,
): { subject: string; html: string } {
  const color = scoreColor(diagnosis.overall_score);
  const label = scoreLabel(diagnosis.overall_score);

  const quickWinsHtml = diagnosis.quick_wins
    .slice(0, 3)
    .map(
      (qw) =>
        `<tr><td style="padding:8px 12px;border-left:3px solid #10B981;background:#10B981/5;"><strong style="color:#10B981;">${qw.action}</strong><br><span style="color:#BDBCBC;font-size:13px;">${qw.expected_impact}</span></td></tr>`
    )
    .join("");

  const failingHtml = diagnosis.content_audit.whats_failing
    .slice(0, 3)
    .map(
      (f) =>
        `<tr><td style="padding:8px 12px;border-left:3px solid #F97316;"><span style="color:#F97316;">⚠</span> ${f.insight}</td></tr>`
    )
    .join("");

  const pillarsHtml = diagnosis.content_strategy.pillars
    .slice(0, 4)
    .map(
      (p) =>
        `<tr><td style="padding:6px 12px;"><strong style="color:#D4A017;">${p.name}</strong> (${p.percentage}%) — ${p.description}</td></tr>`
    )
    .join("");

  return {
    subject: `Diagnóstico de ${lead.company_name} — Score ${diagnosis.overall_score}/100`,
    html: `
<div style="font-family:'Inter',Helvetica,Arial,sans-serif;background:#000;color:#fff;max-width:600px;margin:0 auto;padding:0;">
  <!-- Header -->
  <div style="background:linear-gradient(135deg,#0a0a0a,#1a1a1a);padding:32px 24px;border-bottom:2px solid ${color}40;">
    <p style="color:${color};font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;">Diagnóstico de marca con IA</p>
    <h1 style="color:#fff;font-size:28px;margin:0 0 4px;font-weight:800;">${lead.company_name}</h1>
    <p style="color:#BDBCBC;font-size:14px;margin:0;">Preparado para ${lead.full_name}</p>
  </div>

  <!-- Score -->
  <div style="padding:24px;text-align:center;background:linear-gradient(180deg,${color}15,transparent);">
    <div style="display:inline-block;padding:20px 32px;border:2px solid ${color}50;border-radius:16px;">
      <p style="font-size:56px;font-weight:900;color:${color};margin:0;line-height:1;">${diagnosis.overall_score}</p>
      <p style="color:#BDBCBC;font-size:12px;margin:4px 0 0;text-transform:uppercase;letter-spacing:1px;">${label} — /100</p>
    </div>
    ${igProfile ? `<p style="color:#BDBCBC;font-size:13px;margin:16px 0 0;">@${igProfile.username} · ${igProfile.followers.toLocaleString()} seguidores · ${igProfile.engagement_rate}% ER</p>` : ""}
  </div>

  <!-- Executive Summary -->
  <div style="padding:0 24px 24px;">
    <h2 style="color:#D4A017;font-size:14px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #333;padding-bottom:8px;">Resumen ejecutivo</h2>
    <p style="color:#BDBCBC;font-size:14px;line-height:1.6;">${diagnosis.executive_summary || "Análisis completo disponible en la llamada de diagnóstico."}</p>
  </div>

  <!-- What's Failing -->
  ${failingHtml ? `
  <div style="padding:0 24px 24px;">
    <h2 style="color:#F97316;font-size:14px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #333;padding-bottom:8px;">Brechas detectadas</h2>
    <table style="width:100%;border-collapse:collapse;color:#BDBCBC;font-size:14px;">${failingHtml}</table>
  </div>` : ""}

  <!-- Quick Wins -->
  ${quickWinsHtml ? `
  <div style="padding:0 24px 24px;">
    <h2 style="color:#10B981;font-size:14px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #333;padding-bottom:8px;">Acciones inmediatas recomendadas</h2>
    <table style="width:100%;border-collapse:collapse;color:#BDBCBC;font-size:14px;">${quickWinsHtml}</table>
  </div>` : ""}

  <!-- Content Strategy Pillars -->
  ${pillarsHtml ? `
  <div style="padding:0 24px 24px;">
    <h2 style="color:#D4A017;font-size:14px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #333;padding-bottom:8px;">Pilares de contenido recomendados</h2>
    <table style="width:100%;border-collapse:collapse;color:#BDBCBC;font-size:13px;">${pillarsHtml}</table>
  </div>` : ""}

  <!-- CTA -->
  <div style="padding:24px;text-align:center;background:linear-gradient(180deg,transparent,${color}10);">
    <p style="color:#fff;font-size:16px;font-weight:700;margin:0 0 8px;">¿Quieres implementar estas mejoras?</p>
    <p style="color:#BDBCBC;font-size:13px;margin:0 0 20px;">Agenda tu llamada estratégica con nuestro equipo.</p>
    <a href="https://ugccolombia.co" style="display:inline-block;background:${color};color:#000;font-weight:700;padding:14px 28px;border-radius:12px;text-decoration:none;font-size:15px;">AGENDAR LLAMADA →</a>
  </div>

  <!-- Community -->
  <div style="padding:0 24px 24px;text-align:center;">
    <div style="border:1px solid #10B98130;border-radius:12px;padding:16px;background:#10B98108;">
      <p style="color:#10B981;font-size:13px;font-weight:700;margin:0 0 4px;">Comunidad gratuita</p>
      <p style="color:#BDBCBC;font-size:12px;margin:0 0 12px;">Únete a +200 marcas aprendiendo de marketing, ventas y contenido.</p>
      <a href="https://chat.whatsapp.com/ugccolombia" style="display:inline-block;background:#10B98120;color:#10B981;font-weight:600;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;">UNIRME AL GRUPO →</a>
    </div>
  </div>

  <!-- Footer -->
  <div style="padding:20px 24px;border-top:1px solid #222;">
    <p style="color:#3D3D3C;font-size:11px;margin:0;text-align:center;">
      UGC Colombia · Contenido real, resultados reales<br>
      <a href="https://ugccolombia.co" style="color:#D4A017;">ugccolombia.co</a> ·
      <a href="https://instagram.com/agenciaugccolombia" style="color:#D4A017;">@agenciaugccolombia</a>
    </p>
  </div>
</div>`,
  };
}

// ─── Email to the TEAM (internal) ────────────────────────────────────────────

export function buildTeamEmail(
  lead: LeadInfo,
  diagnosis: DiagnosisResult,
  igProfile: InstagramProfile | null,
  qualificationScore: number,
  temperature: string,
): { subject: string; html: string } {
  const tempEmoji = temperature === "hot" ? "🔥" : temperature === "warm" ? "🟡" : "🔵";

  const scoresHtml = Object.entries(diagnosis.scores)
    .map(([k, v]) => `<tr><td style="padding:4px 8px;color:#BDBCBC;">${k.replace(/_/g, " ")}</td><td style="padding:4px 8px;color:#fff;font-weight:700;">${v}/100</td></tr>`)
    .join("");

  const nextStepsHtml = diagnosis.next_steps
    .map((s, i) => `<li style="color:#BDBCBC;margin-bottom:4px;">${s}</li>`)
    .join("");

  return {
    subject: `${tempEmoji} [${temperature.toUpperCase()}] ${lead.company_name} — Score IA: ${diagnosis.overall_score}/100 | Form: ${qualificationScore}/100`,
    html: `
<div style="font-family:'Inter',Helvetica,Arial,sans-serif;background:#000;color:#fff;max-width:600px;margin:0 auto;padding:24px;">
  <h1 style="color:#D4A017;font-size:20px;margin:0 0 16px;">${tempEmoji} Nuevo lead: ${lead.company_name}</h1>

  <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
    <tr><td style="padding:4px 8px;color:#D4A017;width:120px;">Nombre</td><td style="color:#fff;">${lead.full_name}</td></tr>
    <tr><td style="padding:4px 8px;color:#D4A017;">Empresa</td><td style="color:#fff;">${lead.company_name}</td></tr>
    <tr><td style="padding:4px 8px;color:#D4A017;">Email</td><td><a href="mailto:${lead.email}" style="color:#F9B334;">${lead.email}</a></td></tr>
    <tr><td style="padding:4px 8px;color:#D4A017;">WhatsApp</td><td><a href="https://wa.me/57${lead.whatsapp}" style="color:#F9B334;">+57${lead.whatsapp}</a></td></tr>
    <tr><td style="padding:4px 8px;color:#D4A017;">Industria</td><td style="color:#fff;">${lead.industry}</td></tr>
    <tr><td style="padding:4px 8px;color:#D4A017;">Instagram</td><td style="color:#fff;">${lead.instagram_handle ? `@${lead.instagram_handle}` : "N/A"}${igProfile ? ` · ${igProfile.followers.toLocaleString()} seg · ${igProfile.engagement_rate}% ER` : ""}</td></tr>
    <tr><td style="padding:4px 8px;color:#D4A017;">Website</td><td style="color:#fff;">${lead.website || "N/A"}</td></tr>
    <tr><td style="padding:4px 8px;color:#D4A017;">Score Form</td><td style="color:#fff;font-weight:700;">${qualificationScore}/100 (${temperature})</td></tr>
    <tr><td style="padding:4px 8px;color:#D4A017;">Score IA</td><td style="color:#fff;font-weight:700;">${diagnosis.overall_score}/100</td></tr>
  </table>

  <h2 style="color:#D4A017;font-size:14px;border-bottom:1px solid #333;padding-bottom:6px;">Scores detallados</h2>
  <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">${scoresHtml}</table>

  <h2 style="color:#D4A017;font-size:14px;border-bottom:1px solid #333;padding-bottom:6px;">Resumen ejecutivo</h2>
  <p style="color:#BDBCBC;font-size:13px;line-height:1.6;">${diagnosis.executive_summary}</p>

  <h2 style="color:#D4A017;font-size:14px;border-bottom:1px solid #333;padding-bottom:6px;">Paquete recomendado</h2>
  <p style="color:#fff;font-size:14px;font-weight:700;">${diagnosis.service_proposal?.recommended || "Por determinar"}</p>
  <p style="color:#BDBCBC;font-size:13px;">${diagnosis.service_proposal?.estimated_roi || ""}</p>

  <h2 style="color:#D4A017;font-size:14px;border-bottom:1px solid #333;padding-bottom:6px;">Next steps</h2>
  <ol style="font-size:13px;padding-left:20px;">${nextStepsHtml}</ol>

  <div style="margin-top:20px;padding:16px;border:1px solid #333;border-radius:8px;background:#111;">
    <p style="color:#BDBCBC;font-size:12px;margin:0;">Este diagnóstico fue generado automáticamente por el sistema de captación de UGC Colombia. Los datos de IG son reales (Apify), el análisis fue hecho por Gemini 2.0 Flash en cadena de 5 prompts.</p>
  </div>
</div>`,
  };
}
