import { redirect } from "next/navigation";

export default function AppPage() {
  // Redirect to matches page
  redirect("/app/matches");
}
