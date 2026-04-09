import { ImageResponse } from "next/og";

export const alt = "UGC Colombia — Contenido real, resultados reales.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  // Carga Anton desde Google Fonts para el render de ImageResponse
  const antonFont = await fetch(
    "https://fonts.gstatic.com/s/anton/v25/1Ptgg87LROyAm0K08i4gS7lu.woff2"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 60%, #3D3D3C 100%)",
          fontFamily: "Anton, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grain texture overlay simulado con círculos sutiles */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at 20% 80%, rgba(212,160,23,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(249,179,52,0.05) 0%, transparent 50%)",
          }}
        />

        {/* Contenido central */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            zIndex: 1,
          }}
        >
          {/* Badge superior */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(212,160,23,0.15)",
              border: "1px solid rgba(212,160,23,0.4)",
              borderRadius: "999px",
              padding: "6px 20px",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                color: "#D4A017",
                fontSize: "18px",
                letterSpacing: "0.2em",
                fontFamily: "Anton, sans-serif",
              }}
            >
              UGC COLOMBIA
            </span>
          </div>

          {/* Headline line 1 */}
          <div
            style={{
              color: "#ffffff",
              fontSize: "96px",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              fontFamily: "Anton, sans-serif",
              textTransform: "uppercase",
            }}
          >
            CONTENIDO REAL,
          </div>

          {/* Headline line 2 */}
          <div
            style={{
              color: "#D4A017",
              fontSize: "96px",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              fontFamily: "Anton, sans-serif",
              textTransform: "uppercase",
            }}
          >
            RESULTADOS REALES.
          </div>

          {/* Tagline */}
          <div
            style={{
              color: "#BDBCBC",
              fontSize: "24px",
              marginTop: "16px",
              fontFamily: "sans-serif",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            La agencia UGC que está cambiando el juego en LATAM.
          </div>
        </div>

        {/* Border bottom dorado */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #C9940A, #D4A017, #F9B334, #D4A017, #C9940A)",
          }}
        />

        {/* URL esquina inferior derecha */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            right: "40px",
            color: "#3D3D3C",
            fontSize: "16px",
            fontFamily: "sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          ugccolombia.co
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Anton",
          data: antonFont,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
