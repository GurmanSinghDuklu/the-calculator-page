import { z } from 'zod';

/**
 * Sanitizes CSS color values to prevent CSS injection
 * Only allows: hex colors, rgb(), rgba(), hsl(), hsla(), and CSS color keywords
 */
export const sanitizeCSSColor = (color: string): string => {
  if (!color) return '#000000';
  
  // Allow hex colors (#RGB, #RRGGBB, #RRGGBBAA)
  const hexRegex = /^#[0-9A-Fa-f]{3,8}$/;
  // Allow rgb/rgba functions
  const rgbRegex = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/;
  // Allow hsl/hsla functions
  const hslRegex = /^hsla?\(\s*\d+\s*,?\s*[\d.]+%?\s*,?\s*[\d.]+%?\s*(,\s*[\d.]+\s*)?\)$/;
  // Allow CSS color keywords
  const colorKeywords = ['transparent', 'currentColor', 'inherit', 'initial', 'unset'];
  
  const trimmedColor = color.trim();
  
  if (hexRegex.test(trimmedColor) || 
      rgbRegex.test(trimmedColor) || 
      hslRegex.test(trimmedColor) ||
      colorKeywords.includes(trimmedColor)) {
    return trimmedColor;
  }
  
  // Fallback to black if validation fails
  return '#000000';
};

// Validation schemas for calculator inputs
export const loanSchema = z.object({
  loanAmount: z.number().positive({ message: "Loan amount must be positive" }).max(1000000000, { message: "Loan amount is too large" }).finite(),
  interestRate: z.number().min(0, { message: "Interest rate cannot be negative" }).max(100, { message: "Interest rate cannot exceed 100%" }).finite(),
  loanTerm: z.number().int().positive({ message: "Loan term must be positive" }).max(100, { message: "Loan term is too long" })
});

export const compoundInterestSchema = z.object({
  principal: z.number().positive({ message: "Principal must be positive" }).max(1000000000, { message: "Principal is too large" }).finite(),
  rate: z.number().min(0, { message: "Interest rate cannot be negative" }).max(100, { message: "Interest rate cannot exceed 100%" }).finite(),
  years: z.number().positive({ message: "Years must be positive" }).max(100, { message: "Time period is too long" }).finite(),
  frequency: z.number().positive().finite(),
  contribution: z.number().min(0, { message: "Contribution cannot be negative" }).max(1000000000, { message: "Contribution is too large" }).finite()
});

export const mortgageSchema = z.object({
  homePrice: z.number().positive({ message: "Home price must be positive" }).max(10000000000, { message: "Home price is too large" }).finite(),
  downPayment: z.number().min(0, { message: "Down payment cannot be negative" }).max(10000000000, { message: "Down payment is too large" }).finite(),
  interestRate: z.number().min(0, { message: "Interest rate cannot be negative" }).max(100, { message: "Interest rate cannot exceed 100%" }).finite(),
  loanTerm: z.number().int().positive({ message: "Loan term must be positive" }).max(100, { message: "Loan term is too long" })
});

export const percentageSchema = z.object({
  value: z.number().finite({ message: "Value must be a valid number" }),
  percentage: z.number().min(-100, { message: "Percentage is too low" }).max(10000, { message: "Percentage is too high" }).finite()
});

export const ageSchema = z.object({
  birthDate: z.date({ required_error: "Birth date is required" }),
  currentDate: z.date({ required_error: "Current date is required" })
}).refine((data) => data.birthDate <= data.currentDate, {
  message: "Birth date must be before current date",
  path: ["birthDate"]
});

export const discountSchema = z.object({
  originalPrice: z.number().positive({ message: "Original price must be positive" }).max(1000000000, { message: "Price is too large" }).finite(),
  discountPercent: z.number().min(0, { message: "Discount cannot be negative" }).max(100, { message: "Discount cannot exceed 100%" }).finite()
});

export const tipSchema = z.object({
  billAmount: z.number().positive({ message: "Bill amount must be positive" }).max(1000000000, { message: "Bill amount is too large" }).finite(),
  tipPercent: z.number().min(0, { message: "Tip cannot be negative" }).max(1000, { message: "Tip percentage is too high" }).finite(),
  people: z.number().int().positive({ message: "Number of people must be positive" }).max(1000, { message: "Number of people is too large" })
});

export const retirementSchema = z.object({
  currentAge: z.number().int().min(18, { message: "Age must be at least 18" }).max(80, { message: "Age cannot exceed 80" }),
  retirementAge: z.number().int().min(50, { message: "Retirement age must be at least 50" }).max(75, { message: "Retirement age cannot exceed 75" }),
  currentPot: z.number().min(0, { message: "Current pot cannot be negative" }).max(100000000, { message: "Amount is too large" }).finite(),
  salary: z.number().min(0, { message: "Salary cannot be negative" }).max(10000000, { message: "Salary is too large" }).finite(),
  employeeContribution: z.number().min(0, { message: "Contribution cannot be negative" }).max(100, { message: "Contribution cannot exceed 100%" }).finite(),
  employerContribution: z.number().min(0, { message: "Contribution cannot be negative" }).max(100, { message: "Contribution cannot exceed 100%" }).finite(),
  inflationRate: z.number().min(0, { message: "Inflation rate cannot be negative" }).max(20, { message: "Inflation rate cannot exceed 20%" }).finite(),
  growthRate: z.number().min(0, { message: "Growth rate cannot be negative" }).max(50, { message: "Growth rate cannot exceed 50%" }).finite(),
  statePension: z.number().min(0, { message: "State pension cannot be negative" }).max(1000000, { message: "Amount is too large" }).finite(),
  withdrawalRate: z.number().min(0.1, { message: "Withdrawal rate must be at least 0.1%" }).max(20, { message: "Withdrawal rate cannot exceed 20%" }).finite()
}).refine((data) => data.retirementAge > data.currentAge, {
  message: "Retirement age must be greater than current age",
  path: ["retirementAge"]
});

export const budgetItemSchema = z.object({
  amount: z.number().min(0, { message: "Amount cannot be negative" }).max(10000000, { message: "Amount is too large" }).finite(),
  name: z.string().trim().min(1, { message: "Name cannot be empty" }).max(100, { message: "Name must be less than 100 characters" })
});

/**
 * Validates calculator inputs and returns validation result
 * @returns { success: true, data } or { success: false, error: string }
 */
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return { success: false, error: firstError.message };
    }
    return { success: false, error: "Invalid input" };
  }
}
