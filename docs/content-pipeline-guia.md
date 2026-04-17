# Guía del Pipeline de Contenido UGC Colombia

> Destinatario principal: **Tanya (Community Manager)**. Aplicable también a Diana, Brian, Samuel y Valentina.
> Última actualización: 2026-04-17 · Pipeline v3 · Handle oficial único `@agenciaugccolombia`

---

## ¿Qué hace este pipeline?

Convierte una idea en lenguaje natural (*"hazme un carrusel sobre los 3 errores más comunes en UGC"*) en un entregable completo listo para publicar:

- 10 imágenes finales con overlay tipográfico + logo oficial
- Caption en español colombiano + 20 hashtags
- Entry en el calendario editorial con fecha programada
- Todo respetando el manual de marca (paleta, fuentes, logo, voz)

**Tiempo total:** 5-10 minutos por carrusel.
**Tu participación:** describir el tema, aprobar el brief, copiar-pegar en Instagram.

---

## Parte 1 — Setup inicial (una sola vez, ~20 min)

### 🍎 Instrucciones para Mac

#### 1.1 Instalar Node.js
Abre la **Terminal** (⌘ Space → escribe "Terminal" → Enter) y pega:

```bash
# Instalar Homebrew (si no lo tienes)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node
```

**Verificar:**
```bash
node --version
```
Debe mostrar `v20.x.x` o mayor.

#### 1.2 Instalar Git (si no está)
```bash
brew install git
```

#### 1.3 Instalar Claude Code
Descarga desde **https://claude.ai/code** → arrastra a Aplicaciones → ábrelo → login con tu cuenta de Anthropic.

(Si no tienes cuenta, pídele a Alexander que te cree una.)

#### 1.4 Clonar el proyecto
```bash
cd ~/Documents
mkdir -p GitHub
cd GitHub
git clone https://github.com/AlexanderKast/UGC-Colombia.git "UGC Colombia"
cd "UGC Colombia"
```

#### 1.5 Instalar dependencias del pipeline
```bash
cd scripts/image-gen
npm install
cd ../..
```
Tarda 2-3 minutos. Warnings son normales, ignorálos.

#### 1.6 Tu API key de Gemini
1. Abre Safari/Chrome → https://aistudio.google.com/apikey
2. Login con tu cuenta de Google de trabajo
3. Click **"Create API key"** → copia la key completa
4. Crear archivo con la key:
   ```bash
   echo "GEMINI_API_KEY=PEGA_TU_KEY_AQUI" > web/.env.local
   ```
   (Reemplaza `PEGA_TU_KEY_AQUI` por tu key real antes de ejecutar.)

#### 1.7 Abrir el proyecto en Claude Code
- Abre la app **Claude Code**
- `File → Open Folder` → selecciona `~/Documents/GitHub/UGC Colombia`
- Listo.

---

### 🪟 Instrucciones para Windows

#### 1.1 Instalar Node.js
1. Abre navegador → **https://nodejs.org/**
2. Click en botón verde izquierdo (**LTS**)
3. Doble-click al archivo `.msi` descargado
4. Next → Next → Next → Install
5. **Verificar:** abre **Terminal de Windows** (tecla Windows → escribe "Terminal" → Enter) y pega:
   ```bash
   node --version
   ```
   Debe mostrar `v20.x.x` o mayor.

#### 1.2 Instalar Git (si no está)
1. Navegador → **https://git-scm.com/download/win**
2. Descarga → instala con opciones default.

#### 1.3 Instalar Claude Code
Descarga desde **https://claude.ai/code** → instala como cualquier app → ábrelo → login con tu cuenta de Anthropic.

#### 1.4 Clonar el proyecto
En la Terminal de Windows:
```bash
cd Documents
mkdir GitHub
cd GitHub
git clone https://github.com/AlexanderKast/UGC-Colombia.git "UGC Colombia"
cd "UGC Colombia"
```

#### 1.5 Instalar dependencias del pipeline
```bash
cd scripts/image-gen
npm install
cd ../..
```

#### 1.6 Tu API key de Gemini
1. Navegador → https://aistudio.google.com/apikey
2. Login con tu cuenta de Google de trabajo
3. Click **"Create API key"** → copia la key completa
4. Abre el **Bloc de notas** → pega una sola línea:
   ```
   GEMINI_API_KEY=pega_tu_key_aqui
   ```
