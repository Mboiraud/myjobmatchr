"use client";

type WorkModel = "remote" | "hybrid" | "onsite";

interface WorkModelInputProps {
  value: WorkModel[];
  onChange: (value: WorkModel[]) => void;
  error?: string;
}

const options = [
  { id: "remote" as const, label: "Remote" },
  { id: "hybrid" as const, label: "Hybrid" },
  { id: "onsite" as const, label: "On-site" },
];

export function WorkModelInput({ value, onChange, error }: WorkModelInputProps) {
  const handleToggle = (option: WorkModel) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Work Models <span className="text-red-600">*</span>
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
