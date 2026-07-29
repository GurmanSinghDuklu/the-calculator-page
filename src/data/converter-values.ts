// Programmatic per-value converter pages.
// Seeded from GSC data: queries where the site already ranks page 1-2
// (e.g. "1.95 meters to feet", "330 ml to oz", "8.8 oz to grams") but the
// generic converter page title doesn't match the query, so CTR is ~0%.
// Each value gets a dedicated page with the answer in the <title>.

export interface ValueRow {
  label: string;
  value: string;
  /** slug of a sibling page, for internal links */
  slug?: string;
}

export interface ConverterValuePage {
  slug: string;
  /** e.g. "1.95 m to Feet — 6 ft 4.8 in (6.4 Feet)" — answer in the title for SERP CTR */
  title: string;
  description: string;
  h1: string;
  keywords: string;
  /** Big headline result, e.g. "6 ft 4.8 in" */
  bigAnswer: string;
  /** One-sentence plain-text answer, lifted by featured snippets / AI engines */
  answer: string;
  formula: string;
  /** Extra result lines shown under the big answer */
  extraResults: { label: string; value: string }[];
  /** Nearby-values table (with links to sibling pages where they exist) */
  table: { title: string; columns: string[]; rows: ValueRow[] };
  faqs: { question: string; answer: string }[];
  parentPath: string;
  parentLabel: string;
  accent: string;
}

const r = (n: number, dp = 2) => Math.round(n * 10 ** dp) / 10 ** dp;
const slugify = (v: number) => String(v).replace(".", "-");

// ─── Metres → Feet ────────────────────────────────────────────────────────────
const FEET_PER_METRE = 3.28084;
const M_VALUES = [1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2.0];

function ftIn(m: number) {
  const total = m * FEET_PER_METRE;
  const ft = Math.floor(total);
  const inch = r((total - ft) * 12, 1);
  return { total: r(total), ft, inch };
}

function metresPage(m: number): ConverterValuePage {
  const { total, ft, inch } = ftIn(m);
  const slug = `${slugify(m)}-m-to-feet`;
  return {
    slug,
    title: `${m} m to Feet — ${ft} ft ${inch} in (${total} Feet)`,
    description: `${m} metres is ${ft} feet ${inch} inches, or ${total} feet. Exact conversion with formula, height table and metres-to-feet converter.`,
    h1: `${m} Metres to Feet`,
    keywords: `${m} m to feet, ${m} meters to feet, ${m} metres in feet, ${m}m in ft, how tall is ${m}m`,
    bigAnswer: `${ft} ft ${inch} in`,
    answer: `${m} metres is ${ft} feet ${inch} inches (${total} feet). To convert, multiply metres by 3.28084.`,
    formula: `${m} m × 3.28084 = ${total} ft`,
    extraResults: [
      { label: "Decimal feet", value: `${total} ft` },
      { label: "Feet & inches", value: `${ft}' ${inch}"` },
      { label: "Centimetres", value: `${r(m * 100, 1)} cm` },
    ],
    table: {
      title: "Nearby heights",
      columns: ["Metres", "Feet", "Ft & In"],
      rows: M_VALUES.map((v) => {
        const x = ftIn(v);
        return { label: `${v} m`, value: `${x.total} ft`, slug: v === m ? undefined : `${slugify(v)}-m-to-feet` };
      }),
    },
    faqs: [
      { question: `How tall is ${m} metres in feet and inches?`, answer: `${m} metres is ${ft} feet ${inch} inches. As a decimal it is ${total} feet.` },
      { question: `Is ${m} m a common height?`, answer: `Adult heights typically range from about 1.50 m (4 ft 11 in) to 2.00 m (6 ft 6.7 in). ${m} m equals ${ft} ft ${inch} in on that scale.` },
      { question: "What is the exact metres-to-feet formula?", answer: "Feet = metres × 3.28084. One international foot is defined as exactly 0.3048 metres, so metres = feet × 0.3048." },
    ],
    parentPath: "/converters/metres-to-feet",
    parentLabel: "Metres to Feet Converter",
    accent: "#6366F1",
  };
}

