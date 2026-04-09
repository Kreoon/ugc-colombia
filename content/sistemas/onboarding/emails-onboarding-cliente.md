# Secuencia de Emails — Onboarding Cliente Nuevo
## UGC Colombia · Sistema de Retención Premium

> **Sender:** Alexander Cast `<founder@ugccolombia.co>`
> **Plataforma de envío:** Resend
> **Segmento:** Clientes nuevos ticket $500–$1,500/mes
> **Variables globales:** `{{cliente_nombre}}` · `{{empresa}}` · `{{plan}}` · `{{portal_url}}` · `{{kickoff_url}}` · `{{brief_url}}` · `{{reporte_url}}`
> **Última actualización:** 2026-04-08

---

## EMAIL 1 — D0 · Bienvenida Inmediata Post-firma

**Timing:** Envío automático a los 5 minutos de firma del contrato / pago confirmado
**Asunto:** ✅ Ya estás dentro — próximos pasos (47 chars)
**Preview text:** Accede al portal, agenda el kickoff y conoce cómo funciona tu primer mes con UGC Colombia. (92 chars — truncar en cliente a 85: "Accede al portal, agenda el kickoff y conoce cómo funciona tu primer mes.")

---

```html
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Inter',Arial,sans-serif;">

  <!-- Header -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-bottom:1px solid #FFD60A;">
    <tr>
      <td style="padding:32px 40px;">
        <span style="color:#FFD60A;font-size:13px;font-weight:600;
                     letter-spacing:0.15em;text-transform:uppercase;">
          UGC COLOMBIA
        </span>
      </td>
      <td align="right" style="padding:32px 40px;">
        <span style="color:#9CA3AF;font-size:12px;">ugccolombia.co</span>
      </td>
    </tr>
  </table>

  <!-- Hero -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;">
    <tr>
      <td style="padding:48px 40px 32px;">
        <p style="margin:0 0 8px;color:#FFD60A;font-size:12px;
                  font-weight:600;letter-spacing:0.15em;text-transform:uppercase;">
          BIENVENIDO A BORDO
        </p>
        <h1 style="margin:0 0 24px;color:#FFFFFF;font-size:32px;
                   font-weight:700;line-height:1.2;">
          {{cliente_nombre}}, tu pipeline creativo<br>ya está en marcha.
        </h1>
        <p style="margin:0 0 32px;color:#D1D5DB;font-size:16px;line-height:1.6;">
          Gracias por confiar en UGC Colombia. Desde hoy tienes acceso a tu portal,
          a tu equipo y al proceso que convierte marcas con fatiga creativa en marcas
          que lanzan 20+ variantes al mes.
        </p>
        <p style="margin:0 0 8px;color:#FFFFFF;font-size:15px;font-weight:600;">
          Plan activado: <span style="color:#FFD60A;">{{plan}}</span>
        </p>
      </td>
    </tr>
  </table>

  <!-- Próximos pasos -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#111111;border-top:1px solid #222222;
                border-bottom:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 24px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          TUS 3 PASOS DE HOY
        </p>

        <!-- Paso 1 -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
          <tr>
            <td width="40" valign="top">
              <span style="display:inline-block;width:32px;height:32px;
                           background:#FFD60A;border-radius:0;
                           text-align:center;line-height:32px;
                           color:#0A0A0A;font-weight:700;font-size:14px;">1</span>
            </td>
            <td style="padding-left:16px;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:15px;font-weight:600;">
                Accede a tu portal en Kreoon
              </p>
              <p style="margin:0;color:#9CA3AF;font-size:14px;line-height:1.5;">
                Aquí vive todo: briefs, casting, videos en revisión y entregables finales.
                Sin Drive disperso, sin cadenas de WhatsApp.
              </p>
              <a href="{{portal_url}}"
                 style="display:inline-block;margin-top:12px;padding:10px 20px;
                        background:#DC2626;color:#FFFFFF;font-size:13px;
                        font-weight:600;text-decoration:none;letter-spacing:0.05em;">
                ENTRAR AL PORTAL →
              </a>
            </td>
          </tr>
        </table>

        <!-- Paso 2 -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
          <tr>
            <td width="40" valign="top">
              <span style="display:inline-block;width:32px;height:32px;
                           background:#FFD60A;border-radius:0;
                           text-align:center;line-height:32px;
                           color:#0A0A0A;font-weight:700;font-size:14px;">2</span>
            </td>
            <td style="padding-left:16px;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:15px;font-weight:600;">
                Agenda tu kickoff call
              </p>
              <p style="margin:0;color:#9CA3AF;font-size:14px;line-height:1.5;">
                45 minutos en los que definimos ángulos, creadores y cronograma del primer batch.
                Es la reunión más importante del mes — no la saltes.
              </p>
              <a href="{{kickoff_url}}"
                 style="display:inline-block;margin-top:12px;padding:10px 20px;
                        background:#DC2626;color:#FFFFFF;font-size:13px;
                        font-weight:600;text-decoration:none;letter-spacing:0.05em;">
                AGENDAR KICKOFF →
              </a>
            </td>
          </tr>
        </table>

        <!-- Paso 3 -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="40" valign="top">
              <span style="display:inline-block;width:32px;height:32px;
                           background:#FFD60A;border-radius:0;
                           text-align:center;line-height:32px;
                           color:#0A0A0A;font-weight:700;font-size:14px;">3</span>
            </td>
            <td style="padding-left:16px;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:15px;font-weight:600;">
                Revisa tu email en las próximas 2 horas
              </p>
              <p style="margin:0;color:#9CA3AF;font-size:14px;line-height:1.5;">
                Alexander te escribe personalmente. Ese email llega hoy.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Tu equipo -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 20px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          TU EQUIPO DESDE HOY
        </p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:0 16px 0 0;vertical-align:top;width:50%;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:14px;font-weight:600;">
                Alexander Cast
              </p>
              <p style="margin:0;color:#9CA3AF;font-size:13px;">Estrategia y cuenta</p>
            </td>
            <td style="padding:0 0 0 16px;vertical-align:top;width:50%;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:14px;font-weight:600;">
                Diana Mile
              </p>
              <p style="margin:0;color:#9CA3AF;font-size:13px;">Talent y casting</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:24px 40px;">
        <p style="margin:0;color:#4B5563;font-size:12px;line-height:1.5;">
          UGC Colombia · ugccolombia.co · Bogotá, Colombia<br>
          ¿Tienes una duda urgente?
          <a href="mailto:founder@ugccolombia.co"
             style="color:#FFD60A;text-decoration:none;">founder@ugccolombia.co</a>
        </p>
      </td>
    </tr>
  </table>

</body>
</html>
```

**CTA principal:** ENTRAR AL PORTAL / AGENDAR KICKOFF
**Variables:** `{{cliente_nombre}}` · `{{plan}}` · `{{portal_url}}` · `{{kickoff_url}}`

---

## EMAIL 2 — D0 · Nota Personal de Alexander

**Timing:** 2–3 horas después del Email 1 (delay configurado en Resend)
**Asunto:** Un mensaje directo de mi parte (39 chars)
**Preview text:** Por qué empecé UGC Colombia y qué significa para mí que estés aquí. 90 segundos de lectura. (93 chars — recortar a 85: "Por qué empecé UGC Colombia y qué significa que estés aquí.")

---

```html
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#F5F5F0;font-family:'Inter',Arial,sans-serif;">

  <!-- Header mínimo -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#F5F5F0;border-bottom:2px solid #FFD60A;">
    <tr>
      <td style="padding:28px 40px;">
        <span style="color:#1A1A1A;font-size:13px;font-weight:600;
                     letter-spacing:0.12em;text-transform:uppercase;">
          UGC COLOMBIA
        </span>
      </td>
    </tr>
  </table>

  <!-- Body personal -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#F5F5F0;">
    <tr>
      <td style="padding:48px 40px 0;">
        <p style="margin:0 0 24px;color:#6B7280;font-size:13px;
                  font-weight:600;letter-spacing:0.12em;text-transform:uppercase;">
          DE ALEXANDER CAST
        </p>
        <h2 style="margin:0 0 28px;color:#1A1A1A;font-size:26px;
                   font-weight:700;line-height:1.3;">
          {{cliente_nombre}}, esto no es un email automático.
        </h2>
        <p style="margin:0 0 20px;color:#374151;font-size:16px;line-height:1.7;">
          Bueno, técnicamente sí lo es. Pero el texto lo escribí yo.
        </p>
        <p style="margin:0 0 20px;color:#374151;font-size:16px;line-height:1.7;">
          Monté UGC Colombia porque me cansé de ver cómo las marcas latinas pagaban
          $1,500–$2,000 por un clip de 30 segundos en Miami —y el resultado era
          genérico, no convertía, y no había nadie al otro lado del teléfono para
          iterar. El problema no era el precio. Era la falta de sistema.
        </p>
        <p style="margin:0 0 20px;color:#374151;font-size:16px;line-height:1.7;">
          Hoy tenemos el sistema. Y a ti te lo estamos abriendo.
        </p>
        <p style="margin:0 0 20px;color:#374151;font-size:16px;line-height:1.7;">
          Lo que espero de este primer mes contigo:
        </p>

        <!-- Lista de compromisos -->
        <table width="100%" cellpadding="0" cellspacing="0"
               style="margin-bottom:24px;">
          <tr>
            <td style="padding:16px;background:#FFFFFF;
                       border-left:3px solid #FFD60A;margin-bottom:8px;">
              <p style="margin:0;color:#1A1A1A;font-size:15px;line-height:1.5;">
                <strong>Transparencia total.</strong> Sabes exactamente qué está
                en producción, qué está en revisión y qué se entregó. Sin cajas negras.
              </p>
            </td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0"
               style="margin-bottom:8px;">
          <tr>
            <td style="padding:16px;background:#FFFFFF;
                       border-left:3px solid #FFD60A;">
              <p style="margin:0;color:#1A1A1A;font-size:15px;line-height:1.5;">
                <strong>Resultados medibles.</strong> Cada video tiene un ángulo.
                Cada ángulo tiene una hipótesis. Vamos a testear, no a adivinar.
              </p>
            </td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0"
               style="margin:8px 0 24px;">
          <tr>
            <td style="padding:16px;background:#FFFFFF;
                       border-left:3px solid #FFD60A;">
              <p style="margin:0;color:#1A1A1A;font-size:15px;line-height:1.5;">
                <strong>Un equipo real.</strong> Diana maneja el casting. Samuel
                cuida la plataforma. Tanya acompaña el proceso. Yo superviso la cuenta.
              </p>
            </td>
          </tr>
        </table>

        <!-- Video Loom opcional -->
        <table width="100%" cellpadding="0" cellspacing="0"
               style="margin-bottom:32px;background:#1A1A1A;">
          <tr>
            <td style="padding:28px;text-align:center;">
              <p style="margin:0 0 12px;color:#9CA3AF;font-size:12px;
                        letter-spacing:0.1em;text-transform:uppercase;">
                VIDEO OPCIONAL — 3 MINUTOS
              </p>
              <p style="margin:0 0 20px;color:#FFFFFF;font-size:15px;font-weight:600;">
                Te explico en video cómo funciona el primer mes
              </p>
              <!-- REEMPLAZAR href CON URL DE LOOM REAL -->
              <a href="{{loom_url}}"
                 style="display:inline-block;padding:12px 28px;
                        background:#DC2626;color:#FFFFFF;font-size:13px;
                        font-weight:600;text-decoration:none;letter-spacing:0.06em;">
                VER VIDEO DE BIENVENIDA →
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.7;">
          Nos vemos en el kickoff. Si tienes alguna pregunta antes, responde
          directamente a este email — llega a mi bandeja.
        </p>
        <p style="margin:0 0 4px;color:#1A1A1A;font-size:16px;font-weight:600;">
          Alexander Cast
        </p>
        <p style="margin:0 0 40px;color:#6B7280;font-size:14px;">
          Founder · UGC Colombia
        </p>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#F5F5F0;border-top:1px solid #E5E5E5;">
    <tr>
      <td style="padding:24px 40px;">
        <p style="margin:0;color:#9CA3AF;font-size:12px;line-height:1.5;">
          UGC Colombia · ugccolombia.co ·
          <a href="mailto:founder@ugccolombia.co"
             style="color:#FFD60A;text-decoration:none;">founder@ugccolombia.co</a>
        </p>
      </td>
    </tr>
  </table>

</body>
</html>
```

