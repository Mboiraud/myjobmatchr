import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata = {
  title: "Reset Password - MyJobMatchr",
  description: "Reset your MyJobMatchr password",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-4">
        <div className="w-96">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reset Password
          </h1>
          <p className="text-base text-gray-600 mb-8">
            Enter your email to receive reset link
          </p>
          <ResetPasswordForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
