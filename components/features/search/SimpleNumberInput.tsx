"use client";

import Input from "@/components/ui/Input";

interface SimpleNumberInputProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  error?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

export function SimpleNumberInput({
  label,
  value,
  onChange,
  error,
  placeholder,
  min,
  max,
}: SimpleNumberInputProps) {
  return (
    <Input
      label={label}
      type="number"
      value={value?.toString() || ""}
      onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : null)}
      error={error}
      placeholder={placeholder}
      min={min}
      max={max}
    />
  );
}
