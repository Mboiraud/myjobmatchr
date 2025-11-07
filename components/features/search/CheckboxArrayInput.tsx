"use client";

interface CheckboxArrayInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: { id: string; label: string }[];
  error?: string;
  required?: boolean;
}

export function CheckboxArrayInput({
  label,
  value,
  onChange,
  options,
  error,
  required,
}: CheckboxArrayInputProps) {
  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center">
            <input
              type="checkbox"
              id={option.id}
              checked={value.includes(option.id)}
              onChange={() => handleToggle(option.id)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
