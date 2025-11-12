"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { JobTitlesInput } from "./JobTitlesInput";
import { WorkModelInput } from "./WorkModelInput";
import { SalaryRangeInput } from "./SalaryRangeInput";
import { TextAreaInput } from "./TextAreaInput";
import { CheckboxArrayInput } from "./CheckboxArrayInput";
import { SimpleArrayInput } from "./SimpleArrayInput";
import { SimpleNumberInput } from "./SimpleNumberInput";
import { SimpleToggle } from "./SimpleToggle";
import { SimpleSelectInput } from "./SimpleSelectInput";
import { SimpleTextInput } from "./SimpleTextInput";
import { SearchCriteriaInput, searchCriteriaInputSchema } from "@/lib/validations/searchCriteria";
import { updateSearchCriteria } from "@/app/actions/searchCriteria";
import { SENIORITY_OPTIONS, CONTRACT_TYPE_OPTIONS, INDUSTRY_OPTIONS, COUNTRY_OPTIONS } from "@/lib/constants/searchCriteria";
import { ZodError } from "zod";

interface SearchCriteriaFormProps {
  initialData?: Partial<SearchCriteriaInput>;
  onSuccess?: () => void;
}

export function SearchCriteriaForm({
  initialData,
  onSuccess,
}: SearchCriteriaFormProps) {
  const [formData, setFormData] = useState<Partial<SearchCriteriaInput>>({
    target_job_titles: initialData?.target_job_titles || [],
    industries: initialData?.industries || [],
    seniority_levels: initialData?.seniority_levels || [],
    years_of_experience: initialData?.years_of_experience || null,
    country: initialData?.country || null,
    preferred_city: initialData?.preferred_city || null,
    work_models: initialData?.work_models || [],
    willing_to_relocate: initialData?.willing_to_relocate || false,
    salary_min: initialData?.salary_min || null,
    salary_max: initialData?.salary_max || null,
    salary_currency: initialData?.salary_currency || "EUR",
    contract_types: initialData?.contract_types || [],
    ideal_role_description: initialData?.ideal_role_description || null,
    must_have_requirements: initialData?.must_have_requirements || null,
    must_not_have_requirements: initialData?.must_not_have_requirements || null,
    work_environment_preferences:
      initialData?.work_environment_preferences || null,
    important_keywords: initialData?.important_keywords || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Helper to update form fields
  const updateField = <K extends keyof SearchCriteriaInput>(
    field: K,
    value: SearchCriteriaInput[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validate with Zod
  const validateForm = () => {
    try {
      searchCriteriaInputSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          const path = issue.path.join(".");
          newErrors[path] = issue.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await updateSearchCriteria(
        formData as SearchCriteriaInput
      );
      setMessage({
        type: "success",
        text: "Search criteria saved successfully!",
      });
      setTimeout(() => setMessage(null), 3000);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error saving search criteria:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section 1: Job Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Job Information
        </h3>
        <div className="space-y-4">
          <JobTitlesInput
            value={formData.target_job_titles || []}
            onChange={(v) => updateField("target_job_titles", v)}
            error={errors.target_job_titles}
          />
          <CheckboxArrayInput
            label="Industries"
            value={formData.industries || []}
            onChange={(v) => updateField("industries", v)}
            options={INDUSTRY_OPTIONS}
          />
          <CheckboxArrayInput
            label="Seniority Levels"
            value={formData.seniority_levels || []}
            onChange={(v) => updateField("seniority_levels", v)}
            options={SENIORITY_OPTIONS}
          />
        </div>
      </Card>

      {/* Section 2: Location & Work */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Location & Work
        </h3>
        <div className="space-y-4">
          <SimpleSelectInput
            label="Country"
            value={formData.country || null}
            onChange={(v) => updateField("country", v)}
            options={COUNTRY_OPTIONS}
            placeholder="Select a country"
            error={errors.country}
          />
          <SimpleTextInput
            label="Preferred City"
            value={formData.preferred_city || null}
            onChange={(v) => updateField("preferred_city", v)}
            placeholder="e.g., Paris"
            error={errors.preferred_city}
          />
          <WorkModelInput
            value={formData.work_models || []}
            onChange={(v) => updateField("work_models", v)}
            error={errors.work_models}
          />
          <SimpleToggle
            label="Open to relocation"
            value={formData.willing_to_relocate || false}
            onChange={(v) => updateField("willing_to_relocate", v)}
          />
        </div>
      </Card>

      {/* Section 3: Compensation */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Compensation
        </h3>
        <div className="space-y-4">
          <SalaryRangeInput
            minValue={formData.salary_min || null}
            maxValue={formData.salary_max || null}
            currency={formData.salary_currency || "EUR"}
            onMinChange={(v) => updateField("salary_min", v)}
            onMaxChange={(v) => updateField("salary_max", v)}
            onCurrencyChange={(v) => updateField("salary_currency", v)}
            error={errors.salary}
          />
          <SimpleNumberInput
            label="Years of Experience"
            value={formData.years_of_experience || null}
            onChange={(v) => updateField("years_of_experience", v)}
            placeholder="e.g., 5"
            min={0}
            max={60}
          />
        </div>
      </Card>

      {/* Section 4: Contract & Keywords */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Contract & Keywords
        </h3>
        <div className="space-y-4">
          <CheckboxArrayInput
            label="Contract Types"
            value={formData.contract_types || []}
            onChange={(v) => updateField("contract_types", v)}
            options={CONTRACT_TYPE_OPTIONS}
          />
          <SimpleArrayInput
            label="Important Keywords"
            value={formData.important_keywords || []}
            onChange={(v) => updateField("important_keywords", v)}
            placeholder="e.g., Python, React"
          />
        </div>
      </Card>

      {/* Section 5: Role Description */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Role Description
        </h3>
        <div className="space-y-4">
          <TextAreaInput
            label="Ideal Role Description"
            value={formData.ideal_role_description}
            onChange={(v) => updateField("ideal_role_description", v)}
            placeholder="Describe your ideal role..."
          />
          <TextAreaInput
            label="Must Have Requirements"
            value={formData.must_have_requirements}
            onChange={(v) => updateField("must_have_requirements", v)}
            placeholder="What are non-negotiables for you?"
          />
          <TextAreaInput
            label="Deal Breakers"
            value={formData.must_not_have_requirements}
            onChange={(v) => updateField("must_not_have_requirements", v)}
            placeholder="What would make you reject a role?"
          />
          <TextAreaInput
            label="Work Environment Preferences"
            value={formData.work_environment_preferences}
            onChange={(v) => updateField("work_environment_preferences", v)}
            placeholder="What company culture do you thrive in?"
          />
        </div>
      </Card>

      {/* Messages */}
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

      {/* Submit Button */}
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isLoading || Object.keys(errors).length > 0}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
