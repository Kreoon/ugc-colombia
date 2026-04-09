import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: "4px",
        }}
      >
        <span
          style={{
            color: "#D4A017",
            fontSize: "10px",
            fontWeight: 700,
            fontFamily: "sans-serif",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          UGC
        </span>
      </div>
    ),
    { ...size }
  );
}
