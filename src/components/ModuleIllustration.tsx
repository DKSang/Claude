interface ModuleIllustrationProps {
  moduleId: string;
}

type IllustrationKind =
  | "introduction"
  | "source"
  | "storage"
  | "ingestion"
  | "modeling"
  | "orchestration"
  | "streaming"
  | "enterprise";

function kindFor(moduleId: string): IllustrationKind {
  if (moduleId.includes("introduction")) return "introduction";
  if (moduleId.includes("source")) return "source";
  if (moduleId.includes("storage")) return "storage";
  if (moduleId.includes("ingestion")) return "ingestion";
  if (moduleId.includes("modeling")) return "modeling";
  if (moduleId.includes("orchestration")) return "orchestration";
  if (moduleId.includes("streaming")) return "streaming";
  if (moduleId.includes("enterprise")) return "enterprise";
  return "introduction";
}

const BG = "var(--bg-tertiary)";
const CLAY = "var(--color-clay)";
const MINERAL = "var(--color-mineral)";
const SKY = "var(--color-sky)";
const FIG = "var(--color-fig)";
const OLIVE = "var(--color-olive)";
const OAT = "var(--color-oat)";

export function ModuleIllustration({ moduleId }: ModuleIllustrationProps) {
  const kind = kindFor(moduleId);

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 7",
        background: `linear-gradient(135deg, ${BG}, var(--bg-secondary))`,
        borderRadius: "var(--radius-small)",
        overflow: "hidden",
        marginBottom: "var(--space-1)",
        position: "relative",
      }}
    >
      <svg viewBox="0 0 320 140" className="w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice">
        {renderKind(kind)}
      </svg>
    </div>
  );
}

