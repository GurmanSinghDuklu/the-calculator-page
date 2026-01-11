import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, Copy, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";

const DEC = 1000, BIN = 1024;

const UNITS = {
  length: { base:'m', label:'Length & Distance', map:{
    mm:1e-3, cm:1e-2, m:1, km:1e3, in:0.0254, ft:0.3048, yd:0.9144, mi:1609.344, nmi:1852
  }},
  area: { base:'m²', label:'Area', map:{
    'mm²':1e-6,'cm²':1e-4,'m²':1,'km²':1e6,'in²':0.0254**2,'ft²':0.3048**2,'yd²':0.9144**2, acre:4046.8564224, ha:10000
  }},
  volume: { base:'m³', label:'Volume / Liquid', map:{
    'mm³':1e-9,'cm³':1e-6,'m³':1, L:1e-3, mL:1e-6,
    galUS:3.785411784e-3, qtUS:(3.785411784e-3)/4, ptUS:(3.785411784e-3)/8, flozUS:(3.785411784e-3)/128,
    galImp:4.54609e-3, qtImp:(4.54609e-3)/4, ptImp:(4.54609e-3)/8, flozImp:(4.54609e-3)/160
  }},
  mass: { base:'kg', label:'Mass / Weight', map:{
    μg:1e-9, mg:1e-6, g:1e-3, kg:1, t:1000, oz:0.028349523125, lb:0.45359237, st:6.35029318
  }},
  speed: { base:'m/s', label:'Speed / Velocity', map:{
    'm/s':1,'km/h':1000/3600, mph:0.44704, kn:1852/3600, 'ft/s':0.3048
  }},
  pressure: { base:'Pa', label:'Pressure', map:{
    Pa:1, kPa:1e3, MPa:1e6, bar:1e5, atm:101325, psi:6894.757293168, torr:133.3223684211, mmHg:133.3223684211, inHg:3386.389
  }},
  energy: { base:'J', label:'Energy', map:{
    J:1, kJ:1e3, MJ:1e6, Wh:3600, kWh:3.6e6, cal:4.184, kcal:4184, BTU:1055.05585262, 'ft·lbf':1.35581794833
  }},
  power: { base:'W', label:'Power', map:{
    W:1, kW:1e3, MW:1e6, hp:745.699871582, 'BTU/h':0.29307107
  }},
  time: { base:'s', label:'Time', map:{
    ms:1e-3, s:1, min:60, h:3600, day:86400, week:604800
  }},
};

const TEMP_TO_K: Record<string, (v: number) => number> = {
  C:  c => c + 273.15,
  F:  f => (f - 32) / 1.8 + 273.15,
  K:  k => k,
  R:  r => r * 5/9,
  Re: re => (re * 5/4) + 273.15
};

const K_TO_TEMP: Record<string, (k: number) => number> = {
  C:  k => k - 273.15,
  F:  k => (k - 273.15) * 1.8 + 32,
  K:  k => k,
  R:  k => k * 9/5,
  Re: k => (k - 273.15) * 4/5
};

const STORAGE: Record<string, number> = {
  B:1, kB:DEC, MB:DEC**2, GB:DEC**3, TB:DEC**4,
  KiB:BIN, MiB:BIN**2, GiB:BIN**3, TiB:BIN**4,
  b:1/8, kb:(DEC/8), Mb:(DEC**2/8), Gb:(DEC**3/8), Tb:(DEC**4/8),
  Kib:(BIN/8), Mib:(BIN**2/8), Gib:(BIN**3/8), Tib:(BIN**4/8)
};

const DATARATE: Record<string, number> = {
  'b/s':1, 'kb/s':DEC, 'Mb/s':DEC**2, 'Gb/s':DEC**3, 'Tb/s':DEC**4,
  'Kib/s':BIN, 'Mib/s':BIN**2, 'Gib/s':BIN**3, 'Tib/s':BIN**4,
  'B/s':8, 'kB/s':DEC*8, 'MB/s':DEC**2*8, 'GB/s':DEC**3*8, 'TB/s':DEC**4*8,
  'KiB/s':BIN*8, 'MiB/s':BIN**2*8, 'GiB/s':BIN**3*8, 'TiB/s':BIN**4*8
};

