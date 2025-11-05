import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "bordered" | "elevated";
}

export default function Card({
  children,
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  const variants = {
    default: "bg-white border border-gray-200",
    bordered: "bg-white border-2 border-gray-300",
    elevated: "bg-white shadow-md",
  };

  return (
    <div
      className={`rounded-lg p-6 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