// ─── ml → fl oz ───────────────────────────────────────────────────────────────
const US_FLOZ_ML = 29.5735;
const UK_FLOZ_ML = 28.4131;
const ML_VALUES = [35, 50, 100, 250, 330, 473, 500, 568, 750];
const ML_NOTES: Record<number, string> = {
  330: "a standard drinks can",
  568: "one UK pint",
  473: "one US pint",
  35: "a large UK spirit measure",
  750: "a standard wine bottle",
};

function mlPage(ml: number): ConverterValuePage {
  const us = r(ml / US_FLOZ_ML);
  const uk = r(ml / UK_FLOZ_ML);
  const slug = `${slugify(ml)}-ml-to-oz`;
  const note = ML_NOTES[ml] ? ` (${ML_NOTES[ml]})` : "";
  return {
    slug,
    title: `${ml} ml to oz — ${us} US fl oz (${uk} UK fl oz)`,
    description: `${ml} ml${note} is ${us} US fluid ounces or ${uk} UK (imperial) fluid ounces. Both conversions with formula and comparison table.`,
    h1: `${ml} ml to Fluid Ounces`,
    keywords: `${ml} ml to oz, ${ml}ml in oz, ${ml} ml to fluid ounces, ${ml} millilitres to ounces`,
    bigAnswer: `${us} US fl oz`,
    answer: `${ml} ml${note} is ${us} US fluid ounces, or ${uk} UK (imperial) fluid ounces. US and UK fluid ounces differ: 1 US fl oz = 29.57 ml, 1 UK fl oz = 28.41 ml.`,
    formula: `${ml} ml ÷ 29.5735 = ${us} US fl oz`,
    extraResults: [
      { label: "US fluid ounces", value: `${us} fl oz` },
      { label: "UK fluid ounces", value: `${uk} fl oz` },
      { label: "Litres", value: `${r(ml / 1000, 3)} L` },
    ],
    table: {
      title: "Common ml to oz conversions",
      columns: ["Millilitres", "US fl oz", "UK fl oz"],
      rows: ML_VALUES.map((v) => ({
        label: `${v} ml`,
        value: `${r(v / US_FLOZ_ML)} / ${r(v / UK_FLOZ_ML)}`,
        slug: v === ml ? undefined : `${slugify(v)}-ml-to-oz`,
      })),
    },
    faqs: [
      { question: `Is ${ml} ml the same in US and UK ounces?`, answer: `No. ${ml} ml is ${us} US fl oz but ${uk} UK fl oz, because a US fluid ounce (29.57 ml) is larger than a UK imperial fluid ounce (28.41 ml).` },
      ...(ML_NOTES[ml] ? [{ question: `What is ${ml} ml in everyday terms?`, answer: `${ml} ml is ${ML_NOTES[ml]} — that's ${us} US fluid ounces or ${uk} UK fluid ounces.` }] : []),
      { question: "How do I convert ml to fluid ounces?", answer: "Divide millilitres by 29.5735 for US fluid ounces, or by 28.4131 for UK (imperial) fluid ounces." },
    ],
    parentPath: "/converters/ml-to-oz",
    parentLabel: "ml to oz Converter",
    accent: "#06B6D4",
  };
}

// ─── oz → grams ───────────────────────────────────────────────────────────────
const G_PER_OZ = 28.3495;
const OZ_VALUES = [2.2, 4, 8, 8.8, 8.82, 12, 16];

