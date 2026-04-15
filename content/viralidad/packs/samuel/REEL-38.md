---
slug: samuel-R38
title: "Jarvis contesta el 82% de los DMs — métricas reales"
assigned_creator: samuel@ugccolombia.co
pillar: casos_resultados
platform: youtube_shorts
duration_seconds: 55
hook: "Jarvis, nuestro agente WhatsApp, contestó el 82% de los DMs este mes. Sin humano. Te muestro el dashboard."
category: viral-pack
source_pack: samuel
scenes:
  - id: 1
    time: "0-3s"
    visual: "Dashboard Grafana con métrica grande 82% destacada en verde"
    voice: "Jarvis, nuestro agente de WhatsApp, contestó el 82% de los DMs este mes. Sin humano. Mirá el dashboard."
    creator_action: "Voz en off, sin cámara"
    editing: "Overlay grande Anton: 82% AUTO — 1 MES. Cut seco a los 3s."
    broll:
      - "Dashboard Grafana"
      - "Métrica 82% destacada"
  - id: 2
    time: "3-13s"
    visual: "Gráfico donut animado: 82% Jarvis vs 18% humano. Números 1,022 / 1,247 al costado"
    voice: "Llegaron 1,247 mensajes. Jarvis contestó 1,022 sin escalación. 225 escaló a humano — casos complejos, pedidos específicos, quejas. Exactamente lo que debería escalar."
    creator_action: "Voz en off, gráfico animado"
    editing: "Overlay: 1,022 / 1,247. Donut chart construyéndose."
    broll:
      - "Gráfico donut 82/18"
      - "Counter mensajes"
  - id: 3
    time: "13-28s"
    visual: "Diagrama de arquitectura: webhook → context → Claude → confidence check → response | escalate. Cada nodo iluminándose"
    voice: "La arquitectura: cuando entra un mensaje, Jarvis usa Claude Sonnet con contexto — historial del usuario, productos, FAQs. Si la respuesta tiene baja confianza, escala. Si es alta confianza, responde en 3 segundos."
    creator_action: "Voz en off, diagrama animado"
    editing: "Overlay: confidence threshold = clave. Iluminación secuencial."
    broll:
      - "Diagrama arquitectura Jarvis"
      - "Iconos de cada paso"
      - "Bifurcación response/escalate"
  - id: 4
    time: "28-42s"
    visual: "Comparativa visual: 4h vs 3s con counter. Cut a gráfico de conversión con flecha verde +18%"
    voice: "Tiempo promedio de respuesta humana antes: 4 horas. Con Jarvis: 3 segundos. Tasa de leads calificados subió 18%. Porque responder rápido importa más que responder perfecto."
    creator_action: "Voz en off, gráficos"
    editing: "Overlay: velocity > perfection. Counter dramático 4h → 3s."
    broll:
      - "Comparativa tiempo respuesta"
      - "Gráfico conversión +18%"
      - "Counter velocidad"
  - id: 5
    time: "42-55s"
    visual: "Terminal con docker-compose up -d jarvis ejecutándose. Cut a VPS dashboard con costo $8/mes destacado"
    voice: "Jarvis corre en Docker, en un VPS de 8 dólares al mes. Todo open source, sin SaaS caro. La IA en producción no es hype — es un docker-compose up."
    creator_action: "Voz en off, screen recording terminal"
    editing: "Overlay: $8/mes hosting. Highlight en docker-compose up. Música sube en cierre."
    broll:
      - "Terminal docker-compose"
      - "VPS dashboard $8/mes"
      - "Logo Docker"
      - "End card GitHub link"
---

# samuel-R38 — Jarvis contesta el 82% de los DMs — métricas reales

**Tipo:** Caso real + dashboard + agente IA
**Duración:** 55 segundos
**Voz:** Samuel en off + screen recording dashboard
**Música:** Ritmo medio electrónica

---

| Tiempo | Audio / Voz | Visual | Notas de edición |
|--------|-------------|--------|------------------|
| 0-3s | `"Jarvis, nuestro agente de WhatsApp, contestó el 82% de los DMs este mes. Sin humano. Mirá el dashboard."` | Pantalla: dashboard Grafana con métrica 82% destacada. | Overlay: "82% AUTO — 1 MES". |
| 3-13s | `"Llegaron 1,247 mensajes. Jarvis contestó 1,022 sin escalación. 225 escaló a humano — casos complejos, pedidos específicos, quejas. Exactamente lo que debería escalar."` | Gráfico donut: 82% vs 18%. Números específicos al costado. | Overlay: "1,022 / 1,247". |
| 13-28s | `"La arquitectura: cuando entra un mensaje, Jarvis usa Claude Sonnet con contexto — historial del usuario, productos, FAQs. Si la respuesta tiene baja confianza, escala. Si es alta confianza, responde en 3 segundos."` | Diagrama de arquitectura: webhook → context → Claude → confidence check → response | scalate. | Overlay: "confidence threshold = clave". |
| 28-42s | `"Tiempo promedio de respuesta humana antes: 4 horas. Con Jarvis: 3 segundos. Tasa de leads calificados subió 18%. Porque responder rápido importa más que responder perfecto."` | Comparativa: 4h vs 3s. Gráfico de conversión +18%. | Overlay: "velocity > perfection". |
| 42-55s | `"Jarvis corre en Docker, en un VPS de 8 dólares al mes. Todo open source, sin SaaS caro. La IA en producción no es hype — es un docker-compose up."` | Terminal con `docker-compose up -d jarvis`. VPS dashboard. | Overlay: "$8/mes hosting". |

## Prosody ElevenLabs
- `<prosody rate="98%">` base.
- `<emphasis level="strong">` en: "82%", "1,022", "3 segundos", "docker-compose up".
- `<break time="0.4s"/>` antes de: "La arquitectura", "Jarvis corre en Docker".

## B-roll requerido
- Dashboard Grafana con métricas
- Gráfico donut 82/18
- Diagrama de arquitectura de Jarvis
- Comparativa tiempo de respuesta
- Gráfica de conversión +18%
- Terminal con docker-compose
- VPS dashboard

## Retención loop
El 82% es creíble (no 100%) porque admite el 18% humano. El costo $8/mes absurdo genera "no puede ser". Comentarios se llenan de "¿lo abren como open source?".

## CTA
"Arquitectura Jarvis + docker-compose.yml en mi GitHub. Link en perfil."

## Por qué funciona
Agente WhatsApp IA es trending. Pero nadie muestra métricas reales (82%, 1247, 18%). Combina datos duros + arquitectura visible + costo absurdamente bajo. Velocity > perfection es insight compartible.