5. Guardar como → navega a `Documents\GitHub\UGC Colombia\web\` → nombre: `.env.local` (con el punto al inicio) → tipo: "Todos los archivos" → Guardar.

#### 1.7 Abrir el proyecto en Claude Code
- Abre la app **Claude Code**
- `File → Open Folder` → selecciona `Documents\GitHub\UGC Colombia`
- Listo.

---

## Parte 2 — Workflow fácil (cada vez que creas contenido)

**Todo se hace escribiendo en el chat de Claude Code.** No hace falta abrir la terminal.

### 2.1 Abre Claude Code con el proyecto

Asegúrate de que Claude Code tenga abierta la carpeta **UGC Colombia**.

### 2.2 Escribe tu pedido en el chat

Ejemplos de pedidos que funcionan:

| Pedido | Qué produce |
|---|---|
| *"Hazme un carrusel IG educativo de 10 slides sobre los 5 errores que matan un brief UGC. Firma Tanya."* | Carrusel completo |
| *"Necesito un reel para TikTok sobre por qué el primer segundo decide todo."* | Guion de reel + frames |
| *"Un post de LinkedIn firmado por Alexander sobre la diferencia entre UGC y influencer marketing."* | Post LinkedIn + imagen |
| *"Carrusel de 8 slides sobre cómo elegir creador UGC para skincare, pilar casos."* | Carrusel temático |

**Tip:** mientras más específico el pedido (tema + pilar + plataforma + firma), mejor resultado.

### 2.3 Aprueba el brief

Claude Code te muestra:
- Pilar elegido + % del mix
- Hook + fórmula viral
- Los 10 slides con sus prompts visuales
- Caption y hashtags propuestos
- Comando listo para generar

Te pregunta: **"¿Lo ejecuto?"**

Respondes: **"sí"** (o pides ajustes tipo *"cambia el slide 3 para que muestre un teléfono en vez de una laptop"*).

### 2.4 Espera el proceso (5-8 min)

Claude Code te va contando en vivo:
1. Generando 10 imágenes con Nanobanana
2. Validando brand compliance
3. Analizando layout de cada imagen
4. Aplicando tipografía + logo
5. Escribiendo caption
6. Agendando en calendario

Si una imagen sale con texto espurio o mal concepto, Claude la regenera solo (máx 2 reintentos).

### 2.5 Abrí el entregable

Claude te da la ruta exacta, algo como:

```
web/public/brand/social/20260418-<tu-tema>/
```

Abre esa carpeta desde el explorador de archivos. Verás:

- `slide-01-portada-final.png` → `slide-10-cta-final.png` (**los que subes a IG**)
- `raw/` (los originales sin texto, por si quieres retocar algo en Canva)
- `caption.md` (caption + hashtags para copiar)
- `qa-report.json` (reporte de validación)
- Otros JSON de trazabilidad

### 2.6 Publicar en Instagram

1. Instagram (app o web) → Nuevo post → **Carrusel**
2. Arrastra los 10 PNGs **en orden** (slide-01 primero, slide-10 último)
3. Abre `caption.md` → copia todo el bloque del caption principal → pega en IG
4. Hora sugerida: está en el archivo del calendario en `content/calendar/YYYY-MM/`
5. Publicar

---

## Parte 3 — Workflow avanzado (terminal, opcional)

Solo si ya tienes un brief JSON escrito y quieres correr todo de un solo comando.

```bash
node scripts/ship-content.mjs --brief=drafts/YYYYMMDD-<slug>-brief.json
```

El script pausa entre etapas que requieren IA. Cuando pausa, te dice qué sub-agente invocar. Reanudas con:

```bash
node scripts/ship-content.mjs --brief=... --from=<N>
```

En el día a día el **modo fácil (Parte 2)** es más cómodo.

---

## Parte 4 — Solución de problemas

| Problema | Solución |
|---|---|
| *"GEMINI_API_KEY not found"* | Revisa `web/.env.local` — debe tener exactamente `GEMINI_API_KEY=tu-key` sin comillas |
| *"cannot find module sharp"* o similar | Corre `cd scripts/image-gen && npm install` |
| Una imagen salió fea o con texto espurio | En chat: *"regenera el slide 3 con este cambio: [describe]"* |
| Quiero cambiar un texto sin regenerar imágenes | En chat: *"cambia el headline del slide 3 por: [texto nuevo]"* — recompone solo lo necesario |
| Claude Code está tardando mucho | Escribe *"¿en qué etapa vas?"* — te resume |
| Se cayó la generación a la mitad | En chat: *"reanuda desde el slide 5"* |
| El layout tapa al sujeto de la foto | En chat: *"re-analiza el layout del slide X, el texto tapa a la creadora"* |

---

## Parte 5 — Reglas que el pipeline ya aplica automáticamente

No hace falta que las recuerdes, pero es bueno saber qué **NO** vas a tener que pedir manualmente:

### Branding (auto)
- ✅ Paleta oficial: `#F9B334` `#000000` `#F5F5F0` `#3D3D3C` `#BDBCBC` `#FFFFFF`
- ✅ Tipografías: Anton (display) + Inter (sans)
- ✅ Logo oficial UGC Colombia en portada + CTA (variante white sobre oscuros, color sobre crema)
- ✅ Clearspace del logo respetado (24px mínimo)

