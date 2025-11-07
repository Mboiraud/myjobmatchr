"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface SimpleArrayInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export function SimpleArrayInput({
  label,
  value,
  onChange,
  error,
  placeholder,
  required,
}: SimpleArrayInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Type and press Enter or click Add"}
          error={error}
        />
        <Button onClick={handleAdd} variant="outline" type="button" size="sm">
          Add
        </Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((item, index) => (
            <div
              key={index}
              className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              {item}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="hover:text-primary-900 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
