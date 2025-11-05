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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Reset Your Password
            </h1>
            <p className="text-gray-600">
              Enter your email and we'll send you a link to reset your password
            </p>
          </div>
          <ResetPasswordForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
