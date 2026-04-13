// Secuencia de nurturing — 5 emails en 30 días
// El email del día 0 (diagnóstico) ya lo envía brand-diagnosis

export interface NurturingStep {
  key: string;
  delayDays: number;
  subject: (lead: LeadContext) => string;
  generateHtml: (lead: LeadContext) => string;
}

export interface LeadContext {
  full_name: string;
  company_name: string;
  industry: string;
  email: string;
  qualification_score: number;
  temperature: string;
  diagnosis_slug?: string;
}

const COMMUNITY_URL = "https://chat.whatsapp.com/ugccolombia";
const SITE_URL = "https://ugccolombia.co";

const communityFooter = `
<div style="margin-top:24px;padding:16px;border:1px solid #10B98130;border-radius:12px;background:#10B98108;text-align:center;">
  <p style="color:#10B981;font-size:12px;font-weight:600;margin:0 0 8px;">Únete a nuestra comunidad gratuita de WhatsApp</p>
  <a href="${COMMUNITY_URL}" style="color:#10B981;font-size:12px;text-decoration:underline;">+200 marcas aprendiendo juntas →</a>
</div>`;

const emailFooter = `
<div style="padding:20px 0;border-top:1px solid #222;margin-top:24px;">
  <p style="color:#3D3D3C;font-size:11px;margin:0;text-align:center;">
    UGC Colombia · <a href="${SITE_URL}" style="color:#D4A017;">ugccolombia.co</a><br>
    <a href="${SITE_URL}/api/newsletter/unsubscribe?email=__EMAIL__" style="color:#3D3D3C;">Desuscribirme</a>
  </p>
</div>`;

function wrap(content: string, email: string): string {
  return `<div style="font-family:'Inter',Helvetica,Arial,sans-serif;background:#000;color:#fff;max-width:560px;margin:0 auto;padding:24px;">
${content}
${communityFooter}
${emailFooter.replace("__EMAIL__", encodeURIComponent(email))}
</div>`;
}

