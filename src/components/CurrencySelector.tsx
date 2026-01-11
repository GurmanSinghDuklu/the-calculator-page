import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Currency = "USD" | "GBP" | "EUR" | "INR" | "JPY" | "CNY" | "HKD";

interface CurrencySelectorProps {
  value: Currency;
  onChange: (value: Currency) => void;
  id?: string;
}

export const currencies: Record<Currency, { symbol: string; name: string }> = {
  USD: { symbol: "$", name: "US Dollar" },
  GBP: { symbol: "£", name: "UK Pound" },
  EUR: { symbol: "€", name: "Euro" },
  INR: { symbol: "₹", name: "Indian Rupee" },
  JPY: { symbol: "¥", name: "Japanese Yen" },
  CNY: { symbol: "¥", name: "Chinese Renminbi" },
  HKD: { symbol: "HK$", name: "Hong Kong Dollar" },
};

export const CurrencySelector = ({ value, onChange, id = "currency" }: CurrencySelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Currency</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(currencies).map(([code, { symbol, name }]) => (
            <SelectItem key={code} value={code}>
              {symbol} - {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
