import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "#182C4A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FAF7EE",
          fontWeight: 800,
          borderRadius: "8px",
          fontFamily: "serif",
          letterSpacing: "-0.5px",
        }}
      >
        JP
      </div>
    ),
    {
      ...size,
    }
  );
}
