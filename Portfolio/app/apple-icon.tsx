import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/** Home-screen icon: the favicon's "Z" stroke and trace dot at 180px. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b1430",
      }}
    >
      <svg width="180" height="180" viewBox="0 0 32 32">
        <path
          d="M10.5 10.5h11l-11 11h11"
          fill="none"
          stroke="#e9edfa"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24.5" cy="24.5" r="2.2" fill="#f5b53f" />
      </svg>
    </div>,
    size,
  )
}
