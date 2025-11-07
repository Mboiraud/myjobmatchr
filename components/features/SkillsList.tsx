"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import { SkillsInput } from "./SkillsInput";
import { deleteSkill } from "@/app/actions/skills";

interface Skill {
  id: string;
  skill_name: string;
}

interface SkillsListProps {
  skills: Skill[];
}

export function SkillsList({ skills }: SkillsListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, skillName: string) => {
    if (!confirm(`Remove "${skillName}" from your skills?`)) return;

    setDeletingId(id);
    try {
      await deleteSkill(id);
    } catch (error) {
      console.error("Error deleting skill:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to delete skill";
      alert(errorMessage);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Skills</h3>

      <SkillsInput existingSkills={skills.map((s) => s.skill_name)} />

      {skills.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No skills added yet.</p>
          <p className="text-sm text-gray-400 mt-1">Add your first skill above.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div key={skill.id} className="relative group">
              <Badge variant="primary" className="pr-8">
                {skill.skill_name}
              </Badge>
              <button
                onClick={() => handleDelete(skill.id, skill.skill_name)}
                disabled={deletingId === skill.id}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                title="Remove skill"
              >
                {deletingId === skill.id ? "..." : "×"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
