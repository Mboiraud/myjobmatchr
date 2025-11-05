import { getUser } from "@/lib/auth/server";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="font-bold text-gray-900">MyJobMatchr Dashboard</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <form action="/api/auth/signout" method="POST">
                <Button type="submit" variant="secondary" size="sm">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-2">
            Welcome to MyJobMatchr Dashboard
          </h2>
          <p className="text-blue-700 mb-4">
            Authenticated user: <strong>{user?.email}</strong>
          </p>
          <p className="text-blue-700">
            This is a placeholder dashboard. The authentication system is working correctly!
            You've been redirected here because you're logged in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔍 Job Matches</h3>
            <p className="text-gray-600 text-sm mb-4">
              AI-powered job recommendations based on your profile
            </p>
            <Button variant="outline" disabled className="w-full">
              Coming Soon
            </Button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📋 Applications</h3>
            <p className="text-gray-600 text-sm mb-4">Track your job applications with kanban board</p>
            <Button variant="outline" disabled className="w-full">
              Coming Soon
            </Button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">⚙️ Settings</h3>
            <p className="text-gray-600 text-sm mb-4">Manage your profile and preferences</p>
            <Button variant="outline" disabled className="w-full">
              Coming Soon
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