**CTA principal:** VER VIDEO DE BIENVENIDA (si existe Loom) · Sin CTA si no hay video — el email es relacional
**Variables:** `{{cliente_nombre}}` · `{{loom_url}}` (opcional — omitir bloque si no existe)

---

## EMAIL 3 — D1 · Recordatorio Kickoff 24h Antes

**Timing:** 24 horas antes de la kickoff call agendada
**Trigger:** Basado en fecha de la reunión en el calendario (Resend + integración de calendario)
**Asunto:** Tu kickoff es mañana — prepárate en 10 min (48 chars)
**Preview text:** Agenda, 3 documentos que necesitas tener listos y lo que vamos a decidir juntos mañana. (89 chars — recortar a 85: "Agenda, 3 docs que necesitas tener listos y lo que decidimos mañana.")

---

```html
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Inter',Arial,sans-serif;">

  <!-- Header -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-bottom:1px solid #FFD60A;">
    <tr>
      <td style="padding:28px 40px;">
        <span style="color:#FFD60A;font-size:13px;font-weight:600;
                     letter-spacing:0.15em;text-transform:uppercase;">
          UGC COLOMBIA
        </span>
      </td>
      <td align="right" style="padding:28px 40px;">
        <span style="color:#9CA3AF;font-size:12px;">Kickoff Reminder</span>
      </td>
    </tr>
  </table>

  <!-- Hero -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;">
    <tr>
      <td style="padding:48px 40px 32px;">
        <p style="margin:0 0 8px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          MAÑANA ES EL DÍA
        </p>
        <h1 style="margin:0 0 16px;color:#FFFFFF;font-size:28px;
                   font-weight:700;line-height:1.3;">
          Kickoff con {{empresa}} — {{kickoff_fecha}} · {{kickoff_hora}}
        </h1>
        <p style="margin:0 0 28px;color:#D1D5DB;font-size:15px;line-height:1.6;">
          En 45 minutos vamos a definir lo que tu primer batch necesita para performar.
          Esta es la reunión más importante del mes. Aquí va la agenda completa.
        </p>
        <a href="{{kickoff_url}}"
           style="display:inline-block;padding:12px 24px;background:#DC2626;
                  color:#FFFFFF;font-size:13px;font-weight:600;
                  text-decoration:none;letter-spacing:0.06em;">
          VER INVITACIÓN EN CALENDARIO →
        </a>
      </td>
    </tr>
  </table>

  <!-- Agenda -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#111111;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 24px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          AGENDA DE 45 MINUTOS
        </p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <!-- Item 1 -->
          <tr>
            <td width="60" valign="top"
                style="padding:0 16px 20px 0;color:#9CA3AF;font-size:13px;
                       font-weight:600;font-family:monospace;">
              0:00
            </td>
            <td style="padding:0 0 20px;border-bottom:1px solid #222222;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:14px;font-weight:600;">
                Contexto de marca (tú hablas, nosotros escuchamos)
              </p>
              <p style="margin:0;color:#6B7280;font-size:13px;">
                Producto, audiencia, propuesta de valor, qué ha funcionado antes.
              </p>
            </td>
          </tr>
          <!-- Item 2 -->
          <tr>
            <td width="60" valign="top"
                style="padding:12px 16px 20px 0;color:#9CA3AF;font-size:13px;
                       font-weight:600;font-family:monospace;">
              0:10
            </td>
            <td style="padding:12px 0 20px;border-bottom:1px solid #222222;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:14px;font-weight:600;">
                Definición de ángulos y hooks del primer batch
              </p>
              <p style="margin:0;color:#6B7280;font-size:13px;">
                Presentamos 4–6 hipótesis de ángulo basadas en tu ICP.
                Tú validas, ajustas, priorizas.
              </p>
            </td>
          </tr>
          <!-- Item 3 -->
          <tr>
            <td width="60" valign="top"
                style="padding:12px 16px 20px 0;color:#9CA3AF;font-size:13px;
                       font-weight:600;font-family:monospace;">
              0:25
            </td>
            <td style="padding:12px 0 20px;border-bottom:1px solid #222222;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:14px;font-weight:600;">
                Presentación de creadores candidatos
              </p>
              <p style="margin:0;color:#6B7280;font-size:13px;">
                Diana presenta el shortlist de 3–5 perfiles. Seleccionamos juntos.
              </p>
            </td>
          </tr>
          <!-- Item 4 -->
          <tr>
            <td width="60" valign="top"
                style="padding:12px 16px 0 0;color:#9CA3AF;font-size:13px;
                       font-weight:600;font-family:monospace;">
              0:35
            </td>
            <td style="padding:12px 0 0;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:14px;font-weight:600;">
                Cronograma y siguientes pasos
              </p>
              <p style="margin:0;color:#6B7280;font-size:13px;">
                Fechas de dossier, producción y entrega. Cómo funciona la revisión.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Documentos a tener listos -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 20px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          TEN LISTO ANTES DE ENTRAR
        </p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1F1F1F;">
              <p style="margin:0;color:#FFFFFF;font-size:14px;">
                <span style="color:#FFD60A;font-weight:700;margin-right:10px;">→</span>
                <strong>Tu propuesta de valor en 1 párrafo</strong>
                <span style="color:#6B7280;"> — qué haces, para quién, por qué te eligen</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1F1F1F;">
              <p style="margin:0;color:#FFFFFF;font-size:14px;">
                <span style="color:#FFD60A;font-weight:700;margin-right:10px;">→</span>
                <strong>2–3 creatividades que hayan funcionado</strong>
                <span style="color:#6B7280;"> — o las peores si nunca han funcionado</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;">
              <p style="margin:0;color:#FFFFFF;font-size:14px;">
                <span style="color:#FFD60A;font-weight:700;margin-right:10px;">→</span>
                <strong>Acceso de lectura a tu Ads Manager</strong>
                <span style="color:#6B7280;"> — solo para ver métricas, no para editar</span>
              </p>
            </td>
          </tr>
        </table>

        <div style="margin-top:28px;padding:20px;background:#1A1A1A;
                    border-left:3px solid #FFD60A;">
          <p style="margin:0;color:#FFFFFF;font-size:14px;line-height:1.6;">
            <strong style="color:#FFD60A;">Tip:</strong> Si no tienes las creatividades
            anteriores a mano, no te preocupes — llegamos igualmente. Pero tenerlas
            nos ahorra 10 minutos valiosos de la reunión.
          </p>
        </div>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:24px 40px;">
        <p style="margin:0;color:#4B5563;font-size:12px;">
          ¿Necesitas reagendar?
          <a href="{{kickoff_url}}"
             style="color:#FFD60A;text-decoration:none;">Hazlo aquí</a>
          con al menos 12 horas de anticipación.
        </p>
      </td>
    </tr>
  </table>

</body>
</html>
```

**CTA principal:** VER INVITACIÓN EN CALENDARIO
**Variables:** `{{empresa}}` · `{{kickoff_fecha}}` · `{{kickoff_hora}}` · `{{kickoff_url}}`

---

## EMAIL 4 — D2 · Post-Kickoff: Resumen + Brand Brief Form

**Timing:** 2–4 horas después de que termine la kickoff call
**Trigger:** Manual o semi-automático (Resend + webhook de CRM al cerrar reunión)
**Asunto:** Resumen del kickoff + tu siguiente paso (43 chars)
**Preview text:** Todo lo que acordamos hoy en un email. El brand brief te toma 12 minutos y desbloquea producción. (98 chars — recortar a 85: "Todo lo que acordamos hoy. El brand brief te toma 12 min y desbloquea producción.")

---

