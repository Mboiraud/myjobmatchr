"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProfileForm } from "./ProfileForm";
import { ExperienceList } from "./ExperienceList";
import { SkillsList } from "./SkillsList";
import { ProfileCompleteness } from "./ProfileCompleteness";
import Card from "@/components/ui/Card";

interface ProfilePageClientProps {
  profile: {
    first_name: string | null;
    last_name: string | null;
    phone_number: string | null;
  };
  experiences: Array<{
    id: string;
    company: string;
    title: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string | null;
  }>;
  skills: Array<{
    id: string;
    skill_name: string;
  }>;
}

export function ProfilePageClient({ profile, experiences, skills }: ProfilePageClientProps) {
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUpdate = () => {
    // Refresh the page data
    router.refresh();
    // Trigger completeness component to refetch
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Profile Completeness */}
      <ProfileCompleteness key={refreshKey} />

      {/* Basic Profile Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        <ProfileForm initialData={profile} onSuccess={handleUpdate} />
      </Card>

      {/* Work Experience */}
      <Card className="p-6">
        <ExperienceList experiences={experiences} onUpdate={handleUpdate} />
      </Card>

      {/* Skills */}
      <Card className="p-6">
        <SkillsList skills={skills} onUpdate={handleUpdate} />
      </Card>
    </div>
  );
}
