import { createClient } from "@/lib/supabase/server";

export async function regenerateMatchingInstructions(
  userId: string
): Promise<string> {
  const supabase = await createClient();

  // Fetch user's search criteria
  const { data: searchCriteria, error } = await supabase
    .from("search_criteria")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !searchCriteria) {
    throw new Error("Failed to fetch search criteria");
  }

  // Build matching instructions from criteria
  const parts: string[] = [];

  // Job titles
  if (searchCriteria.target_job_titles?.length > 0) {
    parts.push(`Looking for: ${searchCriteria.target_job_titles.join(", ")}.`);
  }

  // Industries
  if (searchCriteria.industries?.length > 0) {
    parts.push(`Industries: ${searchCriteria.industries.join(", ")}.`);
  }

  // Seniority levels
  if (searchCriteria.seniority_levels?.length > 0) {
    parts.push(`Level: ${searchCriteria.seniority_levels.join(", ")}.`);
  }

  // Country and City
  if (searchCriteria.country) {
    parts.push(`Country: ${searchCriteria.country}.`);
  }
  if (searchCriteria.preferred_city) {
    parts.push(`City: ${searchCriteria.preferred_city}.`);
  }

  // Work models
  if (searchCriteria.work_models?.length > 0) {
    parts.push(
      `Work: ${searchCriteria.work_models.map((m: string) => m.charAt(0).toUpperCase() + m.slice(1)).join(", ")}.`
    );
  }

  // Salary range
  if (searchCriteria.salary_min || searchCriteria.salary_max) {
    const min = searchCriteria.salary_min || "any";
    const max = searchCriteria.salary_max || "any";
    parts.push(
      `Salary: ${min}-${max} ${searchCriteria.salary_currency || "EUR"}.`
    );
  }

  // Contract types
  if (searchCriteria.contract_types?.length > 0) {
    parts.push(`Contract: ${searchCriteria.contract_types.join(", ")}.`);
  }

  // Must have requirements
  if (searchCriteria.must_have_requirements) {
    parts.push(`Must have: ${searchCriteria.must_have_requirements}`);
  }

  // Deal breakers
  if (searchCriteria.must_not_have_requirements) {
    parts.push(`Avoid: ${searchCriteria.must_not_have_requirements}`);
  }

  // Combine and truncate to max 500 chars
  let instructions = parts.join(" ");
  if (instructions.length > 500) {
    instructions = instructions.substring(0, 497) + "...";
  }

  // Update search_criteria with new matching instructions
  const { error: updateError } = await supabase
    .from("search_criteria")
    .update({ matching_instructions: instructions })
    .eq("user_id", userId);

  if (updateError) {
    throw new Error("Failed to update matching instructions");
  }

  return instructions;
}