```html
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#F5F5F0;font-family:'Inter',Arial,sans-serif;">

  <!-- Header -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#F5F5F0;border-bottom:2px solid #FFD60A;">
    <tr>
      <td style="padding:28px 40px;">
        <span style="color:#1A1A1A;font-size:13px;font-weight:600;
                     letter-spacing:0.12em;text-transform:uppercase;">
          UGC COLOMBIA
        </span>
      </td>
      <td align="right" style="padding:28px 40px;">
        <span style="color:#6B7280;font-size:12px;">Post-Kickoff</span>
      </td>
    </tr>
  </table>

  <!-- Hero -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#F5F5F0;">
    <tr>
      <td style="padding:48px 40px 32px;">
        <p style="margin:0 0 8px;color:#374151;font-size:13px;font-weight:600;
                  letter-spacing:0.12em;text-transform:uppercase;">
          RESUMEN DE HOY
        </p>
        <h1 style="margin:0 0 20px;color:#1A1A1A;font-size:26px;
                   font-weight:700;line-height:1.3;">
          Muy buena sesión, {{cliente_nombre}}. Aquí está todo lo que acordamos.
        </h1>
        <p style="margin:0 0 0;color:#374151;font-size:15px;line-height:1.6;">
          Este resumen queda como referencia oficial del primer batch.
          Si algo no está correcto, responde este email antes de las 6 pm de hoy.
        </p>
      </td>
    </tr>
  </table>

  <!-- Resumen acordado -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#FFFFFF;border-top:1px solid #E5E5E5;
                border-bottom:1px solid #E5E5E5;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 24px;color:#1A1A1A;font-size:12px;font-weight:600;
                  letter-spacing:0.12em;text-transform:uppercase;">
          ACUERDOS DEL KICKOFF
        </p>

        <!-- Ángulos -->
        <p style="margin:0 0 8px;color:#1A1A1A;font-size:14px;font-weight:600;">
          Ángulos aprobados para el Batch 1
        </p>
        <p style="margin:0 0 4px;color:#374151;font-size:14px;">
          • <strong>{{angulo_1}}</strong> — {{angulo_1_desc}}
        </p>
        <p style="margin:0 0 4px;color:#374151;font-size:14px;">
          • <strong>{{angulo_2}}</strong> — {{angulo_2_desc}}
        </p>
        <p style="margin:0 0 24px;color:#374151;font-size:14px;">
          • <strong>{{angulo_3}}</strong> — {{angulo_3_desc}}
        </p>

        <div style="height:1px;background:#E5E5E5;margin-bottom:24px;"></div>

        <!-- Creadores -->
        <p style="margin:0 0 8px;color:#1A1A1A;font-size:14px;font-weight:600;">
          Creadores seleccionados
        </p>
        <p style="margin:0 0 24px;color:#374151;font-size:14px;line-height:1.6;">
          {{creadores_seleccionados}}
          <br><span style="color:#6B7280;font-size:13px;">
            Diana confirma disponibilidad en las próximas 24h.
          </span>
        </p>

        <div style="height:1px;background:#E5E5E5;margin-bottom:24px;"></div>

        <!-- Cronograma -->
        <p style="margin:0 0 16px;color:#1A1A1A;font-size:14px;font-weight:600;">
          Cronograma del Batch 1
        </p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #F0F0F0;width:50%;">
              <p style="margin:0;color:#6B7280;font-size:13px;">Dossier de marca listo</p>
            </td>
            <td style="padding:8px 0;border-bottom:1px solid #F0F0F0;text-align:right;">
              <p style="margin:0;color:#1A1A1A;font-size:13px;font-weight:600;">
                {{fecha_dossier}}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #F0F0F0;">
              <p style="margin:0;color:#6B7280;font-size:13px;">Grabaciones</p>
            </td>
            <td style="padding:8px 0;border-bottom:1px solid #F0F0F0;text-align:right;">
              <p style="margin:0;color:#1A1A1A;font-size:13px;font-weight:600;">
                {{fecha_grabaciones}}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;">
              <p style="margin:0;color:#6B7280;font-size:13px;">Entrega estimada</p>
            </td>
            <td style="padding:8px 0;text-align:right;">
              <p style="margin:0;color:#1A1A1A;font-size:13px;font-weight:600;">
                {{fecha_entrega}}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Brand Brief CTA -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#1A1A1A;">
    <tr>
      <td style="padding:40px;text-align:center;">
        <p style="margin:0 0 8px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          TU ACCIÓN HOY
        </p>
        <h2 style="margin:0 0 16px;color:#FFFFFF;font-size:22px;font-weight:700;">
          Completa el Brand Brief (12 min)
        </h2>
        <p style="margin:0 0 24px;color:#9CA3AF;font-size:14px;line-height:1.6;
                  max-width:440px;margin-left:auto;margin-right:auto;">
          Este formulario le da a Diana y al equipo creativo todo lo que necesitan
          para que los guiones sean 100% fieles a tu marca. Sin esto, no podemos
          arrancar grabaciones.
        </p>
        <a href="{{brief_url}}"
           style="display:inline-block;padding:14px 32px;background:#DC2626;
                  color:#FFFFFF;font-size:14px;font-weight:600;
                  text-decoration:none;letter-spacing:0.06em;">
          COMPLETAR BRAND BRIEF →
        </a>
        <p style="margin:16px 0 0;color:#4B5563;font-size:12px;">
          Plazo: {{brief_deadline}} · Tiempo estimado: 12 minutos
        </p>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#F5F5F0;border-top:1px solid #E5E5E5;">
    <tr>
      <td style="padding:24px 40px;">
        <p style="margin:0;color:#9CA3AF;font-size:12px;">
          UGC Colombia · Alexander Cast ·
          <a href="mailto:founder@ugccolombia.co"
             style="color:#6B7280;text-decoration:none;">founder@ugccolombia.co</a>
        </p>
      </td>
    </tr>
  </table>

</body>
</html>
```

**CTA principal:** COMPLETAR BRAND BRIEF
**Variables:** `{{cliente_nombre}}` · `{{angulo_1}}` · `{{angulo_2}}` · `{{angulo_3}}` · `{{angulo_X_desc}}` · `{{creadores_seleccionados}}` · `{{fecha_dossier}}` · `{{fecha_grabaciones}}` · `{{fecha_entrega}}` · `{{brief_url}}` · `{{brief_deadline}}`

---

## EMAIL 5 — D5 · Dossier de Marca Listo para Aprobación

**Timing:** D5 (o el día exacto en que el dossier está listo en Kreoon)
**Asunto:** Tu dossier de marca está listo ✍️ (38 chars)
**Preview text:** Revisa los guiones, los ángulos y los perfiles de creador antes de que arranquen las grabaciones. (98 — recortar: "Revisa guiones y perfiles de creador antes de que empiecen las grabaciones.")

---

```html
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Inter',Arial,sans-serif;">

  <!-- Header -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-bottom:1px solid #FFD60A;">
    <tr>
      <td style="padding:28px 40px;">
        <span style="color:#FFD60A;font-size:13px;font-weight:600;
                     letter-spacing:0.15em;text-transform:uppercase;">
          UGC COLOMBIA
        </span>
      </td>
      <td align="right" style="padding:28px 40px;">
        <span style="color:#9CA3AF;font-size:12px;">Aprobación requerida</span>
      </td>
    </tr>
  </table>

  <!-- Hero -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;">
    <tr>
      <td style="padding:48px 40px 32px;">
        <p style="margin:0 0 8px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          REQUIERE TU APROBACIÓN
        </p>
        <h1 style="margin:0 0 20px;color:#FFFFFF;font-size:28px;
                   font-weight:700;line-height:1.3;">
          El dossier de {{empresa}} está en el portal, listo para revisión.
        </h1>
        <p style="margin:0 0 28px;color:#D1D5DB;font-size:15px;line-height:1.6;">
          Aquí vive todo lo que guiará la producción: guiones por ángulo,
          perfiles de creadores confirmados y notas de dirección.
          Tu aprobación desbloquea las grabaciones.
        </p>
        <a href="{{portal_url}}"
           style="display:inline-block;padding:14px 28px;background:#DC2626;
                  color:#FFFFFF;font-size:13px;font-weight:600;
                  text-decoration:none;letter-spacing:0.06em;">
          REVISAR DOSSIER EN KREOON →
        </a>
      </td>
    </tr>
  </table>

  <!-- Qué contiene el dossier -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#111111;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 20px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          QUÉ ENCUENTRAS ADENTRO
        </p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1F1F1F;">
              <p style="margin:0;color:#FFFFFF;font-size:14px;line-height:1.5;">
                <span style="color:#FFD60A;font-weight:700;margin-right:8px;">01</span>
                <strong>{{n_guiones}} guiones</strong>
                <span style="color:#6B7280;"> — uno por ángulo aprobado en el kickoff</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1F1F1F;">
              <p style="margin:0;color:#FFFFFF;font-size:14px;line-height:1.5;">
                <span style="color:#FFD60A;font-weight:700;margin-right:8px;">02</span>
                <strong>{{n_creadores}} perfiles de creador</strong>
                <span style="color:#6B7280;"> — con portafolio y fit de marca</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1F1F1F;">
              <p style="margin:0;color:#FFFFFF;font-size:14px;line-height:1.5;">
                <span style="color:#FFD60A;font-weight:700;margin-right:8px;">03</span>
                <strong>Notas de dirección</strong>
                <span style="color:#6B7280;"> — tono, look, qué evitar en cámara</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;">
              <p style="margin:0;color:#FFFFFF;font-size:14px;line-height:1.5;">
                <span style="color:#FFD60A;font-weight:700;margin-right:8px;">04</span>
                <strong>Cronograma de grabación</strong>
                <span style="color:#6B7280;"> — fechas comprometidas por creador</span>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Cómo funciona la revisión -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 16px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          CÓMO FUNCIONA LA REVISIÓN
        </p>
        <p style="margin:0 0 12px;color:#D1D5DB;font-size:14px;line-height:1.6;">
          Tienes <strong style="color:#FFFFFF;">48 horas</strong> para
          aprobar o pedir ajustes en el portal.
          Puedes comentar directamente en cada guión — no necesitas enviar un
          email separado.
        </p>
        <p style="margin:0 0 28px;color:#D1D5DB;font-size:14px;line-height:1.6;">
          Si no recibimos respuesta en 48h, asumimos aprobación y las
          grabaciones arrancan según el cronograma.
        </p>
        <a href="{{portal_url}}"
           style="display:inline-block;padding:12px 24px;
                  border:1px solid #FFD60A;color:#FFD60A;font-size:13px;
                  font-weight:600;text-decoration:none;letter-spacing:0.06em;">
          IR AL PORTAL →
        </a>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:24px 40px;">
        <p style="margin:0;color:#4B5563;font-size:12px;">
          UGC Colombia · Plazo de aprobación: {{deadline_aprobacion}} ·
          <a href="mailto:founder@ugccolombia.co"
             style="color:#FFD60A;text-decoration:none;">founder@ugccolombia.co</a>
        </p>
      </td>
    </tr>
  </table>

</body>
</html>
```

**CTA principal:** REVISAR DOSSIER EN KREOON
**Variables:** `{{empresa}}` · `{{portal_url}}` · `{{n_guiones}}` · `{{n_creadores}}` · `{{deadline_aprobacion}}`

---

## EMAIL 6 — D10 · Primer Batch en Producción

**Timing:** D10 (o cuando el primer video entra a post-producción)
**Asunto:** Las cámaras ya están rodando 🎬 (35 chars)
**Preview text:** Tu primer batch está en producción. Así es el proceso detrás de cada video que estamos grabando. (98 — recortar: "Tu primer batch está en producción. Así se ve el proceso desde adentro.")

---

