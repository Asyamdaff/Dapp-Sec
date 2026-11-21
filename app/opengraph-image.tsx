import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0a0b0e",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: 4, color: "#7dd3fc", textTransform: "uppercase" }}>
          {site.title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", textAlign: "right" }}>
          <div style={{ fontSize: 72, fontWeight: 500, lineHeight: 1.05, maxWidth: 900 }}>{site.name}</div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#94a3b8" }}>
            Endpoint Security & Management · Security Engineering · Vulnerability Management
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
