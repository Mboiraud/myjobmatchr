"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface JobTitlesInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export function JobTitlesInput({ value, onChange, error }: JobTitlesInputProps) {
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
        Job Titles <span className="text-red-600">*</span>
      </label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Product Manager"
          error={error}
        />
        <Button onClick={handleAdd} variant="outline" type="button">
          Add
        </Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((title, index) => (
            <div
              key={index}
              className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {title}
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
