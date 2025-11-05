import Link from "next/link";
import Button from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Email Verified - MyJobMatchr",
  description: "Your email has been successfully verified",
};

export default function EmailVerificationSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-4">
        <div className="w-96 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Email Verified
            </h1>
            <p className="text-gray-600">
              Your email address has been successfully verified. Welcome to MyJobMatchr!
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <p className="text-green-800 text-sm">
              Your account is now fully activated and ready to use. You can start exploring job matches and building your profile.
            </p>
          </div>

          <Link href="/app/dashboard" className="block">
            <Button variant="primary" className="w-full">
              Go to Dashboard
            </Button>
          </Link>

          <Link href="/" className="block mt-3">
            <Button variant="secondary" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
