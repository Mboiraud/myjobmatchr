"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ExperienceForm } from "./ExperienceForm";

interface Experience {
  id: string;
  company: string;
  title: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
}

interface ExperienceListProps {
  experiences: Experience[];
  onUpdate: () => void;
}

export function ExperienceList({ experiences, onUpdate }: ExperienceListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onUpdate();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete experience");
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      alert("An unexpected error occurred");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} variant="outline" size="sm">
            + Add Experience
          </Button>
        )}
      </div>

      {isAdding && (
        <Card className="p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Add New Experience</h4>
          <ExperienceForm
            onSuccess={() => {
              setIsAdding(false);
              onUpdate();
            }}
            onCancel={() => setIsAdding(false)}
          />
        </Card>
      )}

      {experiences.length === 0 && !isAdding ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No work experience added yet.</p>
          <p className="text-sm text-gray-400 mt-1">Click "Add Experience" to get started.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <Card key={exp.id} className="p-6">
              {editingId === exp.id ? (
                <>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Edit Experience</h4>
                  <ExperienceForm
                    initialData={exp}
                    experienceId={exp.id}
                    onSuccess={() => {
                      setEditingId(null);
                      onUpdate();
                    }}
                    onCancel={() => setEditingId(null)}
                  />
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
                      <p className="text-md text-gray-700 mt-1">{exp.company}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date!)}
                      </p>
                      {exp.description && (
                        <p className="text-sm text-gray-600 mt-3 whitespace-pre-line">
                          {exp.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        onClick={() => setEditingId(exp.id)}
                        variant="outline"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(exp.id)}
                        variant="outline"
                        size="sm"
                        disabled={deletingId === exp.id}
                      >
                        {deletingId === exp.id ? "..." : "Delete"}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
