# `/brand` — Legacy (deprecated)

> **Fuente única de verdad del sistema de marca a partir de 2026-04-15:** módulo
> `/admin/marca` en la aplicación web (`web/src/app/admin/marca/`) + tokens en
> `web/src/lib/brand/tokens.ts`.
>
> El PDF canónico vive en `pdfs/MANUAL-DE-MARCA.pdf`. El admin replica cada
> capítulo del PDF con componentes React reales (logos, paleta, tipografía,
> efectos en vivo).
>
> Los archivos `.md` de esta carpeta se conservan como **histórico** y pueden
> contener información desactualizada. No consumir desde código de producción.

## Mapa de redirecciones

| Archivo legacy             | Reemplazo vivo                                    |
| -------------------------- | ------------------------------------------------- |
| `brand-guidelines.md`      | `/admin/marca/01-identidad`, `/admin/marca/07-voz` |
| `design-tokens.md`         | `/admin/marca/02-color`, `/admin/marca/03-tipografia`, `/admin/marca/06-sistema` |
| `logo-specs.md`            | `/admin/marca/04-logo`                            |
| `social-templates-spec.md` | `/admin/marca/11-plantillas`                      |
| `ad-assets-spec.md`        | `/admin/marca/11-plantillas`                      |
| `presentation-kit-spec.md` | `/admin/marca/11-plantillas`                      |
| `image-prompts.md`         | `scripts/image-gen/prompts/manual-assets.mjs`     |

## Reglas vigentes (extracto)

- **Propuesta de valor oficial:** **"CREAMOS CONTENIDO REAL QUE HACE CRECER MARCAS."**
  — guía toda la comunicación. Uso: subheads, ads, LinkedIn bio, email signatures.
- **Tagline operativo:** "HACEMOS CRECER MARCAS." — cierres de pieza, logo lock-up.
- **Descriptor boutique:** "Agencia boutique premium de UGC. Calidad USA, equipo
  latino, tecnología propia (Kreoon)."
- **Paleta oficial:** `#000000`, `#F9B334`, `#D4A017`, `#3D3D3C`, `#BDBCBC`,
  `#F5F5F0`, `#FFFFFF`, `#C9940A` (hover gold).
- **Gradiente signature:** `linear-gradient(90deg, #F9B334 0%, #D4A017 50%, #F9B334 100%)`.
- **Tipografía:** Anton 400 display · Inter 400/500/600/700 body.
- **Logo:** `/web/public/brand/logo-dark-bg.png` (814×351) + `/logo-light-bg.png`.
- **Regla innegociable:** cualquier uso del logo en variante NEGRA requiere
  fondo blanco sólido. Sobre fondos oscuros/foto usar siempre la variante blanca.