const CATEGORIES: Record<string, { label: string; units: string[]; defaults: [string, string] }> = {
  length:      { label: UNITS.length.label,      units: Object.keys(UNITS.length.map),      defaults:['cm','ft'] },
  area:        { label: UNITS.area.label,        units: Object.keys(UNITS.area.map),        defaults:['m²','ft²'] },
  volume:      { label: UNITS.volume.label,      units: Object.keys(UNITS.volume.map),      defaults:['L','galUS'] },
  mass:        { label: UNITS.mass.label,        units: Object.keys(UNITS.mass.map),        defaults:['kg','lb'] },
  speed:       { label: UNITS.speed.label,       units: Object.keys(UNITS.speed.map),       defaults:['km/h','mph'] },
  pressure:    { label: UNITS.pressure.label,    units: Object.keys(UNITS.pressure.map),    defaults:['bar','psi'] },
  energy:      { label: UNITS.energy.label,      units: Object.keys(UNITS.energy.map),      defaults:['kWh','BTU'] },
  power:       { label: UNITS.power.label,       units: Object.keys(UNITS.power.map),       defaults:['kW','hp'] },
  time:        { label: UNITS.time.label,        units: Object.keys(UNITS.time.map),        defaults:['h','min'] },
  temperature: { label: 'Temperature',           units: ['C','F','K','R','Re'],             defaults:['C','F'] },
  storage:     { label: 'Data Storage',          units: Object.keys(STORAGE),               defaults:['GB','MiB'] },
  datarate:    { label: 'Data Rate',             units: Object.keys(DATARATE),              defaults:['MB/s','Gb/s'] },
};

const INDEX: Record<string, string> = {};
for (const [cat, { map }] of Object.entries(UNITS)) {
  for (const u of Object.keys(map)) INDEX[u] = cat;
}
Object.keys(STORAGE).forEach(u => INDEX[u] = 'storage');
Object.keys(DATARATE).forEach(u => INDEX[u] = 'datarate');
['C','F','K','R','Re'].forEach(u => INDEX[u] = 'temperature');

function convert(value: number, from: string, to: string): number {
  if (from === to) return value;
  const cat = INDEX[from];
  if (!cat || INDEX[to] !== cat) return NaN;
  
  if (cat === 'temperature') {
    const k = TEMP_TO_K[from](value);
    return K_TO_TEMP[to](k);
  }
  if (cat === 'storage') return value * (STORAGE[from] / STORAGE[to]);
  if (cat === 'datarate') return value * (DATARATE[from] / DATARATE[to]);
  
  const { map } = UNITS[cat as keyof typeof UNITS];
  return value * (map[from] / map[to]);
}

function temperatureFormula(from: string, to: string): string {
  const pairs: Record<string, string> = {
    'C→F': 'F = C × 9/5 + 32',
    'F→C': 'C = (F − 32) × 5/9',
    'C→K': 'K = C + 273.15',
    'K→C': 'C = K − 273.15',
    'F→K': 'K = (F − 32) × 5/9 + 273.15',
    'K→F': 'F = (K − 273.15) × 9/5 + 32',
    'K→R': 'R = K × 9/5',
    'R→K': 'K = R × 5/9',
    'C→Re': 'Re = C × 4/5',
    'Re→C': 'C = Re × 5/4'
  };
  return pairs[`${from}→${to}`] || `via Kelvin pivot: to = f(from)`;
}

interface UniversalConverterProps {
  showLayout?: boolean;
}

