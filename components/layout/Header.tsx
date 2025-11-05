import Link from "next/link";
import Button from "@/components/ui/Button";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-gray-900">
            MyJobMatchr
          </Link>

          {/* Auth Links */}
          <div className="flex items-center gap-3">
            <Link href="/signin">
              <Button variant="secondary">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
