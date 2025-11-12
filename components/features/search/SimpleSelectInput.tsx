"use client";

interface SimpleSelectInputProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  options: { id: string; label: string }[];
  error?: string;
  placeholder?: string;
}

export function SimpleSelectInput({
  label,
  value,
  onChange,
  options,
  error,
  placeholder = "Select an option",
}: SimpleSelectInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        className={`w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
          error ? "border-error focus:ring-error" : "border-gray-300"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}
