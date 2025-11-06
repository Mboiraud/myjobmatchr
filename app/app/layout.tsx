import { Sidebar } from "@/components/layout/Sidebar";
import { getUser } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  // If no user found, redirect to signin
  if (!user) {
    redirect("/signin");
  }

  // Try to get user profile, create if doesn't exist
  const supabase = await createClient();
  let { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // If profile doesn't exist, create it
  if (!profile) {
    const { data: newProfile } = await supabase
      .from("user_profiles")
      .insert({
        id: user.id,
      })
      .select()
      .single();
    
    profile = newProfile;
  }

  const userName = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : profile?.first_name || profile?.last_name || "";

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        userName={userName}
        userEmail={user.email || ""}
      />

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