### Handle (auto)
- ✅ Único `@` permitido: **`@agenciaugccolombia`**
- ❌ Nunca aparece `@tanyaferrero`, `@alexanderkast`, `@ugccolombia` ni otros handles personales
- La firma del autor queda registrada en el calendario para trazabilidad, pero no se expone públicamente

### Voz y copy (auto)
- ✅ Voz por firma: Tanya (amiga que sabe), Alexander (autoridad), Brian (ops), Diana (operativo), Samuel (técnico)
- ✅ Caption máx 1800 chars
- ✅ 20 hashtags mix (5 nicho + 10 medio + 5 amplio)
- ❌ Sin "hola familia", "mi gente linda", "te va a encantar"
- ❌ Sin emojis excesivos (máx 3 en pilar educativo/casos, 0 en estratégico)

### Calidad visual (auto)
- ✅ QA visual de cada PNG antes de aplicar overlay
- ✅ Layout image-aware: sombra, glow, scrim y posición se deciden analizando cada imagen
- ✅ Sin texto espurio de la IA (BRAND_NEGATIVE endurecido)

---

## Parte 6 — Cadencia sugerida por firma

El pipeline respeta esta programación automáticamente cuando sugiere fechas:

| Firma | Plataforma | Días ideales | Hora |
|---|---|---|---|
| Tanya | IG carousel | Mar · Jue · Sáb | 19:00 COT |
| Tanya | Reel | Lun · Mié · Vie | 20:00 COT |
| Tanya | Story | Diario | 09:00 + 19:00 |
| Alexander | LinkedIn post | Mar · Jue | 08:00 |
| Alexander | YouTube long | Dom | 10:00 |
| Brian | LinkedIn | Lun · Mié | 08:00 |

---

## Parte 7 — Resumen ultra corto

### Setup (una sola vez)
1. Node.js → nodejs.org
2. Git → git-scm.com (Windows) / `brew install git` (Mac)
3. Claude Code → claude.ai/code
4. `git clone` el repo en `Documents/GitHub/`
5. `cd scripts/image-gen && npm install`
6. `GEMINI_API_KEY` en `web/.env.local`

### Cada contenido
1. Abre Claude Code con el proyecto
2. Escribe en chat: *"hazme un carrusel sobre X, firma [yo]"*
3. Di **"sí"** cuando te pregunte
4. Esperas 5-8 min
5. Copias los PNGs + caption → subes a IG

---

## Parte 8 — Si algo no entiendes

Pregúntale a Claude Code directamente en el chat. Ejemplos:
- *"¿cómo regenero solo el slide 3?"*
- *"¿dónde quedó el archivo final?"*
- *"¿qué mix de pilares llevo esta semana?"*
- *"muéstrame los últimos 5 contenidos que publiqué"*

Claude Code conoce todo el proyecto, todas las reglas, y responde en español.

---

_Pipeline v3 · Generado 2026-04-17 · Mantenedor: Alexander Kast · Herramienta: Claude Code + Nanobanana (Gemini 2.5 Flash Image)_
