import { describe, it, expect } from 'vitest';
import {
  ukTakeHome,
  usTakeHome,
  mortgagePayment,
  futureValueMonthly,
  creditCardAnnualInterest,
  creditCardPayoffMonths,
} from './calc';

describe('ukTakeHome (2025/26)', () => {
  // Verified 2025/26: PA £12,570, 20%/40%/45% bands, NI 8%/2%
  it('£30,000 gross → £25,120 net', () => {
    expect(Math.round(ukTakeHome(30000).net)).toBe(25120);
  });
  it('£60,000 gross → £45,357 net', () => {
    expect(Math.round(ukTakeHome(60000).net)).toBe(45357);
  });
  it('£100,000 gross → £68,557 net (taper starts above £100k)', () => {
    expect(Math.round(ukTakeHome(100000).net)).toBe(68557);
  });
});

describe('usTakeHome (2025 single, no state tax)', () => {
  it('$60,000 gross has positive net less than gross', () => {
    const r = usTakeHome(60000);
    expect(r.net).toBeGreaterThan(40000);
    expect(r.net).toBeLessThan(60000);
  });
  it('FICA on $60,000 is 7.65%', () => {
    expect(Math.round(usTakeHome(60000).fica!)).toBe(4590);
  });
});

describe('mortgagePayment', () => {
  it('£200k, 5%, 25yr ≈ £1,169/mo', () => {
    expect(Math.round(mortgagePayment(200000, 5, 25))).toBe(1169);
  });
  it('£300k, 5%, 25yr ≈ £1,754/mo', () => {
    expect(Math.round(mortgagePayment(300000, 5, 25))).toBe(1754);
  });
});

describe('futureValueMonthly', () => {
  it('£500/mo, 7%, 20yr ≈ £260,463', () => {
    expect(Math.round(futureValueMonthly(500, 7, 20))).toBe(260463);
  });
});

describe('credit card', () => {
  it('annual interest on £10,000 at 24% APR ≈ £2,400', () => {
    expect(Math.round(creditCardAnnualInterest(10000, 24))).toBe(2400);
  });
  it('£5,000 at 20% APR, £150/mo payoff returns a finite month count', () => {
    const m = creditCardPayoffMonths(5000, 20, 150);
    expect(m).toBeGreaterThan(0);
    expect(Number.isFinite(m)).toBe(true);
  });
});