```html
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Inter',Arial,sans-serif;">

  <!-- Header -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-bottom:1px solid #FFD60A;">
    <tr>
      <td style="padding:28px 40px;">
        <span style="color:#FFD60A;font-size:13px;font-weight:600;
                     letter-spacing:0.15em;text-transform:uppercase;">
          UGC COLOMBIA
        </span>
      </td>
      <td align="right" style="padding:28px 40px;">
        <span style="color:#9CA3AF;font-size:12px;">Actualización de producción</span>
      </td>
    </tr>
  </table>

  <!-- Hero -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;">
    <tr>
      <td style="padding:48px 40px 32px;">
        <p style="margin:0 0 8px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          EN PRODUCCIÓN
        </p>
        <h1 style="margin:0 0 20px;color:#FFFFFF;font-size:28px;
                   font-weight:700;line-height:1.3;">
          {{n_videos}} videos en cámara.<br>
          Entrega estimada: {{fecha_entrega}}.
        </h1>
        <p style="margin:0 0 0;color:#D1D5DB;font-size:15px;line-height:1.6;">
          No tienes que hacer nada hoy. Este update es para que veas exactamente
          en qué punto estamos — porque la transparencia no es un accesorio, es parte
          del servicio.
        </p>
      </td>
    </tr>
  </table>

  <!-- Estado del batch -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#111111;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 24px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          ESTADO DEL BATCH 1
        </p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr style="background:#1F1F1F;">
            <td style="padding:10px 16px;">
              <p style="margin:0;color:#9CA3AF;font-size:12px;font-weight:600;
                         text-transform:uppercase;letter-spacing:0.1em;">
                FASE
              </p>
            </td>
            <td style="padding:10px 16px;">
              <p style="margin:0;color:#9CA3AF;font-size:12px;font-weight:600;
                         text-transform:uppercase;letter-spacing:0.1em;">
                ESTADO
              </p>
            </td>
            <td style="padding:10px 16px;">
              <p style="margin:0;color:#9CA3AF;font-size:12px;font-weight:600;
                         text-transform:uppercase;letter-spacing:0.1em;">
                FECHA
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;border-bottom:1px solid #222222;">
              <p style="margin:0;color:#FFFFFF;font-size:13px;">Brief aprobado</p>
            </td>
            <td style="padding:12px 16px;border-bottom:1px solid #222222;">
              <span style="color:#22C55E;font-size:12px;font-weight:600;">
                ✓ LISTO
              </span>
            </td>
            <td style="padding:12px 16px;border-bottom:1px solid #222222;">
              <p style="margin:0;color:#6B7280;font-size:13px;">{{fecha_brief}}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;border-bottom:1px solid #222222;">
              <p style="margin:0;color:#FFFFFF;font-size:13px;">Grabaciones</p>
            </td>
            <td style="padding:12px 16px;border-bottom:1px solid #222222;">
              <span style="color:#FFD60A;font-size:12px;font-weight:600;">
                ● EN CURSO
              </span>
            </td>
            <td style="padding:12px 16px;border-bottom:1px solid #222222;">
              <p style="margin:0;color:#6B7280;font-size:13px;">{{fecha_grabaciones}}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;border-bottom:1px solid #222222;">
              <p style="margin:0;color:#FFFFFF;font-size:13px;">Edición y color</p>
            </td>
            <td style="padding:12px 16px;border-bottom:1px solid #222222;">
              <span style="color:#6B7280;font-size:12px;font-weight:600;">
                ○ PENDIENTE
              </span>
            </td>
            <td style="padding:12px 16px;border-bottom:1px solid #222222;">
              <p style="margin:0;color:#6B7280;font-size:13px;">{{fecha_edicion}}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;">
              <p style="margin:0;color:#FFFFFF;font-size:13px;">Entrega en portal</p>
            </td>
            <td style="padding:12px 16px;">
              <span style="color:#6B7280;font-size:12px;font-weight:600;">
                ○ PENDIENTE
              </span>
            </td>
            <td style="padding:12px 16px;">
              <p style="margin:0;color:#6B7280;font-size:13px;">{{fecha_entrega}}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Behind the scenes -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 16px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          QUÉ PASA MIENTRAS TANTO
        </p>
        <p style="margin:0 0 12px;color:#D1D5DB;font-size:14px;line-height:1.6;">
          Diana está en comunicación directa con los creadores. Cada guión se ensaya
          antes de grabar — no improvisamos frente a cámara.
        </p>
        <p style="margin:0 0 12px;color:#D1D5DB;font-size:14px;line-height:1.6;">
          Una vez grabados, los videos pasan por edición, subtítulos y revisión
          de calidad interna. Solo llegan a tu portal cuando cumplen el estándar.
        </p>
        <p style="margin:0 0 28px;color:#D1D5DB;font-size:14px;line-height:1.6;">
          Cuando estén listos, te avisamos por email y puedes revisarlos directamente
          en Kreoon.
        </p>
        <a href="{{portal_url}}"
           style="display:inline-block;padding:12px 24px;
                  border:1px solid #333333;color:#9CA3AF;font-size:13px;
                  font-weight:600;text-decoration:none;letter-spacing:0.06em;">
          VER ESTADO EN EL PORTAL →
        </a>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:24px 40px;">
        <p style="margin:0;color:#4B5563;font-size:12px;">
          UGC Colombia · ugccolombia.co ·
          <a href="mailto:founder@ugccolombia.co"
             style="color:#FFD60A;text-decoration:none;">founder@ugccolombia.co</a>
        </p>
      </td>
    </tr>
  </table>

</body>
</html>
```

**CTA principal:** VER ESTADO EN EL PORTAL (secundario, no urgente)
**Variables:** `{{n_videos}}` · `{{fecha_entrega}}` · `{{fecha_brief}}` · `{{fecha_grabaciones}}` · `{{fecha_edicion}}` · `{{portal_url}}`

---

## EMAIL 7 — D18 · Primer Batch Entregado

**Timing:** El día en que los videos aparecen en el portal (trigger basado en evento de Kreoon)
**Asunto:** Tu primer batch está listo para revisar (42 chars)
**Preview text:** {{n_videos}} videos en tu portal. Así revisas, apruebas y pides ajustes — sin emails de ida y vuelta. (102 — recortar: "{{n_videos}} videos en tu portal. Así revisas y apruebas sin emails de ida y vuelta.")

---

```html
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Inter',Arial,sans-serif;">

  <!-- Header -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-bottom:1px solid #FFD60A;">
    <tr>
      <td style="padding:28px 40px;">
        <span style="color:#FFD60A;font-size:13px;font-weight:600;
                     letter-spacing:0.15em;text-transform:uppercase;">
          UGC COLOMBIA
        </span>
      </td>
      <td align="right" style="padding:28px 40px;">
        <span style="color:#9CA3AF;font-size:12px;">Batch 1 entregado</span>
      </td>
    </tr>
  </table>

  <!-- Hero -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;">
    <tr>
      <td style="padding:48px 40px 32px;">
        <p style="margin:0 0 8px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          ENTREGA — BATCH 1
        </p>
        <h1 style="margin:0 0 20px;color:#FFFFFF;font-size:30px;
                   font-weight:700;line-height:1.2;">
          {{n_videos}} videos. Listos en tu portal.
        </h1>
        <p style="margin:0 0 28px;color:#D1D5DB;font-size:15px;line-height:1.6;">
          Este es el momento que define el mes. Tienes
          <strong style="color:#FFFFFF;">{{dias_revision}} días hábiles</strong>
          para revisar y solicitar ajustes. Te explicamos exactamente cómo hacerlo.
        </p>
        <a href="{{portal_url}}"
           style="display:inline-block;padding:14px 32px;background:#DC2626;
                  color:#FFFFFF;font-size:14px;font-weight:600;
                  text-decoration:none;letter-spacing:0.06em;">
          VER VIDEOS EN KREOON →
        </a>
      </td>
    </tr>
  </table>

  <!-- Cómo revisar -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#111111;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 24px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          CÓMO REVISAR (3 PASOS)
        </p>

        <!-- Paso 1 -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
          <tr>
            <td width="36" valign="top">
              <span style="display:inline-block;width:28px;height:28px;
                           border:1px solid #FFD60A;text-align:center;
                           line-height:28px;color:#FFD60A;font-size:12px;
                           font-weight:700;">1</span>
            </td>
            <td style="padding-left:14px;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:14px;font-weight:600;">
                Mira cada video una vez completo antes de comentar
              </p>
              <p style="margin:0;color:#6B7280;font-size:13px;">
                El primer watch siempre es el más honesto. No pauses a tomar notas todavía.
              </p>
            </td>
          </tr>
        </table>

        <!-- Paso 2 -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
          <tr>
            <td width="36" valign="top">
              <span style="display:inline-block;width:28px;height:28px;
                           border:1px solid #FFD60A;text-align:center;
                           line-height:28px;color:#FFD60A;font-size:12px;
                           font-weight:700;">2</span>
            </td>
            <td style="padding-left:14px;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:14px;font-weight:600;">
                Usa comentarios por timestamp en el portal
              </p>
              <p style="margin:0;color:#6B7280;font-size:13px;">
                Más preciso que un email. Puedes dejar feedback en el segundo exacto
                que quieres cambiar.
              </p>
            </td>
          </tr>
        </table>

        <!-- Paso 3 -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="36" valign="top">
              <span style="display:inline-block;width:28px;height:28px;
                           border:1px solid #FFD60A;text-align:center;
                           line-height:28px;color:#FFD60A;font-size:12px;
                           font-weight:700;">3</span>
            </td>
            <td style="padding-left:14px;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:14px;font-weight:600;">
                Marca cada video como "Aprobado" o "Revisión"
              </p>
              <p style="margin:0;color:#6B7280;font-size:13px;">
                Aprobados entran inmediatamente a tu carpeta de descarga.
                Revisiones vuelven al equipo en menos de 48h.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Tiempos y reglas -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 16px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          TIEMPOS DE REVISIÓN
        </p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #1F1F1F;width:60%;">
              <p style="margin:0;color:#D1D5DB;font-size:14px;">
                Rondas de revisión incluidas en tu plan
              </p>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #1F1F1F;text-align:right;">
              <p style="margin:0;color:#FFFFFF;font-size:14px;font-weight:600;">
                {{rondas_revision}}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #1F1F1F;">
              <p style="margin:0;color:#D1D5DB;font-size:14px;">
                Tiempo de entrega por revisión
              </p>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #1F1F1F;text-align:right;">
              <p style="margin:0;color:#FFFFFF;font-size:14px;font-weight:600;">
                48h hábiles
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;">
              <p style="margin:0;color:#D1D5DB;font-size:14px;">
                Plazo máximo para solicitar revisiones
              </p>
            </td>
            <td style="padding:10px 0;text-align:right;">
              <p style="margin:0;color:#FFFFFF;font-size:14px;font-weight:600;">
                {{deadline_revision}}
              </p>
            </td>
          </tr>
        </table>

        <div style="margin-top:28px;padding:20px;background:#111111;
                    border-left:3px solid #DC2626;">
          <p style="margin:0;color:#FFFFFF;font-size:14px;line-height:1.6;">
            <strong style="color:#DC2626;">Importante:</strong> Los videos aprobados
            son tuyos para usar donde quieras — ads, orgánico, email, landing. 
            No hay restricción de uso.
          </p>
        </div>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:24px 40px;">
        <p style="margin:0;color:#4B5563;font-size:12px;">
          UGC Colombia · ugccolombia.co ·
          <a href="mailto:founder@ugccolombia.co"
             style="color:#FFD60A;text-decoration:none;">founder@ugccolombia.co</a>
        </p>
      </td>
    </tr>
  </table>

</body>
</html>
```

**CTA principal:** VER VIDEOS EN KREOON
**Variables:** `{{n_videos}}` · `{{dias_revision}}` · `{{portal_url}}` · `{{rondas_revision}}` · `{{deadline_revision}}`

---

## EMAIL 8 — D25 · Batch 1 Aprobado + Tips de Uso en Ads

**Timing:** D25 (o cuando el Batch 1 alcanza 90%+ de aprobación en el portal)
**Asunto:** Batch 1 aprobado — cómo usarlo bien en ads (47 chars)
**Preview text:** El batch está listo para lanzar. 4 principios de activación que maximizan el ROAS de UGC desde el día 1. (105 — recortar: "El batch está listo. 4 principios que maximizan el ROAS de UGC desde el día 1.")

