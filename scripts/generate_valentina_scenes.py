#!/usr/bin/env python3
"""Regenera los 50 guiones de Valentina agregando scenes[] dopaminico al YAML.

Lee la tabla markdown existente (Tiempo | Audio/Voz | Visual | Notas) y la
convierte en una lista YAML estructurada con campos:
  - id, t_start, t_end, beat, voice, visual, broll, creator_action, sfx, dopamine

Mantiene slug, todos los campos existentes y todo el cuerpo markdown.
Solo inyecta `scenes:` al final del frontmatter (antes del cierre ---).
"""
from __future__ import annotations
import re
from pathlib import Path

PACK_DIR = Path(r"F:/Users/SICOMMER SAS/Documents/GitHub/UGC Colombia/content/viralidad/packs/valentina")

# ---------- helpers de parseo ----------

FM_RE = re.compile(r"^---\n(.*?)\n---\n(.*)$", re.DOTALL)

def parse_time_range(t: str) -> tuple[int, int]:
    """'0-3s' -> (0, 3)"""
    t = t.strip().replace("s", "").replace(" ", "")
    a, b = t.split("-")
    return int(a), int(b)

def extract_voice(cell: str) -> str:
    """Extrae texto entre backticks o devuelve la celda limpia."""
    m = re.search(r"`\"?(.+?)\"?`", cell, re.DOTALL)
    if m:
        return m.group(1).strip()
    return cell.strip().strip('"')

def yaml_escape(s: str) -> str:
    """Escapa comillas dobles para YAML inline."""
    s = s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip()
    # colapsa espacios múltiples
    s = re.sub(r"\s+", " ", s)
    return s

def split_table(body: str) -> list[list[str]]:
    """Devuelve filas de la tabla de timing (sin header ni separador)."""
    lines = body.splitlines()
    rows: list[list[str]] = []
    in_table = False
    for ln in lines:
        if ln.startswith("|") and "Tiempo" in ln:
            in_table = True
            continue
        if in_table and ln.startswith("|---"):
            continue
        if in_table:
            if not ln.startswith("|"):
                break
            cells = [c.strip() for c in ln.strip().strip("|").split("|")]
            if len(cells) >= 4:
                rows.append(cells)
    return rows

# ---------- generación de campos derivados (creator_action, sfx, dopamine) ----------

def derive_creator_action(angle: str, visual: str, voice: str, idx: int, total: int) -> str:
    """creator_action: emocional en lifestyle, técnico en tecnico."""
    v_low = visual.lower()
    if angle == "tecnico":
        if "valentina" in v_low and ("cámara" in v_low or "camara" in v_low):
            if idx == 0:
                return "Valentina mira a cámara con expresión segura, leve sonrisa, mano gesticulando hacia el monitor detrás suyo"
            return "Valentina cierra a cámara con sonrisa cálida, asiente confirmando, mano abierta como invitando a guardar"
        if "screen recording" in v_low or "davinci" in v_low or "capcut" in v_low or "premiere" in v_low or "timeline" in v_low:
            return "Cursor del mouse se mueve con intención clara, click preciso en el panel exacto, sin dudas — ritmo de editora pro"
        if "split screen" in v_low or "antes" in v_low or "comparativ" in v_low:
            return "Cabeza ladeándose un grado al comparar, ojos del viewer guiados por flecha animada, micro-pausa en el reveal"
        if "dashboard" in v_low or "analytics" in v_low or "meta ads" in v_low:
            return "Dedo señalando el número en pantalla, zoom suave que aprieta el dato, micro-vibración del overlay"
        return "Mano de Valentina ajusta el control con precisión quirúrgica, mirada fija en el resultado, sin parpadeo"
    # lifestyle
    if idx == 0:
        return "Valentina mira a cámara con calma, paisa cercana, deja una pausa de medio segundo antes de soltar la frase"
    if idx == total - 1:
        return "Valentina sonríe medio lado, baja la mirada un instante, cierra con voz más suave — invitación íntima"
    if "flores" in v_low or "café" in v_low or "cafe" in v_low or "ritual" in v_low:
        return "Manos de Valentina tocan el objeto con cuidado, plano detalle, respiración audible, ASMR sutil"
    if "estudio" in v_low or "setup" in v_low or "escritorio" in v_low or "monitor" in v_low:
        return "Valentina recorre el espacio con la mirada, deja la cámara seguir su movimiento, sensación habitada"
    if "screenshot" in v_low or "whatsapp" in v_low or "notion" in v_low:
        return "Pantalla pasa por encima del hombro de Valentina, ella mira con cariño los mensajes — es real, es suyo"
    return "Valentina habla con manos, cabeza ligeramente inclinada hacia un lado, micro-sonrisa entre frases — paisa cálida"