function renderKind(kind: IllustrationKind) {
  switch (kind) {
    case "introduction":
      return (
        <>
          <circle cx="160" cy="70" r="50" fill={OAT} opacity="0.5" />
          <circle cx="160" cy="70" r="32" fill="none" stroke={CLAY} strokeWidth="2" opacity="0.5" />
          <circle cx="160" cy="70" r="18" fill="none" stroke={MINERAL} strokeWidth="2" opacity="0.6" />
          <circle cx="160" cy="70" r="6" fill={CLAY} />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 160 + Math.cos(rad) * 18;
            const y1 = 70 + Math.sin(rad) * 18;
            const x2 = 160 + Math.cos(rad) * 48;
            const y2 = 70 + Math.sin(rad) * 48;
            return (
              <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={CLAY} strokeWidth="1.5" opacity="0.4" />
            );
          })}
        </>
      );
    case "source":
      return (
        <>
          {[
            { x: 50, y: 40 },
            { x: 50, y: 70 },
            { x: 50, y: 100 },
            { x: 80, y: 55 },
            { x: 80, y: 85 },
          ].map((s, i) => (
            <g key={i}>
              <circle cx={s.x} cy={s.y} r="7" fill={[CLAY, MINERAL, SKY, FIG, OLIVE][i]} opacity="0.7" />
              <path
                d={`M ${s.x + 7} ${s.y} C 130 ${s.y}, 200 70, 250 70`}
                stroke="var(--border-secondary)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </g>
          ))}
          <circle cx="260" cy="70" r="14" fill={CLAY} opacity="0.18" />
          <circle cx="260" cy="70" r="8" fill={CLAY} />
        </>
      );
    case "storage":
      return (
        <>
          {[55, 100, 145].map((y, i) => (
            <g key={i}>
              <ellipse cx="160" cy={y} rx="50" ry="10" fill={[MINERAL, SKY, CLAY][i]} opacity="0.25" />
              <path
                d={`M 110 ${y} L 110 ${y + 28} A 50 10 0 0 0 210 ${y + 28} L 210 ${y}`}
                fill={[MINERAL, SKY, CLAY][i]}
                opacity="0.14"
              />
              <ellipse cx="160" cy={y} rx="50" ry="10" fill="none" stroke={[MINERAL, SKY, CLAY][i]} strokeWidth="1.5" opacity="0.5" />
            </g>
          ))}
        </>
      );
    case "ingestion":
      return (
        <>
          <path d="M 90 35 L 230 35 L 200 70 L 260 70 L 210 110 L 110 110 L 60 70 L 120 70 Z" fill={CLAY} opacity="0.1" />
          <path d="M 90 35 L 230 35 L 200 70 L 260 70 L 210 110 L 110 110 L 60 70 L 120 70 Z" fill="none" stroke={CLAY} strokeWidth="1.5" opacity="0.4" />
          <path d="M 160 40 L 160 105" stroke={CLAY} strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="160" cy="118" r="6" fill={CLAY} />
        </>
      );
    case "modeling":
      return (
        <>
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => {
              const x = 70 + c * 36;
              const y = 35 + r * 24;
              const hot = (r + c) % 5 === 0;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={x}
                  y={y}
                  width={30}
                  height={18}
                  rx={3}
                  fill={hot ? CLAY : OAT}
                  opacity={hot ? 0.5 : 0.6}
                  stroke="var(--border-secondary)"
                  strokeWidth="1"
                />
              );
            })
          )}
        </>
      );
    case "orchestration":
      return (
        <>
          {[
            { x: 90, y: 50 },
            { x: 160, y: 35 },
            { x: 160, y: 90 },
            { x: 230, y: 55 },
            { x: 230, y: 100 },
          ].map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="11" fill={[CLAY, MINERAL, SKY, FIG, OLIVE][i]} opacity="0.18" />
              <circle cx={n.x} cy={n.y} r="11" fill="none" stroke={[CLAY, MINERAL, SKY, FIG, OLIVE][i]} strokeWidth="1.5" opacity="0.6" />
              <circle cx={n.x} cy={n.y} r="4" fill={[CLAY, MINERAL, SKY, FIG, OLIVE][i]} />
            </g>
          ))}
          {[
            "M 101 50 L 149 36",
            "M 160 46 L 160 79",
            "M 171 38 L 222 54",
            "M 171 92 L 222 98",
          ].map((d, i) => (
            <path key={i} d={d} stroke="var(--border-secondary)" strokeWidth="1.5" strokeDasharray="4 4" />
          ))}
        </>
      );
    case "streaming":
      return (
        <>
          {[45, 70, 95].map((y, i) => (
            <path
              key={i}
              d={`M 40 ${y} Q 80 ${y - 18}, 120 ${y} T 200 ${y} T 280 ${y}`}
              stroke={[SKY, MINERAL, CLAY][i]}
              strokeWidth="2"
              opacity="0.5"
            />
          ))}
          <circle cx="50" cy="70" r="5" fill={SKY} />
          <circle cx="270" cy="70" r="5" fill={CLAY} />
        </>
      );
    case "enterprise":
      return (
        <>
          <path
            d="M 130 60 Q 150 40, 175 48 Q 195 38, 210 55 Q 230 52, 232 72 L 128 72 Z"
            fill={SKY}
            opacity="0.16"
          />
          <path
            d="M 130 60 Q 150 40, 175 48 Q 195 38, 210 55 Q 230 52, 232 72 L 128 72 Z"
            fill="none"
            stroke={SKY}
            strokeWidth="1.5"
            opacity="0.4"
          />
          {[70, 110, 150, 190, 230].map((x, i) => (
            <g key={i}>
              <rect x={x} y={80} width={26} height={32} rx={3} fill={[CLAY, MINERAL, SKY, FIG, OLIVE][i]} opacity="0.18" />
              <rect x={x} y={80} width={26} height={32} rx={3} fill="none" stroke={[CLAY, MINERAL, SKY, FIG, OLIVE][i]} strokeWidth="1.5" opacity="0.5" />
            </g>
          ))}
        </>
      );
  }
}
