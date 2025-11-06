import { PageHeader } from "@/components/layout/PageHeader";

export default function ApplicationsPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="Applications"
        subtitle="Track and manage your job applications with a kanban board"
      />

      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">📋</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Coming Soon
        </h2>
        <p className="text-gray-600">
          This feature is under development. You'll be able to track your applications here.
        </p>
      </div>
    </div>
  );
}