def derive_sfx(angle: str, visual: str, voice: str, idx: int, total: int) -> str:
    v_low = visual.lower()
    if idx == 0:
        return "Beat seco que arranca + whoosh corto sincronizado al overlay del título"
    if idx == total - 1:
        return "Música sube de volumen, ding suave en el end card, fade out controlado a -20 LUFS"
    if angle == "tecnico":
        if "click" in v_low or "screen recording" in v_low or "timeline" in v_low:
            return "Click de mouse real grabado + tick tipográfico cuando aparece overlay numérico"
        if "antes" in v_low or "comparativ" in v_low or "split" in v_low:
            return "Whoosh corto en la transición + pop al revelar el lado bueno"
        if "dashboard" in v_low or "analytics" in v_low:
            return "Riser bajo + ding agudo cuando el número entra en pantalla"
        return "Beat sigue, tick tipográfico en cada overlay, ducking suave bajo la voz"
    # lifestyle
    if "flores" in v_low or "ritual" in v_low or "café" in v_low:
        return "Foley ASMR del objeto + acústica cálida sin percusión, respiración natural"
    return "Música acústica baja, ambiente real (teclado, monitor zumbando), nada de SFX artificiales"

def derive_dopamine(angle: str, visual: str, voice: str, idx: int, total: int) -> str:
    """El gatillo dopamínico de la escena: por qué el cerebro queda enganchado."""
    v_low = visual.lower()
    voice_low = voice.lower()
    if idx == 0:
        return "Hook con stake claro + promesa específica que abre loop de curiosidad"
    if idx == total - 1:
        return "Cierre con autoridad (seis cifras / paisa cálida) + CTA accionable que recompensa al guardador"
    if angle == "tecnico":
        if any(n in voice_low for n in ["%", "frames", "lufs", "kelvin", "crf"]):
            return "Especificidad numérica rara (no redonda) que el cerebro registra como 'esto es real, esto es pro'"
        if "antes" in v_low or "comparativ" in v_low:
            return "Reveal antes/después: el cerebro premia la diferencia visible con dopamina de comprensión"
        if "screen recording" in v_low or "timeline" in v_low:
            return "Voyeur de proceso pro: ver la pantalla de alguien que sabe activa imitación + estatus"
        return "Pattern interrupt con dato concreto: el viewer no puede predecir el siguiente frame"
    # lifestyle
    if any(w in voice_low for w in ["mamá", "mama", "lloré", "llore", "miedo", "renuncia"]):
        return "Vulnerabilidad real activa neuronas espejo: el viewer se ve reflejado y guarda"
    if "flores" in v_low or "café" in v_low or "ritual" in v_low:
        return "Detalle sensorial aspiracional sin ostentación: dopamina de pertenencia + calma"
    return "Identificación femenina en oficio creativo: el viewer-mujer se ve y se queda"

def derive_broll(angle: str, visual: str) -> str:
    """B-roll específico requerido para esa escena."""
    v_low = visual.lower()
    if angle == "tecnico":
        if "davinci" in v_low:
            return "Screen recording 4K DaVinci Resolve 19 (color page o edit page según escena), cursor visible, panels limpios"
        if "capcut" in v_low:
            return "Screen recording vertical CapCut Pro (panel derecho text/style visible), grabado a 60fps"
        if "premiere" in v_low:
            return "Screen recording Premiere Pro (timeline + Lumetri), cursor visible, sin paneles flotantes"
        if "dashboard" in v_low or "meta ads" in v_low or "analytics" in v_low:
            return "Captura limpia Meta Ads Manager o Ads Library (datos blureados si son de cliente real)"
        if "split" in v_low or "antes" in v_low:
            return "Dos clips reales montados en split-screen 9:16 con divisor blanco de 2px y labels"
        if "valentina" in v_low and "cámara" in v_low:
            return "Plano medio Valentina en setup editora (Sony A7III, 35mm f1.8), monitor con DaVinci visible al fondo blureado"
        return "B-roll técnico específico al software mencionado, grabado en pantalla real (no mockup)"
    # lifestyle
    if "valentina" in v_low and ("cámara" in v_low or "directa" in v_low):
        return "Valentina a cámara, luz natural cálida ventana izquierda, fondo apartamento Medellín"
    if "flores" in v_low:
        return "Close-up macro flores frescas, plano detalle agua del florero, manos cortando tallo"
    if "estudio" in v_low or "setup" in v_low:
        return "Recorrido handheld del espacio de trabajo, focus pulls suaves, luz cálida 5pm"
    if "screenshot" in v_low or "whatsapp" in v_low or "notion" in v_low:
        return "Captura mockup vertical estilizada, fondo desenfocado de Valentina, ASMR teclado real"
    return "B-roll lifestyle aspiracional cálido (manos, detalles, luz natural), evitar stock genérico"

