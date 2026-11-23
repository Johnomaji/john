import { ImageResponse } from "next/og";
import { profile, ventures } from "@/content/profile";

export const alt = `${profile.name} — ${profile.positioning.join(", ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori supports flexbox only (no grid) and ships a single font weight, so the
// hierarchy here is built from size, colour, and letter-spacing rather than bold.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf8f4",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 10,
            background: "#b4833a",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: 64,
            bottom: 8,
            fontSize: 320,
            color: "#b4833a",
            opacity: 0.1,
            letterSpacing: "-0.06em",
            display: "flex",
          }}
        >
          JO
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#8c5a2b",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          {profile.positioning.join("  ·  ")}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 112,
              color: "#121110",
              letterSpacing: "-0.035em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 28,
              maxWidth: 680,
              fontSize: 32,
              color: "#3a3734",
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            {profile.oneLiner}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: "1px solid #d3cabb",
            fontSize: 22,
            color: "#6b6560",
          }}
        >
          <div style={{ display: "flex" }}>
            {ventures.map((venture) => venture.name).join("  ·  ")}
          </div>
          <div style={{ display: "flex", color: "#8c5a2b" }}>
            {profile.siteUrl.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
