/**
 * Profile Completeness Calculator
 * Calculates a score from 0-100 based on filled profile fields
 */

export interface ProfileCompletenessInput {
  first_name: string | null;
  last_name: string | null;
  experiencesCount: number;
  skillsCount: number;
}

export interface ProfileCompletenessResult {
  score: number;
  breakdown: {
    basicInfo: number;
    experiences: number;
    skills: number;
  };
  missingFields: string[];
}

/**
 * Scoring weights (total = 100%)
 * - Basic info: 20% (first_name: 10%, last_name: 10%)
 * - At least 1 experience: 50%
 * - At least 3 skills: 30%
 */
const WEIGHTS = {
  FIRST_NAME: 10,
  LAST_NAME: 10,
  EXPERIENCES: 50,
  SKILLS: 30,
};

export function calculateProfileCompleteness(
  input: ProfileCompletenessInput
): ProfileCompletenessResult {
  let score = 0;
  const missingFields: string[] = [];
  const breakdown = {
    basicInfo: 0,
    experiences: 0,
    skills: 0,
  };

  // Basic info (20% total)
  if (input.first_name && input.first_name.trim()) {
    score += WEIGHTS.FIRST_NAME;
    breakdown.basicInfo += WEIGHTS.FIRST_NAME;
  } else {
    missingFields.push("First name");
  }

  if (input.last_name && input.last_name.trim()) {
    score += WEIGHTS.LAST_NAME;
    breakdown.basicInfo += WEIGHTS.LAST_NAME;
  } else {
    missingFields.push("Last name");
  }

  // Work experiences (50%)
  if (input.experiencesCount >= 1) {
    score += WEIGHTS.EXPERIENCES;
    breakdown.experiences = WEIGHTS.EXPERIENCES;
  } else {
    missingFields.push("At least 1 work experience");
  }

  // Skills (30%)
  if (input.skillsCount >= 3) {
    score += WEIGHTS.SKILLS;
    breakdown.skills = WEIGHTS.SKILLS;
  } else if (input.skillsCount > 0) {
    // Partial credit for 1-2 skills
    const partialScore = Math.floor((input.skillsCount / 3) * WEIGHTS.SKILLS);
    score += partialScore;
    breakdown.skills = partialScore;
    missingFields.push(`${3 - input.skillsCount} more skill(s)`);
  } else {
    missingFields.push("At least 3 skills");
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    breakdown,
    missingFields,
  };
}

/**
 * Get a user-friendly message based on completeness score
 */
export function getCompletenessMessage(score: number): string {
  if (score === 100) return "Your profile is complete! 🎉";
  if (score >= 80) return "Almost there! Just a few more details.";
  if (score >= 60) return "Good progress! Keep building your profile.";
  if (score >= 40) return "You're on your way! Add more information.";
  if (score >= 20) return "Let's get started! Fill in your details.";
  return "Complete your profile to get better job matches.";
}

/**
 * Get color class for progress bar based on score
 */
export function getCompletenessColor(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-blue-500";
  if (score >= 40) return "bg-yellow-500";
  return "bg-red-500";
}