---

```html
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#F5F5F0;font-family:'Inter',Arial,sans-serif;">

  <!-- Header -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#1A1A1A;border-bottom:2px solid #FFD60A;">
    <tr>
      <td style="padding:28px 40px;">
        <span style="color:#FFD60A;font-size:13px;font-weight:600;
                     letter-spacing:0.15em;text-transform:uppercase;">
          UGC COLOMBIA
        </span>
      </td>
      <td align="right" style="padding:28px 40px;">
        <span style="color:#9CA3AF;font-size:12px;">Batch 2 arrancando</span>
      </td>
    </tr>
  </table>

  <!-- Hero -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#1A1A1A;">
    <tr>
      <td style="padding:48px 40px 32px;">
        <p style="margin:0 0 8px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          BATCH 1 — CERRADO ✓
        </p>
        <h1 style="margin:0 0 20px;color:#FFFFFF;font-size:28px;
                   font-weight:700;line-height:1.3;">
          {{n_aprobados}} videos aprobados.<br>Batch 2 ya está en brief.
        </h1>
        <p style="margin:0 0 0;color:#9CA3AF;font-size:15px;line-height:1.6;">
          Antes de lanzar, lee esto. Son 4 principios que la mayoría de marcas ignoran
          y que hacen la diferencia entre un UGC que "se ve bien" y uno que convierte.
        </p>
      </td>
    </tr>
  </table>

  <!-- Tips de uso -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#F5F5F0;border-top:1px solid #E5E5E5;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 28px;color:#1A1A1A;font-size:12px;font-weight:600;
                  letter-spacing:0.12em;text-transform:uppercase;">
          4 PRINCIPIOS DE ACTIVACIÓN DE UGC
        </p>

        <!-- Tip 1 -->
        <table width="100%" cellpadding="0" cellspacing="0"
               style="margin-bottom:24px;">
          <tr>
            <td style="padding:24px;background:#FFFFFF;border-left:4px solid #FFD60A;">
              <p style="margin:0 0 8px;color:#374151;font-size:11px;font-weight:600;
                         letter-spacing:0.12em;text-transform:uppercase;">
                PRINCIPIO 01
              </p>
              <p style="margin:0 0 8px;color:#1A1A1A;font-size:16px;font-weight:700;">
                Lanza todos los ángulos al mismo tiempo
              </p>
              <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                No priorices un video "favorito". Deja que el algoritmo decida.
                Los primeros 48–72h de datos son los más honestos. Presupuesto inicial
                igual para todos los ángulos.
              </p>
            </td>
          </tr>
        </table>

        <!-- Tip 2 -->
        <table width="100%" cellpadding="0" cellspacing="0"
               style="margin-bottom:24px;">
          <tr>
            <td style="padding:24px;background:#FFFFFF;border-left:4px solid #FFD60A;">
              <p style="margin:0 0 8px;color:#374151;font-size:11px;font-weight:600;
                         letter-spacing:0.12em;text-transform:uppercase;">
                PRINCIPIO 02
              </p>
              <p style="margin:0 0 8px;color:#1A1A1A;font-size:16px;font-weight:700;">
                El hook mide en los primeros 3 segundos
              </p>
              <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                La métrica más importante de UGC en paid es el Hook Rate
                (% que ve más de 3s). Si supera 30%, el video tiene potencial de escalar.
                Por debajo de 20%, detén la pauta y notifícanos.
              </p>
            </td>
          </tr>
        </table>

        <!-- Tip 3 -->
        <table width="100%" cellpadding="0" cellspacing="0"
               style="margin-bottom:24px;">
          <tr>
            <td style="padding:24px;background:#FFFFFF;border-left:4px solid #FFD60A;">
              <p style="margin:0 0 8px;color:#374151;font-size:11px;font-weight:600;
                         letter-spacing:0.12em;text-transform:uppercase;">
                PRINCIPIO 03
              </p>
              <p style="margin:0 0 8px;color:#1A1A1A;font-size:16px;font-weight:700;">
                No cambies el creador, cambia el ángulo
              </p>
              <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                Si un video no convierte, el problema rara vez es el creador.
                Es el ángulo o el hook. En el reporte de fin de mes analizamos
                cuál hipótesis falló y la iteramos en el Batch 3.
              </p>
            </td>
          </tr>
        </table>

        <!-- Tip 4 -->
        <table width="100%" cellpadding="0" cellspacing="0"
               style="margin-bottom:32px;">
          <tr>
            <td style="padding:24px;background:#FFFFFF;border-left:4px solid #FFD60A;">
              <p style="margin:0 0 8px;color:#374151;font-size:11px;font-weight:600;
                         letter-spacing:0.12em;text-transform:uppercase;">
                PRINCIPIO 04
              </p>
              <p style="margin:0 0 8px;color:#1A1A1A;font-size:16px;font-weight:700;">
                UGC + landing nativa = conversión más alta
              </p>
              <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                El video que lanzas debe conectar visualmente con la landing a la que
                llegas. Si el UGC es documental y la landing es corporativa,
                hay fricción. Te podemos ayudar a alinear ambas.
              </p>
            </td>
          </tr>
        </table>

        <!-- CTA Batch 2 -->
        <div style="background:#0A0A0A;padding:28px;text-align:center;">
          <p style="margin:0 0 8px;color:#FFD60A;font-size:12px;font-weight:600;
                    letter-spacing:0.15em;text-transform:uppercase;">
            BATCH 2 EN MARCHA
          </p>
          <p style="margin:0 0 20px;color:#FFFFFF;font-size:15px;line-height:1.6;">
            Basado en los ángulos que mejor performaron, ya ajustamos el brief del
            Batch 2. Revísalo en el portal.
          </p>
          <a href="{{portal_url}}"
             style="display:inline-block;padding:12px 28px;background:#DC2626;
                    color:#FFFFFF;font-size:13px;font-weight:600;
                    text-decoration:none;letter-spacing:0.06em;">
            VER BRIEF BATCH 2 →
          </a>
        </div>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#F5F5F0;border-top:1px solid #E5E5E5;">
    <tr>
      <td style="padding:24px 40px;">
        <p style="margin:0;color:#9CA3AF;font-size:12px;">
          UGC Colombia · ugccolombia.co ·
          <a href="mailto:founder@ugccolombia.co"
             style="color:#6B7280;text-decoration:none;">founder@ugccolombia.co</a>
        </p>
      </td>
    </tr>
  </table>

</body>
</html>
```

**CTA principal:** VER BRIEF BATCH 2
**Variables:** `{{n_aprobados}}` · `{{portal_url}}`

---

## EMAIL 9 — D30 · Reporte Mensual + Factura + NPS

**Timing:** D30 (o el 1er día hábil del mes siguiente)
**Asunto:** Reporte de {{mes_nombre}} + tu próxima factura (46 chars)
**Preview text:** Resultados del mes, lo que iteramos en el Batch 2 y una pregunta rápida que nos ayuda a mejorar. (98 — recortar: "Resultados del mes, la iteración del Batch 2 y una pregunta que nos ayuda mucho.")

---

