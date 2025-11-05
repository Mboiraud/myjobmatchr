import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata = {
  title: "Sign Up - MyJobMatchr",
  description: "Create your MyJobMatchr account to start finding your perfect job match",
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-4">
        <div className="w-96">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-base text-gray-600 mb-8">
            Start finding your perfect job match
          </p>
          <SignUpForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
