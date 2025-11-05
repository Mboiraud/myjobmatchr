import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata = {
  title: "Sign In - MyJobMatchr",
  description: "Sign in to your MyJobMatchr account",
};

export default function SignInPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-4">
        <div className="w-96">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sign In
          </h1>
          <p className="text-base text-gray-600 mb-8">
            Welcome back! Sign in to continue
          </p>
          <SignInForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
