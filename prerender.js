import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const routesToPrerender = [
  '/',
  '/home',
  '/formulas',
  '/about',
  '/privacy',
  '/cookies',
  '/terms',
  '/disclaimer',
  '/finance/compound-interest',
  '/finance/mortgage',
  '/finance/loan',
  '/finance/savings',
  '/finance/retirement',
  '/finance/apy',
  '/finance/budget',
  '/finance/car-loan',
  '/finance/cashback',
  '/finance/credit-card-payoff',
  '/finance/future-house-value',
  '/finance/how-long-to-save',
  '/finance/how-much-to-save',
  '/finance/irr',
  '/finance/mortgage-overpayment',
  '/finance/multi-card-payoff',
  '/finance/salary',
  '/finance/simple-interest',
  '/finance/stamp-duty',
  '/finance/weekly-mortgage',
  '/misc/age',
  '/misc/date',
  '/misc/discount',
  '/misc/percentage',
  '/misc/percentage-of',
  '/misc/percentage-change',
  '/misc/tip',
  '/converters/length',
  '/converters/weight',
  '/converters/temperature',
  '/converters/universal',
  '/learn',
  '/learn/financial-journey',
  '/learn/where-money-goes',
  '/learn/50-30-20-budget',
  '/learn/automate-finances',
  '/learn/emergency-fund',
  '/learn/calculator-formulas-guide',
  '/learn/before-you-invest',
  '/learn/budget-irregular-costs',
  '/learn/build-portfolio',
  '/learn/choose-savings-account',
  '/learn/credit-scores',
  '/learn/debt-landscape',
  '/learn/ethical-investing',
  '/learn/financial-freedom',
  '/learn/first-1000',
  '/learn/inflation-guide',
  '/learn/interest-impact',
  '/learn/investing-basics',
  '/learn/investing-vs-trading',
  '/learn/monthly-dashboard',
  '/learn/portfolio-rebalancing',
  '/learn/protect-wealth',
  '/learn/snowball-avalanche',
  '/learn/tax-efficient-accounts',
  '/learn/teach-money-skills',
  '/blog',
  '/blog/mortgage-cheat-code',
  '/blog/cheat-code-01',
  '/blog/cheat-code-01-payment',
  '/blog/cheat-code-01-unlocked'
]

;(async () => {
  for (const url of routesToPrerender) {
    const { html: appHtml, helmet } = render(url);
    
    let html = template
      .replace(``, appHtml)
      .replace(`<title>The Calculator Page - Free Online Calculators & Unit Converters</title>`, helmet.title)
      .replace(`</head>`, `${helmet.meta}${helmet.link}${helmet.script}</head>`)

    const filePath = `dist${url === '/' ? '/index' : url}.html`
    const absPath = toAbsolute(filePath)
    
    // NEW: Ensure the directory exists before writing the file
    // This prevents the script from failing when nested routes like /finance/savings are used
    fs.mkdirSync(path.dirname(absPath), { recursive: true })
    
    fs.writeFileSync(absPath, html)
    console.log('pre-rendered:', filePath)
  }
})()