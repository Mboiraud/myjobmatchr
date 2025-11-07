"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { CreateExperienceInput } from "@/lib/validations/profile";
import { addExperience, updateExperience } from "@/app/actions/experiences";

interface ExperienceFormProps {
  initialData?: {
    company_name: string;
    job_title: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string | null;
  };
  experienceId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ExperienceForm({
  initialData,
  experienceId,
  onSuccess,
  onCancel,
}: ExperienceFormProps) {
  const [formData, setFormData] = useState<CreateExperienceInput>({
    company_name: initialData?.company_name || "",
    job_title: initialData?.job_title || "",
    start_date: initialData?.start_date || "",
    end_date: initialData?.end_date || null,
    is_current: initialData?.is_current || false,
    description: initialData?.description || null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setMessage(null);

    try {
      // Convert date format and prepare data
      const submitData = {
        ...formData,
        end_date: formData.is_current ? null : formData.end_date,
      };

      if (experienceId) {
        await updateExperience(experienceId, submitData);
      } else {
        await addExperience(submitData);
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error saving experience:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrentChange = (checked: boolean) => {
    setFormData({
      ...formData,
      is_current: checked,
      end_date: checked ? null : formData.end_date,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Company"
        type="text"
        value={formData.company_name}
        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
        error={errors.company_name}
        placeholder="Company name"
        required
      />

      <Input
        label="Job Title"
        type="text"
        value={formData.job_title}
        onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
        error={errors.job_title}
        placeholder="Your role"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Start Date"
          type="date"
          value={formData.start_date}
          onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
          error={errors.start_date}
          required
        />

        <Input
          label="End Date"
          type="date"
          value={formData.is_current ? "" : (formData.end_date || "")}
          onChange={(e) => setFormData({ ...formData, end_date: e.target.value || null })}
          error={errors.end_date}
          disabled={formData.is_current}
          required={!formData.is_current}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_current"
          checked={formData.is_current}
          onChange={(e) => handleCurrentChange(e.target.checked)}
          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
        />
        <label htmlFor="is_current" className="ml-2 text-sm text-gray-700">
          I currently work here
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value || null })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Describe your responsibilities and achievements..."
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="outline" disabled={isLoading}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : experienceId ? "Update" : "Add Experience"}
        </Button>
      </div>
    </form>
  );
}
