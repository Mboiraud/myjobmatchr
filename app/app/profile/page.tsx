import { PageHeader } from "@/components/layout/PageHeader";
import { ProfilePageClient } from "@/components/features/ProfilePageClient";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  // Fetch profile data
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch experiences
  const { data: experiences } = await supabase
    .from("user_experiences")
    .select("*")
    .eq("user_id", user.id)
    .order("start_date", { ascending: false });

  // Fetch skills
  const { data: skills } = await supabase
    .from("user_skills")
    .select("*")
    .eq("user_id", user.id)
    .order("skill_name", { ascending: true });

  return (
    <div className="p-8">
      <PageHeader
        title="Profile"
        subtitle="Manage your personal information, work experience, and skills"
      />

      <ProfilePageClient
        profile={{
          first_name: profile?.first_name || null,
          last_name: profile?.last_name || null,
          phone_number: profile?.phone_number || null,
        }}
        experiences={experiences || []}
        skills={skills || []}
      />
    </div>
  );
}
