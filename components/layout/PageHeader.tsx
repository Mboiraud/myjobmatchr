import { MobileMenuButton } from "./MobileMenuButton";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <MobileMenuButton />
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>
      {subtitle && <p className="text-gray-600 lg:ml-0 ml-14">{subtitle}</p>}
    </div>
  );
}
