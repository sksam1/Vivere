import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared Open Graph card. One renderer so every shared link carries the same
 * inscriptional treatment: gold on obsidian, Cinzel caps, hairline rules.
 *
 * Cinzel is vendored as TTF in `assets/fonts` rather than pulled from
 * `next/font`: Satori (what backs ImageResponse) reads ttf/otf/woff, and the
 * files next/font caches are woff2, which it cannot parse.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#c8a24c";
const GOLD_BRIGHT = "#e8cd83";
const OBSIDIAN = "#12100c";
const MARBLE = "#eae4d6";
const MARBLE_DIM = "#b3ab97";

type CardProps = {
  kicker: string;
  title: string;
  /** One entry per rendered line. Explicit so a sentence never splits awkwardly. */
  subtitle: string[];
  /** Title size in px. Long titles need a smaller setting to stay on one line. */
  titleSize?: number;
};

async function cinzel() {
  const dir = join(process.cwd(), "assets", "fonts");
  const [regular, semibold] = await Promise.all([
    readFile(join(dir, "Cinzel-Regular.ttf")),
    readFile(join(dir, "Cinzel-SemiBold.ttf")),
  ]);
  return [
    { name: "Cinzel", data: regular, style: "normal" as const, weight: 400 as const },
    { name: "Cinzel", data: semibold, style: "normal" as const, weight: 600 as const },
  ];
}

export async function ogCard({ kicker, title, subtitle, titleSize = 150 }: CardProps) {
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
          background: OBSIDIAN,
          // Coin-light from above, the same specular the site uses behind coins.
          backgroundImage:
            "radial-gradient(circle at 50% 8%, rgba(232,205,131,0.20) 0%, rgba(200,162,76,0.07) 34%, rgba(18,16,12,0) 62%)",
          fontFamily: "Cinzel",
          position: "relative",
        }}
      >
        {/* Inscriptional frame */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            right: 32,
            bottom: 32,
            border: `1px solid rgba(200,162,76,0.22)`,
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 9,
            color: MARBLE_DIM,
            textTransform: "uppercase",
          }}
        >
          {kicker}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: titleSize,
            fontWeight: 600,
            letterSpacing: titleSize * 0.1,
            // Cinzel is all-caps by design; the extra tracking is what makes it
            // read as carved rather than merely set.
            color: GOLD_BRIGHT,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 34,
            width: 220,
            height: 1,
            backgroundImage: `linear-gradient(90deg, rgba(200,162,76,0), ${GOLD} 20%, ${GOLD} 80%, rgba(200,162,76,0))`,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 34,
            fontSize: 30,
            lineHeight: 1.45,
            color: MARBLE,
          }}
        >
          {subtitle.map((line) => (
            <div key={line} style={{ display: "flex" }}>
              {line}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 74,
            display: "flex",
            fontSize: 17,
            letterSpacing: 7,
            color: GOLD,
            textTransform: "uppercase",
          }}
        >
          Press on. Stay the course.
        </div>
      </div>
    ),
    { ...size, fonts: await cinzel() },
  );
}
