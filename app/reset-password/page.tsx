import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata = {
  title: "Reset Password - MyJobMatchr",
  description: "Reset your MyJobMatchr password",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Reset Password
            </h1>
            <p className="text-sm text-gray-600">
              Enter your email to receive reset link
            </p>
          </div>
          <ResetPasswordForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
