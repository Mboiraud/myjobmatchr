"use client";

interface TextAreaInputProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  error?: string;
  placeholder?: string;
  maxLength?: number;
}

export function TextAreaInput({
  label,
  value,
  onChange,
  error,
  placeholder,
  maxLength = 500,
}: TextAreaInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
      <div className="flex justify-between items-center">
        {error && <p className="text-sm text-red-600">{error}</p>}
        <span className="text-xs text-gray-500">
          {value?.length || 0}/{maxLength}
        </span>
      </div>
    </div>
  );
}
