"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { getCompletenessMessage, getCompletenessColor } from "@/lib/utils/profileCompleteness";

interface ProfileCompletenessProps {
  initialScore?: number;
  refetchTrigger?: number;
}

interface CompletenessData {
  score: number;
  breakdown: {
    basicInfo: number;
    experiences: number;
    skills: number;
  };
  missingFields: string[];
}

export function ProfileCompleteness({ refetchTrigger }: ProfileCompletenessProps) {
  const [data, setData] = useState<CompletenessData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCompleteness();
  }, [refetchTrigger]);

  const fetchCompleteness = async () => {
    try {
      const response = await fetch("/api/profile/completeness");
      const result = await response.json();
      if (response.ok) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching completeness:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
      </Card>
    );
  }

  if (!data) return null;

  const score = data.score;
  const message = getCompletenessMessage(score);
  const colorClass = getCompletenessColor(score);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Profile Completeness</h3>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{score}%</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className={`${colorClass} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        ></div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-sm text-gray-500">Basic Info</div>
          <div className="text-lg font-semibold text-gray-900">
            {data.breakdown.basicInfo}%
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Experience</div>
          <div className="text-lg font-semibold text-gray-900">
            {data.breakdown.experiences}%
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Skills</div>
          <div className="text-lg font-semibold text-gray-900">
            {data.breakdown.skills}%
          </div>
        </div>
      </div>

      {/* Missing Fields */}
      {data.missingFields.length > 0 && (
        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">To complete your profile:</p>
          <ul className="space-y-1">
            {data.missingFields.map((field, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="text-red-500 mr-2">•</span>
                {field}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
