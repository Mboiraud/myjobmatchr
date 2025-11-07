"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { addSkill } from "@/app/actions/skills";

interface SkillsInputProps {
  existingSkills: string[];
}

export function SkillsInput({ existingSkills }: SkillsInputProps) {
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
      await addSkill(skillName);
      setSkillName("");
      setMessage(null);
    } catch (error) {
      console.error("Error adding skill:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setMessage({ type: "error", text: errorMessage });
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
