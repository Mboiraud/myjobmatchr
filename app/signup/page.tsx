import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata = {
  title: "Sign Up - MyJobMatchr",
  description: "Create your MyJobMatchr account to start finding your perfect job match",
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Join MyJobMatchr and start finding your perfect job match with AI
            </p>
          </div>
          <SignUpForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
