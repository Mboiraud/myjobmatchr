import Link from "next/link";
import Button from "@/components/ui/Button";

export function Hero() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Your AI-Powered Job Search Companion
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Find your perfect job match with intelligent AI evaluation. Save time,
          get better matches, and land your dream role.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/signup">
            <Button variant="primary" className="px-6 py-2">
              Get Started Free
            </Button>
          </Link>
          <Link href="/signin">
            <Button variant="secondary" className="px-6 py-2">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Trust Signal */}
        <p className="text-sm text-gray-500">
          No credit card required • Free trial included
        </p>
      </div>
    </div>
  );
}
