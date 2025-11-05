import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
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
