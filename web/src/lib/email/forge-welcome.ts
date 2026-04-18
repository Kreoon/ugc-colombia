/**
 * Email de bienvenida + entrega para leads del landing /forge.
 *
 * Voz: agencia (nosotros). Paleta oficial UGC Colombia (#F9B334 amarillo).
 * Remitente: regalos@ugccolombia.co
 *
 * Template inline HTML — optimizado para Gmail/Outlook sin CSS externo.
 */

export type ForgeWelcomePayload = {
  firstName: string;
  email: string;
  company: string;
  repoUrl: string;
  guideUrl: string;
  hasPrioritySlot: boolean;
  calendlyUrl?: string;
  projectName?: string;
  siteUrl?: string;
};

/**
 * Render HTML del email al lead.
 */
export function renderForgeWelcomeEmail(p: ForgeWelcomePayload): string {
  const siteUrl = p.siteUrl || "https://ugccolombia.co";
  const logoUrl = `${siteUrl}/brand/logo-dark-bg.png`;
  const projectName = p.projectName || "Content Forge";

  const priorityBlock = p.hasPrioritySlot && p.calendlyUrl
    ? `
  <!-- PRIORITY SLOT — llamada 1:1 -->
  <div style="margin:24px;padding:24px;border:2px solid #F9B334;border-radius:16px;background:linear-gradient(135deg,#F9B33418,transparent);">
    <p style="color:#F9B334;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;font-weight:700;">BONUS · Llamada 1:1 gratis</p>
    <p style="color:#fff;font-size:16px;font-weight:700;margin:0 0 8px;">${p.firstName}, entraste dentro de los primeros 50 que descargaron ${projectName}.</p>
    <p style="color:#BDBCBC;font-size:14px;line-height:1.6;margin:0 0 16px;">
      Como agradecimiento, te regalamos una sesión de 15 minutos con Alexander para configurar ${projectName} directamente a tu marca y resolver dudas en vivo.
    </p>
    <a href="${p.calendlyUrl}" style="display:inline-block;background:#F9B334;color:#000;font-weight:700;padding:14px 24px;border-radius:12px;text-decoration:none;font-size:15px;">
      RESERVAR MI LLAMADA DE 15 MIN →
    </a>
    <p style="color:#3D3D3C;font-size:11px;margin:12px 0 0;">Agenda en los próximos 7 días — los slots se acaban.</p>
  </div>
`
    : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${projectName} — Gracias por unirte</title>
</head>
<body style="margin:0;padding:0;background:#000;font-family:'Inter',Helvetica,Arial,sans-serif;">
<div style="background:#000;color:#fff;max-width:600px;margin:0 auto;">

  <!-- HEADER -->
  <div style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 50%,#0a0a0a 100%);padding:32px 24px;text-align:center;border-bottom:2px solid #F9B33430;">
    <img src="${logoUrl}" alt="UGC Colombia" width="180" style="display:inline-block;margin-bottom:16px;" />
    <h1 style="color:#fff;font-size:22px;margin:0;font-weight:700;">${projectName}</h1>
    <p style="color:#BDBCBC;font-size:13px;margin:8px 0 0;">Un estudio editorial en tu terminal · regalo de UGC Colombia × Kreoon</p>
  </div>

  <!-- BIENVENIDA -->
  <div style="padding:28px 24px 8px;">
    <p style="color:#fff;font-size:17px;font-weight:700;margin:0 0 12px;">Hola ${p.firstName},</p>
    <p style="color:#BDBCBC;font-size:14px;line-height:1.7;margin:0;">
      Gracias por confiar en nosotros. ${projectName} es el mismo pipeline que usamos todos los días en UGC Colombia para producir contenido editorial para nuestras marcas. Ahora es tuyo.
    </p>
  </div>

  ${priorityBlock}

  <!-- CTAs PRINCIPALES -->
  <div style="padding:24px;">
    <p style="color:#F9B334;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;font-weight:700;">Tu descarga</p>

    <a href="${p.repoUrl}" style="display:block;background:#F9B334;color:#000;font-weight:700;padding:16px;border-radius:12px;text-decoration:none;font-size:15px;text-align:center;margin-bottom:10px;">
      ABRIR EN GITHUB →
    </a>
    <a href="${p.guideUrl}" style="display:block;background:transparent;color:#F9B334;font-weight:600;padding:14px;border:1px solid #F9B33440;border-radius:12px;text-decoration:none;font-size:14px;text-align:center;">
      GUÍA DE INSTALACIÓN (Mac + Windows) →
    </a>
  </div>

  <!-- COMO EMPEZAR -->
  <div style="padding:0 24px 24px;">
    <p style="color:#F9B334;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;font-weight:700;">Cómo empezar · 4 pasos</p>

    <div style="display:block;margin-bottom:12px;padding:14px;border:1px solid #F9B33420;border-radius:12px;background:#F9B33405;">
      <p style="color:#fff;font-size:14px;font-weight:600;margin:0 0 4px;">1. Clona el repo</p>
      <p style="color:#BDBCBC;font-size:12px;margin:0;font-family:monospace;">git clone ${p.repoUrl}.git</p>
    </div>

    <div style="display:block;margin-bottom:12px;padding:14px;border:1px solid #F9B33420;border-radius:12px;background:#F9B33405;">
      <p style="color:#fff;font-size:14px;font-weight:600;margin:0 0 4px;">2. Instala dependencias</p>
      <p style="color:#BDBCBC;font-size:12px;margin:0;font-family:monospace;">npm install</p>
    </div>

    <div style="display:block;margin-bottom:12px;padding:14px;border:1px solid #F9B33420;border-radius:12px;background:#F9B33405;">
      <p style="color:#fff;font-size:14px;font-weight:600;margin:0 0 4px;">3. Configura tu marca (10 preguntas)</p>
      <p style="color:#BDBCBC;font-size:12px;margin:0;font-family:monospace;">npm run setup</p>
    </div>

    <div style="display:block;margin-bottom:12px;padding:14px;border:1px solid #F9B33420;border-radius:12px;background:#F9B33405;">
      <p style="color:#fff;font-size:14px;font-weight:600;margin:0 0 4px;">4. Abre Claude Code y pide tu primer carrusel</p>
      <p style="color:#BDBCBC;font-size:12px;margin:0;">"Hazme un carrusel educativo sobre [tu tema]"</p>
    </div>
  </div>

  <!-- SÍGUENOS -->
  <div style="padding:20px 24px;text-align:center;border-top:1px solid #222;">
    <p style="color:#BDBCBC;font-size:12px;margin:0 0 12px;">Síguenos para más regalos y contenido real:</p>
    <div>
      <a href="https://www.instagram.com/agenciaugccolombia" style="color:#F9B334;font-size:13px;text-decoration:none;margin:0 10px;font-weight:600;">Instagram</a>
      <a href="https://www.youtube.com/@agenciaugccolombia" style="color:#F9B334;font-size:13px;text-decoration:none;margin:0 10px;font-weight:600;">YouTube</a>
      <a href="https://www.facebook.com/agenciaugccolombia" style="color:#F9B334;font-size:13px;text-decoration:none;margin:0 10px;font-weight:600;">Facebook</a>
      <a href="https://www.tiktok.com/@agenciaugccolombia" style="color:#F9B334;font-size:13px;text-decoration:none;margin:0 10px;font-weight:600;">TikTok</a>
    </div>
  </div>

  <!-- FOOTER -->
  <div style="padding:16px 24px;border-top:1px solid #111;">
    <p style="color:#3D3D3C;font-size:11px;margin:0;text-align:center;line-height:1.6;">
      UGC Colombia · Contenido real, resultados reales.<br>
      <a href="${siteUrl}" style="color:#F9B334;">ugccolombia.co</a> · Bogotá, Colombia<br>
      <span style="color:#2a2a2a;">Recibiste este email porque solicitaste ${projectName} en ${siteUrl}/forge</span>
    </p>
  </div>
</div>
</body>
</html>`;
}

/**
 * Render HTML del email de notificación al equipo.
 */
export function renderForgeTeamNotification(p: ForgeWelcomePayload): string {
  const priorityBadge = p.hasPrioritySlot
    ? `<span style="background:#F9B334;color:#000;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:700;margin-left:8px;">PRIORITY 50</span>`
    : "";

  return `
<div style="font-family:Inter,sans-serif;background:#000;color:#fff;padding:24px;max-width:520px;margin:0 auto;">
  <h2 style="color:#F9B334;margin:0 0 16px;">🎁 Nuevo lead en /forge ${priorityBadge}</h2>
  <table style="font-size:13px;color:#BDBCBC;line-height:2;width:100%;">
    <tr><td style="color:#F9B334;width:100px;">Nombre</td><td>${p.firstName}</td></tr>
    <tr><td style="color:#F9B334;">Empresa</td><td>${p.company}</td></tr>
    <tr><td style="color:#F9B334;">Email</td><td><a href="mailto:${p.email}" style="color:#F9B334;">${p.email}</a></td></tr>
    <tr><td style="color:#F9B334;">Descargó</td><td>${p.projectName || "Content Forge"}</td></tr>
    ${p.hasPrioritySlot ? `<tr><td style="color:#F9B334;">Slot 1:1</td><td><strong style="color:#F9B334;">SÍ — entre los primeros 50</strong></td></tr>` : ""}
  </table>
  <p style="color:#3D3D3C;font-size:11px;margin-top:20px;">
    Lead guardado en Supabase. ${p.hasPrioritySlot ? "Tiene acceso al Calendly para llamada con Alexander." : "Está en la secuencia de nurturing estándar."}
  </p>
</div>`;
}
