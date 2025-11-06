import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Footer } from "@/components/layout/Footer";

interface HomeProps {
  searchParams?: Promise<Record<string, string>>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  // If there's a code parameter, redirect to callback route
  if (params?.code) {
    redirect(`/auth/callback?code=${params.code}`);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