function ozPage(oz: number): ConverterValuePage {
  const g = r(oz * G_PER_OZ, 1);
  const slug = `${slugify(oz)}-oz-to-grams`;
  return {
    slug,
    title: `${oz} oz to Grams — ${oz} Ounces = ${g} g`,
    description: `${oz} ounces is ${g} grams. Exact oz-to-grams conversion with formula and a common-weights table.`,
    h1: `${oz} Ounces to Grams`,
    keywords: `${oz} oz to grams, ${oz}oz in grams, ${oz} ounces to grams, ${oz} oz in g`,
    bigAnswer: `${g} g`,
    answer: `${oz} ounces is ${g} grams. To convert, multiply ounces by 28.3495.`,
    formula: `${oz} oz × 28.3495 = ${g} g`,
    extraResults: [
      { label: "Grams", value: `${g} g` },
      { label: "Kilograms", value: `${r((oz * G_PER_OZ) / 1000, 3)} kg` },
      { label: "Pounds", value: `${r(oz / 16, 3)} lb` },
    ],
    table: {
      title: "Common oz to g conversions",
      columns: ["Ounces", "Grams"],
      rows: OZ_VALUES.map((v) => ({
        label: `${v} oz`,
        value: `${r(v * G_PER_OZ, 1)} g`,
        slug: v === oz ? undefined : `${slugify(v)}-oz-to-grams`,
      })),
    },
    faqs: [
      { question: `How many grams is ${oz} oz?`, answer: `${oz} ounces (avoirdupois) is exactly ${g} grams, using 1 oz = 28.3495 g.` },
      { question: "Is this weight ounces or fluid ounces?", answer: "Weight. These are avoirdupois ounces (used for food weights). Fluid ounces measure volume — for liquids, use an ml-to-oz converter instead." },
      { question: "What is the oz to grams formula?", answer: "Grams = ounces × 28.3495. To reverse: ounces = grams ÷ 28.3495." },
    ],
    parentPath: "/converters/ounces-to-grams",
    parentLabel: "Ounces to Grams Converter",
    accent: "#F59E0B",
  };
}

// ─── cm → inches ──────────────────────────────────────────────────────────────
const CM_PER_IN = 2.54;
const CM_VALUES = [160, 165, 167.64, 170, 175, 180];

function cmPage(cm: number): ConverterValuePage {
  const totalIn = r(cm / CM_PER_IN, 1);
  const ft = Math.floor(cm / CM_PER_IN / 12);
  const inch = r(cm / CM_PER_IN - ft * 12, 1);
  const slug = `${slugify(cm)}-cm-to-inches`;
  return {
    slug,
    title: `${cm} cm to Inches — ${totalIn} in (${ft} ft ${inch} in)`,
    description: `${cm} cm is ${totalIn} inches, or ${ft} feet ${inch} inches. Exact conversion with formula and height table.`,
    h1: `${cm} cm to Inches`,
    keywords: `${cm} cm to inches, ${cm}cm in inches, ${cm} cm in feet, how tall is ${cm} cm`,
    bigAnswer: `${totalIn} in`,
    answer: `${cm} cm is ${totalIn} inches, which is ${ft} feet ${inch} inches. To convert, divide centimetres by 2.54.`,
    formula: `${cm} cm ÷ 2.54 = ${totalIn} in`,
    extraResults: [
      { label: "Inches", value: `${totalIn} in` },
      { label: "Feet & inches", value: `${ft}' ${inch}"` },
      { label: "Metres", value: `${r(cm / 100, 4)} m` },
    ],
    table: {
      title: "Nearby heights",
      columns: ["Centimetres", "Inches", "Ft & In"],
      rows: CM_VALUES.map((v) => {
        const t = r(v / CM_PER_IN, 1);
        const f = Math.floor(v / CM_PER_IN / 12);
        const i = r(v / CM_PER_IN - f * 12, 1);
        return { label: `${v} cm`, value: `${t} in (${f}' ${i}")`, slug: v === cm ? undefined : `${slugify(v)}-cm-to-inches` };
      }),
    },
    faqs: [
      { question: `How many inches is ${cm} cm?`, answer: `${cm} cm is ${totalIn} inches — that's ${ft} feet ${inch} inches as a height.` },
      { question: "What is the cm to inches formula?", answer: "Inches = centimetres ÷ 2.54. One inch is defined as exactly 2.54 cm." },
    ],
    parentPath: "/converters/cm-to-inches",
    parentLabel: "cm to Inches Converter",
    accent: "#8B5CF6",
  };
}

// ─── grams → tablespoons ──────────────────────────────────────────────────────
// Density varies by ingredient; water is the reference (1 tbsp = 14.79 g).
const TBSP_G: { name: string; gPerTbsp: number }[] = [
  { name: "Water", gPerTbsp: 14.79 },
  { name: "Butter", gPerTbsp: 14.2 },
  { name: "Sugar (granulated)", gPerTbsp: 12.5 },
  { name: "Flour (plain)", gPerTbsp: 7.81 },
];
const G_VALUES = [7, 8, 10, 14, 15, 18, 20, 21, 24, 25, 30, 40, 50];

