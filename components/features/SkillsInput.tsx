"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface SkillsInputProps {
  existingSkills: string[];
  onSuccess?: () => void;
}

export function SkillsInput({ existingSkills, onSuccess }: SkillsInputProps) {
  const [skillName, setSkillName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage(null);

    // Client-side duplicate check
    if (existingSkills.some((s) => s.toLowerCase() === skillName.toLowerCase())) {
      setError("This skill already exists");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill_name: skillName }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.details) {
          setError(data.details[0]?.message || "Validation failed");
        } else if (response.status === 409) {
          setError("This skill already exists");
        } else {
          setMessage({ type: "error", text: data.error || "Failed to add skill" });
        }
        return;
      }

      setMessage({ type: "success", text: "Skill added successfully!" });
      setSkillName("");
      if (onSuccess) {
        setTimeout(() => {
          setMessage(null);
          onSuccess();
        }, 500);
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="text"
            value={skillName}
            onChange={(e) => {
              setSkillName(e.target.value);
              setError("");
              setMessage(null);
            }}
            error={error}
            placeholder="e.g., JavaScript, React, Python..."
          />
        </div>
        <Button type="submit" disabled={isLoading || !skillName.trim()}>
          {isLoading ? "Adding..." : "Add Skill"}
        </Button>
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}
    </form>
  );
}
