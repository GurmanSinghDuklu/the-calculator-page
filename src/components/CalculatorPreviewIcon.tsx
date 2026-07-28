/**
 * Small illustrative SVG previews used on RelatedCalculators cards.
 * Static and pre-baked (not live data) — one visual "shape" per calculator
 * family, reused across every card that links to it. Cheap, consistent,
 * gives a sneak peek of what that tool's results look like.
 */

export type PreviewShape =
  | "growth-curve"   // compound interest, savings, ISA, 401k
  | "gauge"          // BMI, credit score
  | "donut"          // budget, tax breakdown
  | "bars"           // salary, comparison, cashback
  | "schedule"       // mortgage / loan amortisation
  | "pension-stack"  // retirement pot
  | "scale-tip"      // stamp duty / thresholds
  | "converter-swap"; // unit converters

const W = 160;
const H = 90;

function GrowthCurve({ accent }: { accent: string }) {
  const pts = [
    [4, 78], [24, 74], [44, 66], [64, 54], [84, 40], [104, 26], [124, 14], [156, 6],
  ];
  const line = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const area = `${line} L156,86 L4,86 Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <defs>
        <linearGradient id="gc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#gc-fill)" />
      <path d={line} fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="156" cy="6" r="3.5" fill={accent} />
    </svg>
  );
}

function Gauge({ accent }: { accent: string }) {
  const r = 34;
  const cx = W / 2, cy = 74;
  const circ = Math.PI * r;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeLinecap="round"
      />
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={`${circ * 0.68} ${circ}`}
      />
      <line x1={cx} y1={cy} x2={cx + 20} y2={cy - 22} stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="3.5" fill="white" />
    </svg>
  );
}

function Donut({ accent }: { accent: string }) {
  const cx = 42, cy = H / 2, r = 30;
  const segs = [0.45, 0.3, 0.25];
  const colors = [accent, `${accent}90`, `${accent}45`];
  let acc = 0;
  const circ = 2 * Math.PI * r;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      {segs.map((s, i) => {
        const dash = `${s * circ} ${circ}`;
        const offset = -acc * circ;
        acc += s;
        return (
          <circle
            key={i} cx={cx} cy={cy} r={r} fill="none" stroke={colors[i]} strokeWidth="12"
            strokeDasharray={dash} strokeDashoffset={offset}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        );
      })}
      <g transform="translate(96,20)">
        {segs.map((s, i) => (
          <rect key={i} x="0" y={i * 18} width="10" height="10" rx="2" fill={colors[i]} />
        ))}
      </g>
    </svg>
  );
}

function Bars({ accent }: { accent: string }) {
  const heights = [30, 50, 38, 66, 46, 74];
  const bw = 16, gap = 8;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={8 + i * (bw + gap)}
          y={82 - h}
          width={bw}
          height={h}
          rx="3"
          fill={i === heights.length - 1 ? accent : `${accent}55`}
        />
      ))}
    </svg>
  );
}

function Schedule({ accent }: { accent: string }) {
  const rows = 5;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      {Array.from({ length: rows }).map((_, i) => {
        const y = 10 + i * 15;
        const principalW = 20 + i * 20;
        const interestW = 100 - principalW;
        return (
          <g key={i}>
            <rect x="8" y={y} width={principalW} height="8" rx="2" fill={accent} />
            <rect x={8 + principalW + 2} y={y} width={interestW} height="8" rx="2" fill={`${accent}30`} />
          </g>
        );
      })}
    </svg>
  );
}

function PensionStack({ accent }: { accent: string }) {
  const bars = [
    { h: 20, c: `${accent}40` },
    { h: 34, c: `${accent}70` },
    { h: 54, c: accent },
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      {bars.map((b, i) => (
        <rect key={i} x={20 + i * 44} y={82 - b.h} width="30" height={b.h} rx="4" fill={b.c} />
      ))}
      <path d="M20,40 L64,26 L108,10" fill="none" stroke="white" strokeWidth="2" strokeDasharray="3 4" opacity="0.5" />
    </svg>
  );
}

function ScaleTip({ accent }: { accent: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <line x1="8" y1="82" x2="152" y2="82" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={16 + i * 34} y={82 - (16 + i * 16)} width="24" height={16 + i * 16} rx="3" fill={i === 3 ? accent : `${accent}${50 + i * 15}`} />
      ))}
    </svg>
  );
}

function ConverterSwap({ accent }: { accent: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <rect x="10" y="24" width="62" height="24" rx="6" fill="rgba(255,255,255,0.06)" stroke={`${accent}60`} />
      <rect x="88" y="42" width="62" height="24" rx="6" fill={`${accent}20`} stroke={accent} />
      <path d="M74,34 L86,34" stroke={accent} strokeWidth="2" markerEnd="url(#arrow)" />
      <path d="M86,54 L74,54" stroke={`${accent}90`} strokeWidth="2" />
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={accent} />
        </marker>
      </defs>
    </svg>
  );
}

const SHAPES: Record<PreviewShape, (p: { accent: string }) => JSX.Element> = {
  "growth-curve": GrowthCurve,
  gauge: Gauge,
  donut: Donut,
  bars: Bars,
  schedule: Schedule,
  "pension-stack": PensionStack,
  "scale-tip": ScaleTip,
  "converter-swap": ConverterSwap,
};

export function CalculatorPreviewIcon({ shape, accent }: { shape: PreviewShape; accent: string }) {
  const Shape = SHAPES[shape];
  return (
    <div className="w-full h-[72px] rounded-lg overflow-hidden bg-black/30 border border-white/5 flex items-center justify-center px-2">
      <Shape accent={accent} />
    </div>
  );
}