function gramsPage(g: number): ConverterValuePage {
  const water = r(g / 14.79);
  const slug = `${slugify(g)}-grams-to-tablespoons`;
  return {
    slug,
    title: `${g} Grams to Tablespoons — ${water} tbsp (Water) + Butter, Sugar, Flour`,
    description: `${g} grams is ${water} tablespoons of water, ${r(g / 14.2)} tbsp of butter, ${r(g / 12.5)} tbsp of sugar or ${r(g / 7.81)} tbsp of flour.`,
    h1: `${g} Grams to Tablespoons`,
    keywords: `${g} grams to tablespoons, ${g}g to tbsp, ${g} grams in tablespoons, ${g}g butter in tbsp`,
    bigAnswer: `${water} tbsp`,
    answer: `${g} grams is about ${water} tablespoons of water. Because tablespoons measure volume, the answer depends on the ingredient: ${g} g is ${r(g / 14.2)} tbsp of butter, ${r(g / 12.5)} tbsp of sugar, or ${r(g / 7.81)} tbsp of plain flour.`,
    formula: `${g} g ÷ 14.79 (g per tbsp of water) = ${water} tbsp`,
    extraResults: TBSP_G.map(({ name, gPerTbsp }) => ({ label: name, value: `${r(g / gPerTbsp)} tbsp` })),
    table: {
      title: "Grams to tablespoons (water basis)",
      columns: ["Grams", "Tablespoons"],
      rows: G_VALUES.map((v) => ({
        label: `${v} g`,
        value: `${r(v / 14.79)} tbsp`,
        slug: v === g ? undefined : `${slugify(v)}-grams-to-tablespoons`,
      })),
    },
    faqs: [
      { question: `How many tablespoons is ${g} grams?`, answer: `For water, ${g} g is ${water} tablespoons (1 tbsp = 14.79 g). For butter it's ${r(g / 14.2)} tbsp, sugar ${r(g / 12.5)} tbsp, and plain flour ${r(g / 7.81)} tbsp.` },
      { question: "Why does the ingredient matter?", answer: "Grams measure weight but tablespoons measure volume. Dense ingredients pack more grams into the same spoon — a tablespoon of flour weighs about 8 g while a tablespoon of sugar weighs about 12.5 g." },
      { question: "Is this a UK or US tablespoon?", answer: "A metric/US tablespoon of 15 ml (14.79 g of water). Older UK recipes sometimes use a 17.7 ml imperial tablespoon; Australian tablespoons are 20 ml." },
    ],
    parentPath: "/converters/grams-to-tablespoons",
    parentLabel: "Grams to Tablespoons Converter",
    accent: "#10B981",
  };
}

// ─── gallons → litres ─────────────────────────────────────────────────────────
const LITRES_PER_US_GAL = 3.78541;
const GAL_VALUES = [4.5, 20, 58, 62, 130, 145, 270, 20000];

function gallonsPage(gal: number): ConverterValuePage {
  const us = r(gal * LITRES_PER_US_GAL);
  const uk = r(gal * 4.54609);
  const slug = `${slugify(gal)}-gallons-to-litres`;
  return {
    slug,
    title: `${gal} Gallons to Litres — ${us} L (US) / ${uk} L (UK)`,
    description: `${gal} gallons is ${us} litres using US gallons, or ${uk} litres using UK (imperial) gallons. Both conversions with formula and comparison table.`,
    h1: `${gal} Gallons to Litres`,
    keywords: `${gal} gallons to litres, ${gal} gallons to liters, ${gal} gallon to litres, ${gal} gal to l`,
    bigAnswer: `${us} L`,
    answer: `${gal} gallons is ${us} litres using a US gallon (3.78541 L), or ${uk} litres using a UK imperial gallon (4.54609 L).`,
    formula: `${gal} gal × 3.78541 = ${us} L (US)`,
    extraResults: [
      { label: "Litres (US gallon)", value: `${us} L` },
      { label: "Litres (UK gallon)", value: `${uk} L` },
      { label: "US fluid ounces", value: `${r(gal * 128, 1)} fl oz` },
    ],
    table: {
      title: "Common gallons to litres conversions",
      columns: ["Gallons", "Litres (US)", "Litres (UK)"],
      rows: GAL_VALUES.map((v) => ({
        label: `${v} gal`,
        value: `${r(v * LITRES_PER_US_GAL)} / ${r(v * 4.54609)}`,
        slug: v === gal ? undefined : `${slugify(v)}-gallons-to-litres`,
      })),
    },
    faqs: [
      { question: `Is ${gal} gallons the same in US and UK litres?`, answer: `No. ${gal} gallons is ${us} litres using a US gallon but ${uk} litres using a UK imperial gallon, because a UK gallon (4.54609 L) is larger than a US gallon (3.78541 L).` },
      { question: "How do I convert gallons to litres?", answer: "Multiply US gallons by 3.78541 for litres, or multiply UK (imperial) gallons by 4.54609 for litres." },
    ],
    parentPath: "/converters/gallons-to-litres",
    parentLabel: "Gallons to Litres Converter",
    accent: "#0EA5E9",
  };
}

