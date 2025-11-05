import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata = {
  title: "Sign In - MyJobMatchr",
  description: "Sign in to your MyJobMatchr account",
};

export default function SignInPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sign In to MyJobMatchr
            </h1>
            <p className="text-gray-600">
              Welcome back! Sign in to continue finding your perfect job match
            </p>
          </div>
          <SignInForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