def derive_beat(idx: int, total: int, voice: str) -> str:
    """Etiqueta narrativa de la escena."""
    if idx == 0:
        return "hook"
    if idx == total - 1:
        return "cta"
    if idx == 1:
        return "setup"
    if idx == total - 2:
        return "payoff"
    if idx == total // 2:
        return "reveal"
    return "build"

# ---------- escritura del scenes[] YAML ----------

def build_scenes_yaml(rows: list[list[str]], angle: str) -> str:
    total = len(rows)
    out = ["scenes:"]
    for i, row in enumerate(rows):
        time_cell, voice_cell, visual_cell, notes_cell = row[0], row[1], row[2], row[3]
        try:
            t_start, t_end = parse_time_range(time_cell)
        except Exception:
            t_start, t_end = 0, 0
        voice = extract_voice(voice_cell)
        visual = visual_cell.strip()
        notes = notes_cell.strip()
        beat = derive_beat(i, total, voice)
        creator_action = derive_creator_action(angle, visual, voice, i, total)
        sfx = derive_sfx(angle, visual, voice, i, total)
        dopamine = derive_dopamine(angle, visual, voice, i, total)
        broll = derive_broll(angle, visual)

        out.append(f"  - id: s{i+1:02d}")
        out.append(f"    t_start: {t_start}")
        out.append(f"    t_end: {t_end}")
        out.append(f"    beat: {beat}")
        out.append(f'    voice: "{yaml_escape(voice)}"')
        out.append(f'    visual: "{yaml_escape(visual)}"')
        out.append(f'    broll: "{yaml_escape(broll)}"')
        out.append(f'    creator_action: "{yaml_escape(creator_action)}"')
        out.append(f'    sfx: "{yaml_escape(sfx)}"')
        out.append(f'    dopamine: "{yaml_escape(dopamine)}"')
        out.append(f'    overlay_notes: "{yaml_escape(notes)}"')
    return "\n".join(out)

# ---------- procesamiento de archivo ----------

def process_file(path: Path) -> tuple[str, int]:
    text = path.read_text(encoding="utf-8")
    m = FM_RE.match(text)
    if not m:
        return ("no-frontmatter", 0)
    fm = m.group(1)
    body = m.group(2)

    # Detect angle
    angle_match = re.search(r"^angle:\s*(\w+)", fm, re.MULTILINE)
    angle = angle_match.group(1) if angle_match else "tecnico"

    # Si ya tiene scenes:, lo eliminamos para regenerar
    fm_lines = fm.splitlines()
    cleaned = []
    skip = False
    for ln in fm_lines:
        if ln.startswith("scenes:"):
            skip = True
            continue
        if skip and (ln.startswith("  ") or ln.startswith("\t") or ln.startswith("- ")):
            continue
        skip = False
        cleaned.append(ln)
    fm_clean = "\n".join(cleaned).rstrip()

    rows = split_table(body)
    if not rows:
        return ("no-table", 0)

    scenes_yaml = build_scenes_yaml(rows, angle)
    new_fm = fm_clean + "\n" + scenes_yaml
    new_text = f"---\n{new_fm}\n---\n{body}"
    path.write_text(new_text, encoding="utf-8", newline="\n")
    return (angle, len(rows))

def main() -> None:
    files = sorted(PACK_DIR.glob("REEL-*.md"))
    tecnico = lifestyle = 0
    failed: list[str] = []
    for f in files:
        try:
            angle, n = process_file(f)
            if angle == "tecnico":
                tecnico += 1
            elif angle == "lifestyle":
                lifestyle += 1
            else:
                failed.append(f"{f.name}: {angle}")
            print(f"OK  {f.name}  angle={angle}  scenes={n}")
        except Exception as e:
            failed.append(f"{f.name}: {e}")
            print(f"ERR {f.name}: {e}")
    print(f"\nTotal: {len(files)}  tecnico={tecnico}  lifestyle={lifestyle}  failed={len(failed)}")
    for ff in failed:
        print(" -", ff)

if __name__ == "__main__":
    main()
