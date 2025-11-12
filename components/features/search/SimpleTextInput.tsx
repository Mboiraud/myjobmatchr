"use client";

import Input from "@/components/ui/Input";

interface SimpleTextInputProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  error?: string;
  placeholder?: string;
}

export function SimpleTextInput({
  label,
  value,
  onChange,
  error,
  placeholder,
}: SimpleTextInputProps) {
  return (
    <Input
      label={label}
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value || null)}
      error={error}
      placeholder={placeholder}
    />
  );
}