function UniversalConverter({ showLayout = true }: UniversalConverterProps = {}) {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('cm');
  const [toUnit, setToUnit] = useState('ft');
  const [value, setValue] = useState('180');
  const [precision, setPrecision] = useState('4');
  const [result, setResult] = useState('—');
  const [formula, setFormula] = useState('');

  useEffect(() => {
    compute();
  }, [value, fromUnit, toUnit, precision, category]);

  const compute = () => {
    const v = Number(value);
    const prec = Number(precision);
    
    if (!isFinite(v)) {
      setResult('—');
      setFormula('Enter a numeric value.');
      return;
    }
    
    const out = convert(v, fromUnit, toUnit);
    
    if (!isFinite(out)) {
      setResult('—');
      setFormula('Incompatible units or invalid selection.');
      return;
    }
    
    setResult(Number(out.toFixed(prec)).toLocaleString(undefined, { maximumFractionDigits: prec }));
    
    const cat = INDEX[fromUnit];
    if (cat === 'temperature') {
      setFormula(temperatureFormula(fromUnit, toUnit));
    } else if (cat === 'storage') {
      setFormula(`value_to = value_from × (${STORAGE[fromUnit]} / ${STORAGE[toUnit]})  /* bytes scale */`);
    } else if (cat === 'datarate') {
      setFormula(`value_to = value_from × (${DATARATE[fromUnit]} / ${DATARATE[toUnit]})  /* bits/second scale */`);
    } else {
      const map = UNITS[cat as keyof typeof UNITS].map;
      const ratio = map[fromUnit] / map[toUnit];
      setFormula(`value_to = value_from × (${map[fromUnit]} / ${map[toUnit]}) = value_from × ${ratio}`);
    }
  };

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    const cfg = CATEGORIES[newCat];
    setFromUnit(cfg.defaults[0]);
    setToUnit(cfg.defaults[1]);
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast.success('Result copied to clipboard');
    } catch {
      toast.error('Failed to copy result');
    }
  };

  const handleReset = () => {
    setPrecision('4');
    setValue('180');
    setCategory('length');
    setFromUnit('cm');
    setToUnit('ft');
  };

  const handleDemo = () => {
    const examples = [
      { cat: 'length', from: 'cm', to: 'ft', val: '180' },
      { cat: 'temperature', from: 'C', to: 'F', val: '25' },
      { cat: 'pressure', from: 'bar', to: 'psi', val: '1' },
      { cat: 'storage', from: 'GB', to: 'MiB', val: '1' },
      { cat: 'datarate', from: 'MB/s', to: 'Gb/s', val: '100' },
      { cat: 'energy', from: 'kWh', to: 'BTU', val: '1' }
    ];
    const pick = examples[Math.floor(Math.random() * examples.length)];
    setCategory(pick.cat);
    setFromUnit(pick.from);
    setToUnit(pick.to);
    setValue(pick.val);
  };

  const currentUnits = CATEGORIES[category]?.units || [];

  const converterContent = (
    <Card>
        <CardHeader>
          <CardTitle>Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORIES).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fromUnit">From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger id="fromUnit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currentUnits.map(unit => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="toUnit">To</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger id="toUnit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currentUnits.map(unit => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="precision">Decimals</Label>
              <Select value={precision} onValueChange={setPrecision}>
                <SelectTrigger id="precision">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['0', '2', '4', '6', '8', '10', '12'].map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div>
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                step="any"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleSwap}
              className="mb-0"
              title="Swap units"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            <div>
              <Label>Result</Label>
              <div className="text-2xl font-bold mt-2">{result}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-end">
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-2" />
              Copy result
            </Button>
            <Button variant="outline" onClick={handleDemo}>
              <Sparkles className="h-4 w-4 mr-2" />
              Try examples
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="space-y-3">
            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium bg-muted px-3 py-1 rounded-full">Formula</span>
              </div>
              <div className="bg-muted/30 border border-border rounded-lg p-3 font-mono text-sm overflow-auto">
                {formula || 'Select units to see the exact conversion math.'}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Notes: Multiplicative categories convert via an SI base (e.g., metres for length). 
              Temperatures use exact affine transforms via Kelvin. Data uses both decimal (kB, MB) 
              and binary (KiB, MiB) standards; data rates pivot on bits/second.
            </p>
          </div>
        </CardContent>
      </Card>
  );

  return (
    <>
      {showLayout && (
        <SEO 
          title="Universal Unit Converter - Length, Weight, Temperature & More"
          description="Free universal unit converter for length, weight, temperature, volume, energy, pressure, time, data storage, and data rate. Precise SI conversions with instant results."
          keywords="unit converter, universal converter, length converter, weight converter, temperature converter, volume converter, pressure converter, energy converter"
        />
      )}
      {showLayout ? (
        <CalculatorLayout
          title="Universal Unit Converter"
          description="Exact SI factors, temperature affine transforms, and binary/decimal data units. Live, precise, and developer-friendly."
        >
          {converterContent}
        </CalculatorLayout>
      ) : (
        converterContent
      )}
    </>
  );
}

export default UniversalConverter;
