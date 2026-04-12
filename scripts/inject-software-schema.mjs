import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

// Map file path patterns to schema metadata
function getSchemaForFile(filePath) {
  const f = filePath.toLowerCase();

  // Finance
  if (f.includes('compoundinterest')) return { name: 'Compound Interest Calculator', cat: 'FinanceApplication' };
  if (f.includes('mortgagecostcomparison')) return { name: 'Mortgage Cost Comparison Calculator', cat: 'FinanceApplication' };
  if (f.includes('mortgageoverpayment')) return { name: 'Mortgage Overpayment Calculator', cat: 'FinanceApplication' };
  if (f.includes('weeklymortgage')) return { name: 'Weekly Mortgage Calculator', cat: 'FinanceApplication' };
  if (f.includes('mortgagecalculator') || f.includes('mortgage')) return { name: 'Mortgage Calculator', cat: 'FinanceApplication' };
  if (f.includes('apycalculator') || f.includes('apy')) return { name: 'APY Calculator', cat: 'FinanceApplication' };
  if (f.includes('budgetcalculator') || f.includes('budget')) return { name: 'Budget Planner', cat: 'FinanceApplication' };
  if (f.includes('capitalgains')) return { name: 'Capital Gains Tax Calculator', cat: 'FinanceApplication' };
  if (f.includes('carloancalculator') || f.includes('carloan')) return { name: 'Car Loan Calculator', cat: 'FinanceApplication' };
  if (f.includes('cashback')) return { name: 'Cashback Calculator', cat: 'FinanceApplication' };
  if (f.includes('creditcardpayoff')) return { name: 'Credit Card Payoff Calculator', cat: 'FinanceApplication' };
  if (f.includes('futurehouse')) return { name: 'Future House Value Calculator', cat: 'FinanceApplication' };
  if (f.includes('howlongtosave')) return { name: 'How Long to Save Calculator', cat: 'FinanceApplication' };
  if (f.includes('howmuchtosave')) return { name: 'How Much to Save Calculator', cat: 'FinanceApplication' };
  if (f.includes('inheritancetax')) return { name: 'Inheritance Tax Calculator', cat: 'FinanceApplication' };
  if (f.includes('irrcalculator') || f.includes('irr')) return { name: 'ROI Calculator', cat: 'FinanceApplication' };
  if (f.includes('isacalculator') || f.includes('isa')) return { name: 'ISA Calculator', cat: 'FinanceApplication' };
  if (f.includes('loancalculator') || f.includes('loan')) return { name: 'Loan Calculator', cat: 'FinanceApplication' };
  if (f.includes('multicardpayoff')) return { name: 'Multi-Card Payoff Calculator', cat: 'FinanceApplication' };
  if (f.includes('retirementcalculator') || f.includes('retirement')) return { name: 'Retirement Calculator', cat: 'FinanceApplication' };
  if (f.includes('salarycalculator') || f.includes('salary')) return { name: 'UK Salary Calculator', cat: 'FinanceApplication' };
  if (f.includes('savingscalculator') || f.includes('savings')) return { name: 'Savings Calculator', cat: 'FinanceApplication' };
  if (f.includes('simpleinterest')) return { name: 'Simple Interest Calculator', cat: 'FinanceApplication' };
  if (f.includes('stampduty')) return { name: 'Stamp Duty Calculator', cat: 'FinanceApplication' };
  if (f.includes('vatcalculator') || f.includes('vat')) return { name: 'VAT Calculator', cat: 'FinanceApplication' };

  // Misc
  if (f.includes('agecalculator') || f.includes('age')) return { name: 'Age Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('bmicalculator') || f.includes('bmi')) return { name: 'BMI Calculator', cat: 'HealthApplication' };
  if (f.includes('caloriecalculator') || f.includes('calorie')) return { name: 'Calorie Calculator', cat: 'HealthApplication' };
  if (f.includes('concretecalculator') || f.includes('concrete')) return { name: 'Concrete Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('cubicyards')) return { name: 'Cubic Yards Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('daysbetweendates')) return { name: 'Days Between Dates Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('daysfromtoday')) return { name: 'Days From Today Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('datecalculator') || f.includes('date')) return { name: 'Date Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('discountcalculator') || f.includes('discount')) return { name: 'Discount Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('gravelcalculator') || f.includes('gravel')) return { name: 'Gravel Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('hourscalculator') || f.includes('hours')) return { name: 'Hours Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('monthsbetween')) return { name: 'Months Between Dates Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('mulchcalculator') || f.includes('mulch')) return { name: 'Mulch Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('percentagechange')) return { name: 'Percentage Change Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('percentageof')) return { name: 'Percentage Of Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('percentagecalculator') || f.includes('percentage')) return { name: 'Percentage Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('squarefootage')) return { name: 'Square Footage Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('tipcalculator') || f.includes('tip')) return { name: 'Tip Calculator', cat: 'UtilitiesApplication' };
  if (f.includes('workingdays')) return { name: 'Working Days Calculator', cat: 'UtilitiesApplication' };

  // Converters
  if (f.includes('cmtoinches')) return { name: 'CM to Inches Converter', cat: 'UtilitiesApplication' };
  if (f.includes('cupstograms')) return { name: 'Cups to Grams Converter', cat: 'UtilitiesApplication' };
  if (f.includes('fahrenheittocelsius')) return { name: 'Fahrenheit to Celsius Converter', cat: 'UtilitiesApplication' };
  if (f.includes('gallonstolitres')) return { name: 'Gallons to Litres Converter', cat: 'UtilitiesApplication' };
  if (f.includes('gramstotablespoons')) return { name: 'Grams to Tablespoons Converter', cat: 'UtilitiesApplication' };
  if (f.includes('inchestocm')) return { name: 'Inches to CM Converter', cat: 'UtilitiesApplication' };
  if (f.includes('kmtomiles')) return { name: 'KM to Miles Converter', cat: 'UtilitiesApplication' };
  if (f.includes('lbstokg')) return { name: 'LBS to KG Converter', cat: 'UtilitiesApplication' };
  if (f.includes('lengthconverter') || f.includes('length')) return { name: 'Length Converter', cat: 'UtilitiesApplication' };
  if (f.includes('metrestofeet')) return { name: 'Metres to Feet Converter', cat: 'UtilitiesApplication' };
  if (f.includes('mltooz')) return { name: 'ML to Oz Converter', cat: 'UtilitiesApplication' };
  if (f.includes('ouncestograms')) return { name: 'Ounces to Grams Converter', cat: 'UtilitiesApplication' };
  if (f.includes('stoneconverter') || f.includes('stone')) return { name: 'Stone to KG Converter', cat: 'UtilitiesApplication' };
  if (f.includes('teaspoonstoml')) return { name: 'Teaspoons to ML Converter', cat: 'UtilitiesApplication' };
  if (f.includes('temperatureconverter') || f.includes('temperature')) return { name: 'Temperature Converter', cat: 'UtilitiesApplication' };
  if (f.includes('universalconverter') || f.includes('universal')) return { name: 'Universal Unit Converter', cat: 'UtilitiesApplication' };
  if (f.includes('weightconverter') || f.includes('weight')) return { name: 'Weight Converter', cat: 'UtilitiesApplication' };

  // App pages
  if (f.includes('compoundinterestapp')) return { name: 'Compound Interest Calculator App', cat: 'FinanceApplication' };
  if (f.includes('mortgagecalculatorapp')) return { name: 'Mortgage Calculator App', cat: 'FinanceApplication' };
  if (f.includes('percentagecalculatorapp')) return { name: 'Percentage Calculator App', cat: 'UtilitiesApplication' };
  if (f.includes('salarycalculatorapp')) return { name: 'UK Salary Calculator App', cat: 'FinanceApplication' };
  if (f.includes('savingscalculatorapp')) return { name: 'Savings Calculator App', cat: 'FinanceApplication' };

  return { name: 'The Calculator App', cat: 'UtilitiesApplication' };
}

const files = await glob('src/pages/{finance,misc,converters,app}/**/*.tsx', {
  cwd: '/Users/mandeepduklu/Downloads/thecalculatorpage-main',
  absolute: true,
});

// Skip DaysFromTodayPage (programmatic, no SEO tag in the same way)
const targets = files.filter(f => !f.includes('DaysFromTodayPage'));

let patched = 0;
let skipped = 0;

for (const filePath of targets) {
  let src = readFileSync(filePath, 'utf8');

  // Skip if already has SoftwareApplication structuredData
  if (src.includes('SoftwareApplication') || src.includes('softwareApplication')) {
    skipped++;
    continue;
  }

  // Skip if no <SEO tag
  if (!src.includes('<SEO')) {
    skipped++;
    continue;
  }

  const { name, cat } = getSchemaForFile(filePath);

  const schemaSnippet = `
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "${name}",
          "alternateName": "The Calculator App",
          "applicationCategory": "${cat}",
          "operatingSystem": "Any (Web App — iOS, Android, Desktop)",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorpage.com"
        }}`;

  // Insert structuredData prop before the closing /> or > of the <SEO tag
  // Strategy: find the SEO tag and insert before its closing
  const seoTagRegex = /(<SEO\b[^>]*?)(\/?>)/s;
  const newSrc = src.replace(seoTagRegex, (match, opening, closing) => {
    // Don't double-add
    if (opening.includes('structuredData')) return match;
    return `${opening}${schemaSnippet}\n      ${closing}`;
  });

  if (newSrc !== src) {
    writeFileSync(filePath, newSrc, 'utf8');
    patched++;
    console.log(`✓ ${filePath.split('/src/')[1]}`);
  } else {
    skipped++;
    console.log(`~ skipped (no match): ${filePath.split('/src/')[1]}`);
  }
}

console.log(`\nDone. Patched: ${patched}, Skipped: ${skipped}`);