// ─── lbs → kg ─────────────────────────────────────────────────────────────────
const KG_PER_LB = 0.453592;
const LBS_VALUES = [50.7, 154.3];

function lbsPage(lbs: number): ConverterValuePage {
  const kg = r(lbs * KG_PER_LB);
  const stone = Math.floor(lbs / 14);
  const stoneLbs = r(lbs - stone * 14, 1);
  const slug = `${slugify(lbs)}-lbs-to-kg`;
  return {
    slug,
    title: `${lbs} lbs to kg — ${kg} kg (${stone} st ${stoneLbs} lb)`,
    description: `${lbs} pounds is ${kg} kilograms, or ${stone} stone ${stoneLbs} pounds. Exact lbs-to-kg conversion with formula and weight table.`,
    h1: `${lbs} Pounds to Kilograms`,
    keywords: `${lbs} lbs to kg, ${lbs} pounds to kg, ${lbs}lbs in kg, ${lbs} lb to kilograms`,
    bigAnswer: `${kg} kg`,
    answer: `${lbs} pounds is ${kg} kilograms, which is ${stone} stone ${stoneLbs} pounds. To convert, multiply pounds by 0.453592.`,
    formula: `${lbs} lb × 0.453592 = ${kg} kg`,
    extraResults: [
      { label: "Kilograms", value: `${kg} kg` },
      { label: "Stone & pounds", value: `${stone} st ${stoneLbs} lb` },
      { label: "Grams", value: `${r(lbs * KG_PER_LB * 1000, 0)} g` },
    ],
    table: {
      title: "Nearby weights",
      columns: ["Pounds", "Kilograms", "Stone & lb"],
      rows: LBS_VALUES.map((v) => {
        const k = r(v * KG_PER_LB);
        const st = Math.floor(v / 14);
        const stLb = r(v - st * 14, 1);
        return { label: `${v} lb`, value: `${k} kg (${st} st ${stLb} lb)`, slug: v === lbs ? undefined : `${slugify(v)}-lbs-to-kg` };
      }),
    },
    faqs: [
      { question: `How many kg is ${lbs} lbs?`, answer: `${lbs} pounds is ${kg} kilograms — that's ${stone} stone ${stoneLbs} pounds.` },
      { question: "What is the lbs to kg formula?", answer: "Kilograms = pounds × 0.453592. One pound is defined as exactly 0.45359237 kilograms." },
    ],
    parentPath: "/converters/lbs-to-kg",
    parentLabel: "Lbs to Kg Converter",
    accent: "#EC4899",
  };
}

// ─── Registry ─────────────────────────────────────────────────────────────────
const pages: ConverterValuePage[] = [
  ...M_VALUES.map(metresPage),
  ...ML_VALUES.map(mlPage),
  ...OZ_VALUES.map(ozPage),
  ...CM_VALUES.map(cmPage),
  ...G_VALUES.map(gramsPage),
  ...GAL_VALUES.map(gallonsPage),
  ...LBS_VALUES.map(lbsPage),
];

const bySlug = new Map(pages.map((p) => [p.slug, p]));

export function getAllConverterValuePages(): ConverterValuePage[] {
  return pages;
}

export function getConverterValuePage(slug: string): ConverterValuePage | undefined {
  return bySlug.get(slug);
}

/** Top per-family pages for "popular conversions" link blocks on parent pages */
export function getPopularForParent(parentPath: string): ConverterValuePage[] {
  return pages.filter((p) => p.parentPath === parentPath);
}
