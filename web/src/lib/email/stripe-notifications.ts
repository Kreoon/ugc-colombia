/**
 * Notificaciones internas al admin para eventos de Stripe.
 * Usa Resend (RESEND_API_KEY + RESEND_NOTIFY_EMAIL).
 *
 * Reemplaza el dispatch a n8n del webhook. Todo se enruta directo por email
 * al founder para que no dependamos de un servidor n8n corriendo.
 */

type AdminAlertKind =
  | "checkout_started"
  | "purchase"
  | "renewal"
  | "payment_failed"
  | "checkout_expired"
  | "subscription_canceled";

interface AdminAlertPayload {
  kind: AdminAlertKind;
  email?: string | null;
  name?: string | null;
  company?: string | null;
  plan_id?: string | null;
  plan_label?: string | null;
  currency?: string | null;
  /** En unidad mayor (USD, COP) — no minor units. */
  amount?: number | null;
  /** Duración del ciclo en meses (1, 3, 6, 12). */
  billing_interval_count?: number | null;
  videos_per_month?: number | null;
  whatsapp?: string | null;
  country?: string | null;
  stripe_session_id?: string | null;
  stripe_subscription_id?: string | null;
  stripe_customer_id?: string | null;
  extra_note?: string | null;
}

const KIND_META: Record<
  AdminAlertKind,
  { emoji: string; subjectPrefix: string; headline: string; color: string }
> = {
  checkout_started: {
    emoji: "🛒",
    subjectPrefix: "Checkout iniciado",
    headline: "Nuevo checkout iniciado",
    color: "#F9B334",
  },
  purchase: {
    emoji: "💰",
    subjectPrefix: "VENTA CERRADA",
    headline: "Nueva venta confirmada",
    color: "#10b981",
  },
  renewal: {
    emoji: "🔁",
    subjectPrefix: "Renovación",
    headline: "Renovación mensual exitosa",
    color: "#10b981",
  },
  payment_failed: {
    emoji: "⚠️",
    subjectPrefix: "PAGO FALLIDO",
    headline: "Pago fallido — tarjeta rechazada",
    color: "#ef4444",
  },
  checkout_expired: {
    emoji: "🧊",
    subjectPrefix: "Carrito abandonado",
    headline: "Checkout expirado sin pago",
    color: "#94a3b8",
  },
  subscription_canceled: {
    emoji: "❌",
    subjectPrefix: "CANCELACIÓN",
    headline: "Cliente canceló suscripción",
    color: "#ef4444",
  },
};

function fmtMoney(amount?: number | null, currency?: string | null): string {
  if (amount == null || !currency) return "—";
  try {
    return new Intl.NumberFormat(currency === "COP" ? "es-CO" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

function row(label: string, value?: string | number | null): string {
  if (value == null || value === "") return "";
  return `
    <tr>
      <td style="padding:8px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:40%;">${label}</td>
      <td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600;">${String(value)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</td>
    </tr>`;
}

function renderAdminEmail(p: AdminAlertPayload): { subject: string; html: string } {
  const meta = KIND_META[p.kind];
  const amountStr = fmtMoney(p.amount, p.currency);
  const planStr = p.plan_label ?? p.plan_id ?? "—";
  const cycleStr =
    p.billing_interval_count && p.billing_interval_count > 1
      ? `${p.billing_interval_count} meses`
      : "mensual";

  const subject = `${meta.emoji} ${meta.subjectPrefix} · ${planStr} · ${amountStr} · ${p.email ?? "—"}`;

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:24px;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <tr>
      <td style="background:${meta.color};padding:20px 24px;">
        <p style="color:#fff;margin:0;font-size:12px;text-transform:uppercase;letter-spacing:2px;font-weight:700;opacity:0.9;">${meta.emoji} ${meta.subjectPrefix}</p>
        <h1 style="color:#fff;margin:6px 0 0;font-size:22px;font-weight:800;">${meta.headline}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:24px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
          ${row("Cliente", p.name)}
          ${row("Email", p.email)}
          ${row("Empresa", p.company)}
          ${row("WhatsApp", p.whatsapp)}
          ${row("País", p.country)}
          ${row("Plan", planStr)}
          ${row("Ciclo", cycleStr)}
          ${row("Videos/mes", p.videos_per_month)}
          ${row("Monto", amountStr)}
          ${row("Session ID", p.stripe_session_id)}
          ${row("Subscription ID", p.stripe_subscription_id)}
          ${row("Customer ID", p.stripe_customer_id)}
          ${p.extra_note ? `<tr><td colspan="2" style="padding-top:12px;color:#64748b;font-size:13px;font-style:italic;">${p.extra_note}</td></tr>` : ""}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px;border-top:1px solid #e2e8f0;background:#f8fafc;">
        <p style="margin:0;font-size:12px;color:#64748b;">
          Sent by ugccolombia.co · Stripe webhook · <a href="https://dashboard.stripe.com" style="color:${meta.color};text-decoration:none;">Ver en Stripe →</a>
        </p>
      </td>
    </tr>
  </table>
</body></html>`;

  return { subject, html };
}

export async function notifyAdmin(payload: AdminAlertPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_NOTIFY_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "UGC Colombia <hola@ugccolombia.co>";

  if (!apiKey || !to) {
    console.warn("[notifyAdmin] RESEND_API_KEY o RESEND_NOTIFY_EMAIL faltan — skip");
    return;
  }

  const { subject, html } = renderAdminEmail(payload);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("[notifyAdmin] Resend error", res.status, text);
    }
  } catch (err) {
    console.error("[notifyAdmin] fetch failed", err);
  }
}
