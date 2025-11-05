import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg text-gray-900">
              MyJobMatchr
            </span>
          </Link>

          {/* Auth Links */}
          <div className="flex items-center gap-4">
            <Link href="/signin">
              <Button variant="secondary" className="text-sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" className="text-sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
