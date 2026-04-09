import { ImageResponse } from "next/og";

export const alt = "UGC Colombia — Contenido real, resultados reales.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
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
          background:
            "linear-gradient(135deg, #000000 0%, #1a1a1a 60%, #3D3D3C 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent glow overlays */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at 20% 80%, rgba(212,160,23,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(249,179,52,0.08) 0%, transparent 50%)",
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
              padding: "8px 24px",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                color: "#D4A017",
                fontSize: "20px",
                letterSpacing: "0.25em",
                fontWeight: 700,
              }}
            >
              UGC COLOMBIA
            </span>
          </div>

          {/* Headline line 1 */}
          <div
            style={{
              color: "#ffffff",
              fontSize: "104px",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            CONTENIDO REAL,
          </div>

          {/* Headline line 2 */}
          <div
            style={{
              color: "#F9B334",
              fontSize: "104px",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            RESULTADOS REALES.
          </div>

          {/* Tagline */}
          <div
            style={{
              color: "#BDBCBC",
              fontSize: "26px",
              marginTop: "20px",
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
            height: "8px",
            background:
              "linear-gradient(90deg, #C9940A, #D4A017, #F9B334, #D4A017, #C9940A)",
          }}
        />

        {/* URL esquina inferior derecha */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            right: "44px",
            color: "#BDBCBC",
            fontSize: "18px",
            letterSpacing: "0.08em",
            fontWeight: 500,
          }}
        >
          ugccolombia.co
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