```html
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Inter',Arial,sans-serif;">

  <!-- Header -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-bottom:1px solid #FFD60A;">
    <tr>
      <td style="padding:28px 40px;">
        <span style="color:#FFD60A;font-size:13px;font-weight:600;
                     letter-spacing:0.15em;text-transform:uppercase;">
          UGC COLOMBIA
        </span>
      </td>
      <td align="right" style="padding:28px 40px;">
        <span style="color:#9CA3AF;font-size:12px;">Reporte mensual · {{mes_nombre}}</span>
      </td>
    </tr>
  </table>

  <!-- Hero -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;">
    <tr>
      <td style="padding:48px 40px 32px;">
        <p style="margin:0 0 8px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          MES 1 — CIERRE
        </p>
        <h1 style="margin:0 0 20px;color:#FFFFFF;font-size:28px;
                   font-weight:700;line-height:1.3;">
          {{n_total_videos}} videos entregados.<br>Así cerró el mes.
        </h1>
        <p style="margin:0 0 0;color:#D1D5DB;font-size:15px;line-height:1.6;">
          Primer mes completado. Aquí está el resumen ejecutivo
          y el reporte completo en el portal.
        </p>
      </td>
    </tr>
  </table>

  <!-- Stats del mes -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#111111;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 24px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          RESUMEN DEL MES
        </p>

        <!-- Métricas en 3 columnas -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:0 8px 0 0;width:33%;text-align:center;
                       vertical-align:top;">
              <div style="background:#1F1F1F;padding:20px 12px;">
                <p style="margin:0 0 4px;color:#FFD60A;font-size:28px;
                           font-weight:700;">
                  {{n_total_videos}}
                </p>
                <p style="margin:0;color:#9CA3AF;font-size:12px;
                           text-transform:uppercase;letter-spacing:0.08em;">
                  Videos entregados
                </p>
              </div>
            </td>
            <td style="padding:0 4px;width:33%;text-align:center;
                       vertical-align:top;">
              <div style="background:#1F1F1F;padding:20px 12px;">
                <p style="margin:0 0 4px;color:#FFD60A;font-size:28px;
                           font-weight:700;">
                  {{n_aprobados_pct}}%
                </p>
                <p style="margin:0;color:#9CA3AF;font-size:12px;
                           text-transform:uppercase;letter-spacing:0.08em;">
                  Tasa de aprobación
                </p>
              </div>
            </td>
            <td style="padding:0 0 0 8px;width:33%;text-align:center;
                       vertical-align:top;">
              <div style="background:#1F1F1F;padding:20px 12px;">
                <p style="margin:0 0 4px;color:#FFD60A;font-size:28px;
                           font-weight:700;">
                  {{dias_entrega}}d
                </p>
                <p style="margin:0;color:#9CA3AF;font-size:12px;
                           text-transform:uppercase;letter-spacing:0.08em;">
                  Tiempo promedio entrega
                </p>
              </div>
            </td>
          </tr>
        </table>

        <div style="margin-top:24px;padding:20px;background:#1A1A1A;">
          <p style="margin:0 0 8px;color:#FFFFFF;font-size:14px;font-weight:600;">
            Ángulo ganador del mes
          </p>
          <p style="margin:0;color:#9CA3AF;font-size:14px;line-height:1.5;">
            <strong style="color:#FFD60A;">{{angulo_ganador}}</strong> —
            {{angulo_ganador_resultado}}. Este ángulo guía el brief del Batch 3.
          </p>
        </div>
      </td>
    </tr>
  </table>

  <!-- Reporte completo -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <a href="{{reporte_url}}"
           style="display:inline-block;padding:12px 24px;background:#DC2626;
                  color:#FFFFFF;font-size:13px;font-weight:600;
                  text-decoration:none;letter-spacing:0.06em;">
          VER REPORTE COMPLETO EN KREOON →
        </a>
      </td>
    </tr>
  </table>

  <!-- Factura -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#111111;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 16px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          FACTURA MES 2
        </p>
        <p style="margin:0 0 12px;color:#D1D5DB;font-size:14px;line-height:1.6;">
          La factura por el segundo mes de servicio ya está disponible.
          Monto: <strong style="color:#FFFFFF;">${{monto_usd}} USD</strong>
          · Vencimiento: <strong style="color:#FFFFFF;">{{fecha_vencimiento}}</strong>
        </p>
        <a href="{{factura_url}}"
           style="display:inline-block;padding:10px 20px;
                  border:1px solid #333333;color:#9CA3AF;font-size:13px;
                  font-weight:600;text-decoration:none;letter-spacing:0.05em;">
          VER Y PAGAR FACTURA →
        </a>
      </td>
    </tr>
  </table>

  <!-- NPS micro-survey -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;text-align:center;">
        <p style="margin:0 0 8px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          UNA PREGUNTA — 10 SEGUNDOS
        </p>
        <p style="margin:0 0 24px;color:#FFFFFF;font-size:16px;font-weight:600;">
          ¿Qué tan probable es que recomiendes UGC Colombia a otro founder?
        </p>
        <table align="center" cellpadding="0" cellspacing="0">
          <tr>
            <!-- Puntuaciones 1-10 inline -->
            <td style="padding:0 4px;">
              <a href="{{nps_url}}?score=1"
                 style="display:inline-block;width:36px;height:36px;
                        background:#1F1F1F;color:#9CA3AF;font-size:13px;
                        font-weight:600;text-decoration:none;
                        text-align:center;line-height:36px;">1</a>
            </td>
            <td style="padding:0 4px;">
              <a href="{{nps_url}}?score=2"
                 style="display:inline-block;width:36px;height:36px;
                        background:#1F1F1F;color:#9CA3AF;font-size:13px;
                        font-weight:600;text-decoration:none;
                        text-align:center;line-height:36px;">2</a>
            </td>
            <td style="padding:0 4px;">
              <a href="{{nps_url}}?score=3"
                 style="display:inline-block;width:36px;height:36px;
                        background:#1F1F1F;color:#9CA3AF;font-size:13px;
                        font-weight:600;text-decoration:none;
                        text-align:center;line-height:36px;">3</a>
            </td>
            <td style="padding:0 4px;">
              <a href="{{nps_url}}?score=4"
                 style="display:inline-block;width:36px;height:36px;
                        background:#1F1F1F;color:#9CA3AF;font-size:13px;
                        font-weight:600;text-decoration:none;
                        text-align:center;line-height:36px;">4</a>
            </td>
            <td style="padding:0 4px;">
              <a href="{{nps_url}}?score=5"
                 style="display:inline-block;width:36px;height:36px;
                        background:#1F1F1F;color:#9CA3AF;font-size:13px;
                        font-weight:600;text-decoration:none;
                        text-align:center;line-height:36px;">5</a>
            </td>
            <td style="padding:0 4px;">
              <a href="{{nps_url}}?score=6"
                 style="display:inline-block;width:36px;height:36px;
                        background:#1F1F1F;color:#9CA3AF;font-size:13px;
                        font-weight:600;text-decoration:none;
                        text-align:center;line-height:36px;">6</a>
            </td>
            <td style="padding:0 4px;">
              <a href="{{nps_url}}?score=7"
                 style="display:inline-block;width:36px;height:36px;
                        background:#1F1F1F;color:#9CA3AF;font-size:13px;
                        font-weight:600;text-decoration:none;
                        text-align:center;line-height:36px;">7</a>
            </td>
            <td style="padding:0 4px;">
              <a href="{{nps_url}}?score=8"
                 style="display:inline-block;width:36px;height:36px;
                        background:#1F1F1F;color:#9CA3AF;font-size:13px;
                        font-weight:600;text-decoration:none;
                        text-align:center;line-height:36px;">8</a>
            </td>
            <td style="padding:0 4px;">
              <a href="{{nps_url}}?score=9"
                 style="display:inline-block;width:36px;height:36px;
                        background:#1F1F1F;color:#9CA3AF;font-size:13px;
                        font-weight:600;text-decoration:none;
                        text-align:center;line-height:36px;">9</a>
            </td>
            <td style="padding:0 4px;">
              <a href="{{nps_url}}?score=10"
                 style="display:inline-block;width:36px;height:36px;
                        background:#FFD60A;color:#0A0A0A;font-size:13px;
                        font-weight:700;text-decoration:none;
                        text-align:center;line-height:36px;">10</a>
            </td>
          </tr>
        </table>
        <table align="center" cellpadding="0" cellspacing="0"
               style="margin-top:8px;width:400px;">
          <tr>
            <td style="text-align:left;">
              <p style="margin:0;color:#4B5563;font-size:11px;">Muy improbable</p>
            </td>
            <td style="text-align:right;">
              <p style="margin:0;color:#4B5563;font-size:11px;">Muy probable</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:24px 40px;">
        <p style="margin:0;color:#4B5563;font-size:12px;">
          UGC Colombia · ugccolombia.co ·
          <a href="mailto:founder@ugccolombia.co"
             style="color:#FFD60A;text-decoration:none;">founder@ugccolombia.co</a>
        </p>
      </td>
    </tr>
  </table>

</body>
</html>
```

**CTA principal:** VER REPORTE COMPLETO + NPS inline
**Variables:** `{{mes_nombre}}` · `{{n_total_videos}}` · `{{n_aprobados_pct}}` · `{{dias_entrega}}` · `{{angulo_ganador}}` · `{{angulo_ganador_resultado}}` · `{{reporte_url}}` · `{{monto_usd}}` · `{{fecha_vencimiento}}` · `{{factura_url}}` · `{{nps_url}}`

---

## EMAIL 10 — D45 · Mid-Month Review + Upsell Soft

**Timing:** D45 (mitad del segundo mes)
**Asunto:** ¿Iteramos o escalamos? — revisión mensual (44 chars)
**Preview text:** A mitad del segundo mes, revisamos qué está funcionando y si tiene sentido aumentar el volumen de producción. (109 — recortar: "A mitad del segundo mes revisamos resultados y si tiene sentido escalar el volumen.")

---

```html
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Inter',Arial,sans-serif;">

  <!-- Header -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-bottom:1px solid #FFD60A;">
    <tr>
      <td style="padding:28px 40px;">
        <span style="color:#FFD60A;font-size:13px;font-weight:600;
                     letter-spacing:0.15em;text-transform:uppercase;">
          UGC COLOMBIA
        </span>
      </td>
      <td align="right" style="padding:28px 40px;">
        <span style="color:#9CA3AF;font-size:12px;">Mes 2 · Mid-month</span>
      </td>
    </tr>
  </table>

  <!-- Hero -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;">
    <tr>
      <td style="padding:48px 40px 32px;">
        <p style="margin:0 0 8px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          MID-MONTH REVIEW
        </p>
        <h1 style="margin:0 0 20px;color:#FFFFFF;font-size:28px;
                   font-weight:700;line-height:1.3;">
          Llevamos 45 días trabajando juntos.<br>
          Aquí está lo que los datos dicen.
        </h1>
        <p style="margin:0 0 28px;color:#D1D5DB;font-size:15px;line-height:1.6;">
          Quiero ser directo contigo, {{cliente_nombre}}. En la revisión de este
          punto del proceso siempre hay una de dos conclusiones:
          iteramos los ángulos que no están funcionando, o escalamos los que sí.
          A veces las dos.
        </p>
      </td>
    </tr>
  </table>

  <!-- Snapshot de performance -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#111111;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 24px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          SNAPSHOT DE LOS ÚLTIMOS 30 DÍAS
        </p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:12px 16px;background:#1F1F1F;
                       border-bottom:1px solid #2A2A2A;">
              <table width="100%">
                <tr>
                  <td>
                    <p style="margin:0;color:#9CA3AF;font-size:13px;">
                      Videos en uso activo en ads
                    </p>
                  </td>
                  <td style="text-align:right;">
                    <p style="margin:0;color:#FFFFFF;font-size:14px;font-weight:600;">
                      {{videos_activos}}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;background:#1F1F1F;
                       border-bottom:1px solid #2A2A2A;">
              <table width="100%">
                <tr>
                  <td>
                    <p style="margin:0;color:#9CA3AF;font-size:13px;">
                      Ángulo con mejor Hook Rate
                    </p>
                  </td>
                  <td style="text-align:right;">
                    <p style="margin:0;color:#FFD60A;font-size:14px;font-weight:600;">
                      {{mejor_angulo}} ({{hook_rate}}%)
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;background:#1F1F1F;">
              <table width="100%">
                <tr>
                  <td>
                    <p style="margin:0;color:#9CA3AF;font-size:13px;">
                      Videos del Batch 3 en producción
                    </p>
                  </td>
                  <td style="text-align:right;">
                    <p style="margin:0;color:#FFFFFF;font-size:14px;font-weight:600;">
                      {{batch3_en_curso}}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Propuesta de revisión -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 16px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          TE PROPONGO UNA REUNIÓN DE 30 MIN
        </p>
        <p style="margin:0 0 12px;color:#D1D5DB;font-size:15px;line-height:1.6;">
          Sin presentación de ventas. Sin agenda corporativa. Quiero ver contigo
          los números del Ads Manager, identificar qué ángulos escalar y definir
          si tiene sentido ajustar el volumen del Batch 4.
        </p>
        <p style="margin:0 0 28px;color:#D1D5DB;font-size:14px;line-height:1.6;">
          Si los resultados te tienen cómodo con el volumen actual,
          no hay razón para cambiar nada. Si quieres más, podemos hacerlo
          sin interrumpir el flujo actual.
        </p>
        <a href="{{review_call_url}}"
           style="display:inline-block;padding:14px 32px;background:#DC2626;
                  color:#FFFFFF;font-size:14px;font-weight:600;
                  text-decoration:none;letter-spacing:0.06em;">
          AGENDAR REVISIÓN DE 30 MIN →
        </a>
      </td>
    </tr>
  </table>

  <!-- Upsell soft -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#111111;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 16px;color:#FFD60A;font-size:12px;font-weight:600;
                  letter-spacing:0.15em;text-transform:uppercase;">
          PARA LA REUNIÓN — 3 OPCIONES QUE REVISAMOS
        </p>

        <!-- Opción 1 -->
        <table width="100%" cellpadding="0" cellspacing="0"
               style="margin-bottom:12px;">
          <tr>
            <td style="padding:16px;background:#1A1A1A;border-left:3px solid #333333;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:14px;font-weight:600;">
                Más creadores, mismos ángulos
              </p>
              <p style="margin:0;color:#6B7280;font-size:13px;line-height:1.5;">
                Escalar el ángulo ganador con 2–3 creadores distintos.
                Mismo mensaje, rostros diferentes — el algoritmo lo premia.
              </p>
            </td>
          </tr>
        </table>

        <!-- Opción 2 -->
        <table width="100%" cellpadding="0" cellspacing="0"
               style="margin-bottom:12px;">
          <tr>
            <td style="padding:16px;background:#1A1A1A;border-left:3px solid #333333;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:14px;font-weight:600;">
                Nuevos formatos: Stories + Reels verticales nativos
              </p>
              <p style="margin:0;color:#6B7280;font-size:13px;line-height:1.5;">
                El contenido que produce conversión en feed a veces no es óptimo
                para Stories. Producimos versiones adaptadas.
              </p>
            </td>
          </tr>
        </table>

        <!-- Opción 3 -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:16px;background:#1A1A1A;border-left:3px solid #FFD60A;">
              <p style="margin:0 0 4px;color:#FFFFFF;font-size:14px;font-weight:600;">
                Versión bilingüe (ES + EN)
              </p>
              <p style="margin:0;color:#6B7280;font-size:13px;line-height:1.5;">
                Si tu audiencia o la de tu cliente tiene segmento USA Hispanic,
                producimos versiones en inglés nativo con los mismos creadores.
                No es traducción — es regrabación.
              </p>
              <p style="margin:4px 0 0;color:#FFD60A;font-size:12px;font-weight:600;">
                Recomendado para clientes con ticket $1,000+ / mes
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- CTA final -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:40px;text-align:center;">
        <p style="margin:0 0 20px;color:#D1D5DB;font-size:14px;line-height:1.6;">
          Nada de esto aplica si los resultados actuales te tienen satisfecho.
          Si quieres la reunión, está en el link de abajo. Si no, no pasa nada —
          el Batch 3 sigue en pie sin cambios.
        </p>
        <a href="{{review_call_url}}"
           style="display:inline-block;padding:12px 28px;background:#DC2626;
                  color:#FFFFFF;font-size:13px;font-weight:600;
                  text-decoration:none;letter-spacing:0.06em;">
          AGENDAR REVISIÓN →
        </a>
        <p style="margin:16px 0 0;color:#4B5563;font-size:12px;">
          30 minutos · Sin presentación · Solo números y próximos pasos
        </p>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="600" align="center" cellpadding="0" cellspacing="0"
         style="background:#0A0A0A;border-top:1px solid #222222;">
    <tr>
      <td style="padding:24px 40px;">
        <p style="margin:0;color:#4B5563;font-size:12px;">
          UGC Colombia · ugccolombia.co ·
          <a href="mailto:founder@ugccolombia.co"
             style="color:#FFD60A;text-decoration:none;">founder@ugccolombia.co</a>
          · Para no recibir estos emails:
          <a href="{{unsubscribe_url}}"
             style="color:#4B5563;text-decoration:none;">cancelar suscripción</a>
        </p>
      </td>
    </tr>
  </table>

</body>
</html>
```

