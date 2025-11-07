"use client";

import Input from "@/components/ui/Input";

interface SalaryRangeInputProps {
  minValue: number | null;
  maxValue: number | null;
  currency: string;
  onMinChange: (value: number | null) => void;
  onMaxChange: (value: number | null) => void;
  onCurrencyChange: (value: string) => void;
  error?: string;
}

const currencies = ["EUR", "USD", "GBP", "CHF"];

export function SalaryRangeInput({
  minValue,
  maxValue,
  currency,
  onMinChange,
  onMaxChange,
  onCurrencyChange,
  error,
}: SalaryRangeInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Salary Range (per year)
      </label>
      <div className="grid grid-cols-3 gap-2">
        <Input
          type="number"
          label="Min"
          value={minValue?.toString() || ""}
          onChange={(e) =>
            onMinChange(e.target.value ? parseInt(e.target.value) : null)
          }
          placeholder="50000"
          error={error}
        />
        <Input
          type="number"
          label="Max"
          value={maxValue?.toString() || ""}
          onChange={(e) =>
            onMaxChange(e.target.value ? parseInt(e.target.value) : null)
          }
          placeholder="100000"
          error={error}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {currencies.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
