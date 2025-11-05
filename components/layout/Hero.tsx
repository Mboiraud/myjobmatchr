import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Your AI-Powered Job Search Companion
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Find your perfect job match with intelligent AI evaluation. Save time,
          get better matches, and land your dream role.
        </p>

        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-left">
          <div className="flex items-start gap-3">
            <div className="text-primary font-bold mt-1">✓</div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Matching</h3>
              <p className="text-sm text-gray-600">
                Let AI evaluate job fit for you
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-primary font-bold mt-1">✓</div>
            <div>
              <h3 className="font-semibold text-gray-900">Track Progress</h3>
              <p className="text-sm text-gray-600">
                Manage applications in one place
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-primary font-bold mt-1">✓</div>
            <div>
              <h3 className="font-semibold text-gray-900">Save Time</h3>
              <p className="text-sm text-gray-600">
                Automated job aggregation & matching
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button variant="primary" className="px-8 py-3 text-lg">
              Get Started Free
            </Button>
          </Link>
          <Link href="/signin">
            <Button variant="secondary" className="px-8 py-3 text-lg">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Trust Signal */}
        <p className="mt-12 text-sm text-gray-500">
          No credit card required • Free trial included
        </p>
      </div>
    </div>
  );
}