**CTA principal:** AGENDAR REVISIÓN DE 30 MIN
**Variables:** `{{cliente_nombre}}` · `{{videos_activos}}` · `{{mejor_angulo}}` · `{{hook_rate}}` · `{{batch3_en_curso}}` · `{{review_call_url}}` · `{{unsubscribe_url}}`

---

---

# VERSIÓN EN INGLÉS — Para clientes USA Hispanic

> Las siguientes versiones son adaptaciones de los mismos 10 emails en inglés americano neutro, con sensibilidad al mercado hispano. No son traducciones literales — el tono y los ejemplos están adaptados.
> Usar cuando el cliente tenga sede o billing en Estados Unidos, o cuando la comunicación con el cliente sea en inglés.
> Sender se mantiene: Alexander Cast `<founder@ugccolombia.co>`

---

## EMAIL 1-EN — D0 · Welcome — Immediate Post-Signup

**Subject:** ✅ You're in — here are your next steps (42 chars)
**Preview text:** Access your portal, schedule your kickoff, and see how your first month works. (79 chars)

**Body (plain text summary for HTML adaptation):**

Hi {{cliente_nombre}},

Welcome to UGC Colombia. Your {{plan}} plan is now active.

Here are your 3 actions for today:

1. **Access your Kreoon portal** — Your briefs, casting, reviews, and final files all live here. No scattered Drive folders. No WhatsApp threads.
   → [ACCESS PORTAL]({{portal_url}})

2. **Schedule your kickoff call** — 45 minutes where we define angles, creators, and your first batch timeline. Don't skip this.
   → [SCHEDULE KICKOFF]({{kickoff_url}})

3. **Watch your inbox** — Alexander writes to you personally in the next 2 hours.

Your team from today:
- Alexander Cast — Strategy and account
- Diana Mile — Talent and casting

---

## EMAIL 2-EN — D0 · Personal Note from Alexander

**Subject:** A personal note from me (28 chars)
**Preview text:** Why I built UGC Colombia and what it means that you're here. 90 seconds. (73 chars)

**Body (plain text summary for HTML adaptation):**

Hi {{cliente_nombre}},

I built UGC Colombia because I got tired of watching Latin-owned brands pay $1,500–$2,000 for a 30-second clip in Miami — generic, low-converting, with nobody on the other side to iterate.

The problem wasn't the price. It was the lack of a system.

You now have the system.

What I expect from this first month:

- **Full transparency.** You know exactly what's in production, what's in review, and what's delivered.
- **Measurable results.** Every video has an angle. Every angle has a hypothesis. We test, not guess.
- **A real team.** Diana handles casting. Samuel owns the platform. Tanya supports the process. I oversee your account.

[WATCH WELCOME VIDEO]({{loom_url}}) *(optional — 3 min)*

See you at the kickoff.

Alexander Cast
Founder · UGC Colombia

---

## EMAIL 3-EN — D1 · Kickoff Reminder

**Subject:** Your kickoff is tomorrow — prep in 10 min (44 chars)
**Preview text:** Agenda, 3 documents to have ready, and what we'll decide together tomorrow. (75 chars)

**Body (plain text summary for HTML adaptation):**

{{empresa}} Kickoff — {{kickoff_fecha}} · {{kickoff_hora}}

**45-minute agenda:**
- 0:00 — Brand context (you talk, we listen)
- 0:10 — Angle and hook definition for Batch 1
- 0:25 — Creator shortlist presentation
- 0:35 — Timeline and next steps

**Have ready before you join:**
→ Your value prop in 1 paragraph
→ 2–3 creatives that worked (or the worst ones if nothing has)
→ Read-only access to your Ads Manager

[VIEW CALENDAR INVITE]({{kickoff_url}})

Tip: If you don't have previous creatives, come anyway — we'll get there. But having them saves us 10 minutes.

---

## EMAIL 4-EN — D2 · Post-Kickoff Summary + Brand Brief

**Subject:** Kickoff summary + your next step (34 chars)
**Preview text:** Everything we agreed on today. The brand brief takes 12 min and unlocks production. (83 chars)

**Body (plain text summary for HTML adaptation):**

Great session, {{cliente_nombre}}. Here's what we locked in.

**Approved angles for Batch 1:**
- {{angulo_1}} — {{angulo_1_desc}}
- {{angulo_2}} — {{angulo_2_desc}}
- {{angulo_3}} — {{angulo_3_desc}}

**Selected creators:** {{creadores_seleccionados}}
Diana confirms availability within 24 hours.

**Batch 1 timeline:**
- Brand dossier ready: {{fecha_dossier}}
- Filming: {{fecha_grabaciones}}
- Estimated delivery: {{fecha_entrega}}

If anything in this summary is off, reply to this email before 6 PM today.

**Your action today:** Complete the Brand Brief (12 min)
This form gives Diana and the creative team everything they need to write scripts that sound like your brand — not a script.

[COMPLETE BRAND BRIEF]({{brief_url}})
Deadline: {{brief_deadline}}

---

## EMAIL 5-EN — D5 · Brand Dossier Ready for Approval

**Subject:** Your brand dossier is ready to review ✍️ (43 chars)
**Preview text:** Review scripts, angles, and creator profiles before filming starts. (67 chars)

**Body (plain text summary for HTML adaptation):**

{{empresa}}'s dossier is live in your portal.

Inside you'll find:
01. **{{n_guiones}} scripts** — one per approved angle
02. **{{n_creadores}} creator profiles** — with portfolio and brand fit notes
03. **Direction notes** — tone, look, what to avoid on camera
04. **Filming schedule** — confirmed dates per creator

How review works: You have **48 hours** to approve or request changes directly in the portal. Comment on each script inline — no separate email needed. No response in 48h = approval assumed.

[REVIEW DOSSIER IN KREOON]({{portal_url}})
Approval deadline: {{deadline_aprobacion}}

---

## EMAIL 6-EN — D10 · Batch 1 In Production

**Subject:** Cameras are rolling 🎬 (22 chars)
**Preview text:** Your first batch is in production. Here's the process behind every video we're filming. (88 chars)

**Body (plain text summary for HTML adaptation):**

{{n_videos}} videos in production. Estimated delivery: {{fecha_entrega}}.

Nothing to do on your end today. This update exists because transparency isn't a perk — it's part of the service.

**Batch 1 status:**
- Brief approved ✓ — {{fecha_brief}}
- Filming ● IN PROGRESS — {{fecha_grabaciones}}
- Edit and color ○ Pending — {{fecha_edicion}}
- Portal delivery ○ Pending — {{fecha_entrega}}

What's happening behind the scenes: Diana is in direct contact with creators. Each script is rehearsed before filming — no improvising on camera. After filming, videos go through editing, captions, and internal QA. They only reach your portal when they meet standard.

[CHECK STATUS IN PORTAL]({{portal_url}})

---

## EMAIL 7-EN — D18 · Batch 1 Delivered

**Subject:** Your first batch is ready to review (36 chars)
**Preview text:** {{n_videos}} videos in your portal. Here's how to review, approve, and request changes. (88 chars)

**Body (plain text summary for HTML adaptation):**

{{n_videos}} videos. Ready in your portal.

You have **{{dias_revision}} business days** to review and request revisions.

**How to review (3 steps):**
1. Watch each video once all the way through before commenting
2. Use timestamp comments in the portal — more precise than email
3. Mark each video as "Approved" or "Needs revision"

Approved videos go directly to your download folder. Revision requests are back to you within 48 business hours.

**Your plan includes {{rondas_revision}} revision round(s).**
Revision request deadline: {{deadline_revision}}

Important: Approved videos are yours to use anywhere — ads, organic, email, landing. No usage restrictions.

[VIEW VIDEOS IN KREOON]({{portal_url}})

---

## EMAIL 8-EN — D25 · Batch 1 Approved + UGC Activation Tips

**Subject:** Batch 1 approved — how to run it right in ads (48 chars)
**Preview text:** 4 principles most brands ignore that separate UGC that looks good from UGC that converts. (90 chars)

**Body (plain text summary for HTML adaptation):**

{{n_aprobados}} videos approved. Batch 2 brief is already in progress.

Before you launch — 4 principles that matter:

**01. Launch all angles at the same time.**
Don't pick a "favorite." Let the algorithm decide. The first 48–72h of data are the most honest. Equal budget to all angles at launch.

**02. The hook is measured in the first 3 seconds.**
The most important UGC metric in paid is Hook Rate (% who watch past 3s). Above 30% = potential to scale. Below 20% = pause and notify us.

