import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const routesToPrerender = [
  // Main Pages
  '/',
  '/home',
  
  // Finance Calculators
  '/finance/compound-interest',
  '/finance/loan',
  '/finance/simple-interest',
  '/finance/savings',
  '/finance/mortgage',
  '/finance/apy',
  '/finance/car-loan',
  '/finance/cashback',
  '/finance/budget',
  '/finance/credit-card-payoff',
  '/finance/multi-card-payoff',
  '/finance/future-house-value',
  '/finance/how-long-to-save',
  '/finance/how-much-to-save',
  '/finance/irr',
  '/finance/mortgage-overpayment',
  '/finance/weekly-mortgage',
  '/finance/retirement',
  '/finance/salary',
  '/finance/stamp-duty',
  
  // Misc Calculators
  '/misc/percentage',
  '/misc/age',
  '/misc/date',
  '/misc/discount',
  '/misc/tip',
  
  // Converters
  '/converters/universal',
  '/converters/length',
  '/converters/temperature',
  '/converters/weight',
  
  // Learn Pages
  '/learn',
  '/learn/financial-journey',
  '/learn/where-money-goes',
  '/learn/50-30-20-budget',
  '/learn/automate-finances',
  '/learn/emergency-fund',
  '/learn/calculator-formulas-guide',
  
  // Reference Pages
  '/formulas',
  
  // Blog Pages
  '/blog',
  '/blog/cheat-code-01',
  '/blog/cheat-code-01/payment',
  '/blog/cheat-code-01/unlocked',
  '/blog/mortgage-cheat-code',
]

;(async () => {
  for (const url of routesToPrerender) {
    const { html: appHtml, helmet } = render(url);
    
    let html = template
      .replace(`<!--app-html-->`, appHtml)
      .replace(`<title>The Calculator Page - Free Online Calculators & Unit Converters</title>`, helmet.title)
      .replace(`</head>`, `${helmet.meta}${helmet.link}${helmet.script}</head>`)

    const filePath = `dist${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }
})()