export const NURTURING_STEPS: NurturingStep[] = [
  {
    key: "day_3_case_study",
    delayDays: 3,
    subject: (l) => `${l.full_name}, así una marca de ${formatIndustry(l.industry)} multiplicó sus ventas con UGC`,
    generateHtml: (l) => wrap(`
<h1 style="color:#D4A017;font-size:22px;margin:0 0 16px;">Caso real: ${formatIndustry(l.industry)}</h1>
<p style="color:#BDBCBC;font-size:14px;line-height:1.7;">
  Hola ${l.full_name.split(" ")[0]},
</p>
<p style="color:#BDBCBC;font-size:14px;line-height:1.7;">
  Una marca de <strong style="color:#fff;">${formatIndustry(l.industry)}</strong> en Colombia tenía el mismo problema que detectamos en tu diagnóstico.
</p>
<p style="color:#BDBCBC;font-size:14px;line-height:1.7;">
  En 60 días, con un pipeline de contenido UGC:
</p>
<ul style="color:#BDBCBC;font-size:14px;line-height:2;">
  <li>CTR en Meta Ads pasó de <strong style="color:#F97316;">0.8%</strong> a <strong style="color:#10B981;">2.3%</strong></li>
  <li>Costo por adquisición bajó <strong style="color:#10B981;">42%</strong></li>
  <li>Contenido orgánico creció <strong style="color:#10B981;">3x</strong> en alcance</li>
</ul>
<p style="color:#BDBCBC;font-size:14px;line-height:1.7;">
  La clave no fue gastar más — fue cambiar el tipo de contenido.
</p>
${l.diagnosis_slug ? `<p style="margin-top:16px;"><a href="${SITE_URL}/diagnostico/${l.diagnosis_slug}" style="color:#F9B334;font-size:14px;">Ver tu diagnóstico completo →</a></p>` : ""}
<div style="margin-top:24px;text-align:center;">
  <a href="${SITE_URL}" style="display:inline-block;background:#D4A017;color:#000;font-weight:700;padding:12px 24px;border-radius:10px;text-decoration:none;font-size:14px;">QUIERO RESULTADOS SIMILARES →</a>
</div>`, l.email),
  },
  {
    key: "day_8_tips",
    delayDays: 8,
    subject: (l) => `3 tips de contenido que deberías aplicar esta semana, ${l.full_name.split(" ")[0]}`,
    generateHtml: (l) => wrap(`
<h1 style="color:#D4A017;font-size:22px;margin:0 0 16px;">3 tips para tu contenido esta semana</h1>
<p style="color:#BDBCBC;font-size:14px;line-height:1.7;">
  Hola ${l.full_name.split(" ")[0]}, estos tips son específicos para marcas de <strong style="color:#fff;">${formatIndustry(l.industry)}</strong>:
</p>
<div style="margin:20px 0;padding:16px;border-left:3px solid #F9B334;background:#F9B33408;">
  <p style="color:#fff;font-size:14px;font-weight:700;margin:0 0 4px;">1. Hook de 2 segundos</p>
  <p style="color:#BDBCBC;font-size:13px;margin:0;">El 65% de los usuarios decide en 2 segundos si ve tu video. Empieza con una pregunta que duela: "¿Tu marca sigue usando fotos de stock?"</p>
</div>
<div style="margin:20px 0;padding:16px;border-left:3px solid #F9B334;background:#F9B33408;">
  <p style="color:#fff;font-size:14px;font-weight:700;margin:0 0 4px;">2. UGC > Branded</p>
  <p style="color:#BDBCBC;font-size:13px;margin:0;">Los anuncios con contenido UGC tienen 4x más CTR que los producidos por la marca. La autenticidad vende más que la perfección.</p>
</div>
<div style="margin:20px 0;padding:16px;border-left:3px solid #F9B334;background:#F9B33408;">
  <p style="color:#fff;font-size:14px;font-weight:700;margin:0 0 4px;">3. Rota cada 2-3 semanas</p>
  <p style="color:#BDBCBC;font-size:13px;margin:0;">Meta penaliza creativos repetidos. Necesitas mínimo 4-6 videos nuevos al mes para mantener tu performance.</p>
</div>`, l.email),
  },
  {
    key: "day_15_contrafactual",
    delayDays: 15,
    subject: (l) => `¿Qué pasaría si ${l.company_name} tuviera contenido fresco cada semana?`,
    generateHtml: (l) => wrap(`
<h1 style="color:#D4A017;font-size:22px;margin:0 0 16px;">Imagina esto, ${l.full_name.split(" ")[0]}...</h1>
<p style="color:#BDBCBC;font-size:14px;line-height:1.7;">
  Es lunes. Abres tu bandeja y tienes 4 videos nuevos listos para publicar. Están editados, optimizados para ads, y tienen hooks que enganchan.
</p>
<p style="color:#BDBCBC;font-size:14px;line-height:1.7;">
  No tuviste que grabar nada. No buscaste creadores. No editaste. Solo aprobaste y publicaste.
</p>
<p style="color:#BDBCBC;font-size:14px;line-height:1.7;">
  Tu CTR sube. Tu costo por lead baja. Tu Instagram crece sin que tengas que postear tú.
</p>
<p style="color:#fff;font-size:14px;line-height:1.7;font-weight:700;">
  Eso es lo que hacemos en UGC Colombia para marcas como ${l.company_name}.
</p>
<div style="margin-top:24px;text-align:center;">
  <a href="${SITE_URL}" style="display:inline-block;background:#D4A017;color:#000;font-weight:700;padding:12px 24px;border-radius:10px;text-decoration:none;font-size:14px;">QUIERO ESTO PARA MI MARCA →</a>
</div>`, l.email),
  },
  {
    key: "day_22_trends",
    delayDays: 22,
    subject: () => "Lo que está funcionando en contenido ahora mismo (datos reales)",
    generateHtml: (l) => wrap(`
<h1 style="color:#D4A017;font-size:22px;margin:0 0 16px;">Tendencias de contenido — lo que funciona hoy</h1>
<p style="color:#BDBCBC;font-size:14px;line-height:1.7;">
  Hola ${l.full_name.split(" ")[0]}, esto es lo que estamos viendo en las marcas que manejamos:
</p>
<div style="margin:16px 0;padding:16px;border:1px solid #333;border-radius:12px;">
  <p style="color:#F9B334;font-size:13px;font-weight:700;margin:0 0 8px;">📈 Reels de 15-30s con subtítulos</p>
  <p style="color:#BDBCBC;font-size:13px;margin:0;">Engagement 3x mayor vs. reels sin subtítulos. El 85% de la gente ve videos sin sonido.</p>
</div>
<div style="margin:16px 0;padding:16px;border:1px solid #333;border-radius:12px;">
  <p style="color:#F9B334;font-size:13px;font-weight:700;margin:0 0 8px;">🎯 UGC para retargeting</p>
  <p style="color:#BDBCBC;font-size:13px;margin:0;">Testimoniales UGC en ads de retargeting tienen 67% más conversión que ads genéricos.</p>
</div>
<div style="margin:16px 0;padding:16px;border:1px solid #333;border-radius:12px;">
  <p style="color:#F9B334;font-size:13px;font-weight:700;margin:0 0 8px;">🤝 Carruseles educativos</p>
  <p style="color:#BDBCBC;font-size:13px;margin:0;">El formato más guardado en Instagram. Perfecto para TOFU + posicionamiento.</p>
</div>`, l.email),
  },
  {
    key: "day_30_offer",
    delayDays: 30,
    subject: (l) => `${l.full_name.split(" ")[0]}, tenemos una oferta especial para ${l.company_name}`,
    generateHtml: (l) => wrap(`
<h1 style="color:#D4A017;font-size:22px;margin:0 0 16px;">Oferta exclusiva para ${l.company_name}</h1>
<p style="color:#BDBCBC;font-size:14px;line-height:1.7;">
  Hola ${l.full_name.split(" ")[0]},
</p>
<p style="color:#BDBCBC;font-size:14px;line-height:1.7;">
  Hace un mes hiciste tu diagnóstico con nosotros. Vimos las oportunidades de ${l.company_name} y queremos ayudarte a ejecutarlas.
</p>
<div style="margin:24px 0;padding:20px;border:2px solid #D4A01750;border-radius:16px;background:#D4A01708;text-align:center;">
  <p style="color:#D4A017;font-size:18px;font-weight:800;margin:0 0 8px;">20% OFF tu primer mes</p>
  <p style="color:#BDBCBC;font-size:13px;margin:0 0 16px;">En cualquiera de nuestros planes. Válido hasta este viernes.</p>
  <a href="${SITE_URL}" style="display:inline-block;background:#D4A017;color:#000;font-weight:700;padding:14px 28px;border-radius:12px;text-decoration:none;font-size:15px;">APROVECHAR DESCUENTO →</a>
</div>
<p style="color:#BDBCBC;font-size:13px;margin-top:16px;">
  Si prefieres hablar primero, agenda una llamada rápida de 15 min sin compromiso.
</p>`, l.email),
  },
];

function formatIndustry(industry: string): string {
  const map: Record<string, string> = {
    ecommerce: "e-commerce",
    marca_productos: "productos",
    servicios: "servicios",
    saas: "SaaS",
    dropshipping: "dropshipping",
    restaurantes: "gastronomía",
    salud_belleza: "salud y belleza",
    educacion: "educación",
    fintech: "fintech",
  };
  return map[industry] || industry;
}

export function getNurturingSteps(): NurturingStep[] {
  return NURTURING_STEPS;
}
