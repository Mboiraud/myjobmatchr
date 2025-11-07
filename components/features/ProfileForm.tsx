"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { UpdateProfileInput, updateProfileSchema } from "@/lib/validations/profile";
import { updateProfile } from "@/app/actions/profile";
import { ZodError } from "zod";

interface ProfileFormProps {
  initialData: {
    first_name: string | null;
    last_name: string | null;
    phone_number: string | null;
  };
  onSuccess?: () => void;
}

export function ProfileForm({ initialData, onSuccess }: ProfileFormProps) {
  const [formData, setFormData] = useState<UpdateProfileInput>({
    first_name: initialData.first_name || "",
    last_name: initialData.last_name || "",
    phone_number: initialData.phone_number || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Helper to update form fields
  const updateField = <K extends keyof UpdateProfileInput>(
    field: K,
    value: UpdateProfileInput[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validate with Zod
  const validateForm = () => {
    try {
      updateProfileSchema.parse(formData);
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
      await updateProfile(formData);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error updating profile:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          value={formData.first_name || ""}
          onChange={(e) => updateField("first_name", e.target.value)}
          error={errors.first_name}
          placeholder="Enter your first name"
        />

        <Input
          label="Last Name"
          type="text"
          value={formData.last_name || ""}
          onChange={(e) => updateField("last_name", e.target.value)}
          error={errors.last_name}
          placeholder="Enter your last name"
        />
      </div>

      <Input
        label="Phone Number"
        type="tel"
        value={formData.phone_number || ""}
        onChange={(e) => updateField("phone_number", e.target.value)}
        error={errors.phone_number}
        placeholder="+1234567890"
        helperText="Format: +[country code][number]"
      />

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

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading || Object.keys(errors).length > 0}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
