"use client";

interface SimpleToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function SimpleToggle({
  label,
  value,
  onChange,
}: SimpleToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        id="toggle"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
      />
      <label htmlFor="toggle" className="text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
}
