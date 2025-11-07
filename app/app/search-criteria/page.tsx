import { PageHeader } from "@/components/layout/PageHeader";
import { SearchCriteriaForm } from "@/components/features/search/SearchCriteriaForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SearchCriteriaPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  // Fetch current search criteria
  const { data: searchCriteria } = await supabase
    .from("search_criteria")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="p-8">
      <PageHeader
        title="Search Criteria"
        subtitle="Define your job search preferences and activate daily automatic searches"
      />

      <SearchCriteriaForm initialData={searchCriteria || undefined} />
    </div>
  );
}