**03. Don't replace the creator — replace the angle.**
If a video isn't converting, the problem is rarely the creator. It's the angle or the hook. We analyze which hypothesis failed in the monthly report and iterate in Batch 3.

**04. UGC + native landing = higher conversion.**
The video you run needs to connect visually with the landing page. If the UGC is documentary-style and the landing is corporate, there's friction. We can help align both.

[VIEW BATCH 2 BRIEF]({{portal_url}})

---

## EMAIL 9-EN — D30 · Monthly Report + Renewal Invoice + NPS

**Subject:** {{mes_nombre}} report + your next invoice (41 chars)
**Preview text:** Month results, Batch 2 iteration, and one quick question that helps us improve. (80 chars)

**Body (plain text summary for HTML adaptation):**

Month 1 complete. Here's the executive summary.

**Month 1 summary:**
- Videos delivered: {{n_total_videos}}
- Approval rate: {{n_aprobados_pct}}%
- Average delivery time: {{dias_entrega}} days
- Top-performing angle: **{{angulo_ganador}}** — {{angulo_ganador_resultado}}. This angle drives the Batch 3 brief.

[VIEW FULL REPORT IN KREOON]({{reporte_url}})

**Month 2 invoice:**
Amount: ${{monto_usd}} USD · Due: {{fecha_vencimiento}}
[VIEW AND PAY INVOICE]({{factura_url}})

**One question — 10 seconds:**
How likely are you to recommend UGC Colombia to another founder?

[1] [2] [3] [4] [5] [6] [7] [8] [9] [10]

---

## EMAIL 10-EN — D45 · Mid-Month Review + Soft Upsell

**Subject:** Iterate or scale? — monthly mid-check (39 chars)
**Preview text:** At the mid-point of month two, we review what's working and whether it makes sense to increase volume. (102 — recortar: "Mid-month two: we review results and whether scaling volume makes sense right now.")

**Body (plain text summary for HTML adaptation):**

45 days in. Here's what the data says, {{cliente_nombre}}.

At this point in the process, there's usually one of two conclusions: iterate the angles that aren't working, or scale the ones that are. Sometimes both.

**Last 30-day snapshot:**
- Videos active in ads: {{videos_activos}}
- Angle with best Hook Rate: {{mejor_angulo}} ({{hook_rate}}%)
- Batch 3 videos in production: {{batch3_en_curso}}

**I'd like to schedule a 30-minute review.**
No sales pitch. No corporate agenda. Just your Ads Manager numbers, which angles to scale, and whether it makes sense to adjust Batch 4 volume.

[SCHEDULE 30-MIN REVIEW]({{review_call_url}})

**3 options we can explore in the meeting:**

1. **More creators, same angles** — Scale the winning angle with 2–3 different creators. Same message, different faces. The algorithm rewards it.

2. **New formats: native Stories + vertical Reels** — Content that converts in feed isn't always optimal for Stories. We produce adapted versions.

3. **Bilingual versions (ES + EN)** *(Recommended for $1,000+/mo clients)* — If your audience has a USA Hispanic segment, we produce English-native versions with the same creators. Not translation — re-recording.

If current results are good enough, no need to change anything. If you want more, we can do it without disrupting the current flow.

[SCHEDULE REVIEW]({{review_call_url}})
30 minutes · No presentation · Just numbers and next steps

---

---

# TABLA RESUMEN — Secuencia Completa

| # | Timing | Asunto (ES) | CTA Principal | Tipo | Trigger |
|---|--------|-------------|---------------|------|---------|
| 1 | D0 +5min | ✅ Ya estás dentro — próximos pasos | Entrar al Portal / Agendar Kickoff | Transaccional | Pago confirmado |
| 2 | D0 +3h | Un mensaje directo de mi parte | Ver Video de Bienvenida (opt.) | Relacional | Delay fijo post-email 1 |
| 3 | D1 | Tu kickoff es mañana — prepárate en 10 min | Ver Invitación en Calendario | Recordatorio | 24h antes del kickoff |
| 4 | D2 | Resumen del kickoff + tu siguiente paso | Completar Brand Brief | Acción urgente | Post-reunión (manual/webhook) |
| 5 | D5 | Tu dossier de marca está listo ✍️ | Revisar Dossier en Kreoon | Aprobación | Dossier publicado en portal |
| 6 | D10 | Las cámaras ya están rodando 🎬 | Ver Estado en el Portal | Actualización | Primer video en edición |
| 7 | D18 | Tu primer batch está listo para revisar | Ver Videos en Kreoon | Aprobación urgente | Batch publicado en portal |
| 8 | D25 | Batch 1 aprobado — cómo usarlo bien en ads | Ver Brief Batch 2 | Educacional + transición | 90%+ videos aprobados |
| 9 | D30 | Reporte de {{mes_nombre}} + tu próxima factura | Ver Reporte Completo + NPS | Retención + cobranza | D30 automatizado |
| 10 | D45 | ¿Iteramos o escalamos? — revisión mensual | Agendar Revisión de 30 Min | Upsell soft | D45 automatizado |

---

# RECOMENDACIONES DE A/B TESTING

## Pruebas de alta prioridad (impacto en retención y activación)

### Email 1 — Bienvenida
**Variable a probar:** Asunto con/sin emoji
- **A:** `✅ Ya estás dentro — próximos pasos`
- **B:** `Ya estás dentro — próximos pasos`
- **Métrica:** Open rate (objetivo: >55% dado que es email transaccional)
- **Hipótesis:** El emoji aumenta apertura en móvil pero puede reducirla en clientes corporativos

### Email 2 — Nota personal de Alexander
**Variable a probar:** Presencia del video Loom
- **A:** Con bloque de video Loom
- **B:** Sin video — solo copy personal
- **Métrica:** Click-to-portal rate en el siguiente email (Email 3)
- **Hipótesis:** El video aumenta confianza y reduce ansiedad del nuevo cliente, lo que se refleja en mayor engagement en D1

### Email 4 — Brand Brief
**Variable a probar:** Urgencia del plazo
- **A:** Plazo explícito en asunto: `Resumen del kickoff + completa el brief hoy`
- **B:** Asunto neutro: `Resumen del kickoff + tu siguiente paso`
- **Métrica:** Tasa de completitud del brand brief en 24h
- **Hipótesis:** La urgencia explícita aumenta conversión pero puede sentirse presionante en clientes premium

### Email 7 — Entrega del batch
**Variable a probar:** Framing del tiempo de revisión
- **A:** `Tienes 5 días hábiles para revisar` (abundancia)
- **B:** `El plazo de revisión vence el {{deadline_revision}}` (fecha concreta)
- **Métrica:** Tiempo promedio hasta primera revisión en portal
- **Hipótesis:** La fecha concreta genera acción más rápida que el número de días

### Email 9 — NPS
**Variable a probar:** Posición del NPS en el email
- **A:** NPS al final, después del reporte y la factura
- **B:** NPS primero, antes del reporte (email separado el mismo día)
- **Métrica:** Tasa de respuesta al NPS
- **Hipótesis:** NPS separado del email de cobranza obtiene respuestas más honestas y mayor tasa de respuesta

### Email 10 — Upsell
**Variable a probar:** Framing de la reunión
- **A:** `¿Iteramos o escalamos?` (decisión compartida)
- **B:** `Revisión de resultados del mes 2` (neutral, menos comercial)
- **Métrica:** Tasa de agendamiento de la llamada
- **Hipótesis:** El framing de decisión compartida genera más agendamientos que el neutral en clientes con buenos resultados; el neutral funciona mejor con clientes que tuvieron resultados mixtos

---

## Segmentación recomendada para variantes

| Segmento | Ajuste de tono | Emails a personalizar |
|----------|----------------|----------------------|
| Plan Starter ($500) | Más educacional, menos upsell | 8, 10 |
| Plan Scale ($1,500) | Más estratégico, datos primero | 9, 10 |
| Cliente USA Hispanic | Versión EN completa | Todos |
| Agencia white-label | Remover referencias a "tu marca" | 2, 4, 8 |
| Cliente con NPS < 7 | Activar flujo de recuperación manual antes de Email 10 | 10 |

---

## Variables dinámicas — Índice completo

| Variable | Fuente | Emails donde aparece |
|----------|--------|----------------------|
| `{{cliente_nombre}}` | CRM | 1, 2, 3, 4, 7, 9, 10 |
| `{{empresa}}` | CRM | 3, 4, 5, 6 |
| `{{plan}}` | CRM / billing | 1 |
| `{{portal_url}}` | Kreoon | 1, 5, 6, 7, 8, 9 |
| `{{kickoff_url}}` | Calendly / Cal.com | 1, 2, 3 |
| `{{kickoff_fecha}}` · `{{kickoff_hora}}` | Evento de calendario | 3 |
| `{{loom_url}}` | Loom (manual) | 2 |
| `{{brief_url}}` | Typeform / Kreoon | 4 |
| `{{brief_deadline}}` | CRM (+48h del kickoff) | 4 |
| `{{angulo_X}}` · `{{angulo_X_desc}}` | Kreoon / manual post-kickoff | 4 |
| `{{creadores_seleccionados}}` | Kreoon / Diana | 4 |
| `{{fecha_dossier}}` · `{{fecha_grabaciones}}` · `{{fecha_entrega}}` | Kreoon | 4, 6 |
| `{{n_guiones}}` · `{{n_creadores}}` | Kreoon | 5 |
| `{{deadline_aprobacion}}` | Kreoon (+48h del dossier) | 5 |
| `{{n_videos}}` | Kreoon | 6, 7 |
| `{{fecha_brief}}` · `{{fecha_edicion}}` | Kreoon | 6 |
| `{{dias_revision}}` · `{{rondas_revision}}` · `{{deadline_revision}}` | CRM según plan | 7 |
| `{{n_aprobados}}` | Kreoon | 8 |
| `{{mes_nombre}}` | Sistema de fechas | 9, 10 |
| `{{n_total_videos}}` · `{{n_aprobados_pct}}` · `{{dias_entrega}}` | Kreoon | 9 |
| `{{angulo_ganador}}` · `{{angulo_ganador_resultado}}` | Kreoon / manual | 9 |
| `{{reporte_url}}` | Kreoon | 9 |
| `{{monto_usd}}` · `{{fecha_vencimiento}}` · `{{factura_url}}` | Billing / Stripe | 9 |
| `{{nps_url}}` | Typeform / Tally | 9 |
| `{{videos_activos}}` · `{{mejor_angulo}}` · `{{hook_rate}}` · `{{batch3_en_curso}}` | Kreoon / Ads Manager | 10 |
| `{{review_call_url}}` | Calendly / Cal.com | 10 |
| `{{unsubscribe_url}}` | Resend (automático) | 10 |

---

*Secuencia generada para UGC Colombia · Sistema de Onboarding Premium · v1.0 · 2026-04-08*
*Sender: Alexander Cast `<founder@ugccolombia.co>` · Plataforma: Resend*
