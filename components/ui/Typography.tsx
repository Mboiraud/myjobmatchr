import { HTMLAttributes, ReactNode } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function Heading({
  children,
  level = 1,
  as,
  className = "",
  ...props
}: HeadingProps) {
  const Tag = (as || `h${level}`) as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  const styles = {
    1: "text-4xl font-bold text-gray-900",
    2: "text-3xl font-bold text-gray-900",
    3: "text-2xl font-semibold text-gray-900",
    4: "text-xl font-semibold text-gray-900",
    5: "text-lg font-semibold text-gray-900",
    6: "text-base font-semibold text-gray-900",
  };

  return (
    <Tag className={`${styles[level]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "default" | "muted" | "primary";
}

export function Text({
  children,
  size = "base",
  weight = "normal",
  color = "default",
  className = "",
  ...props
}: TextProps) {
  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const weights = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const colors = {
    default: "text-gray-900",
    muted: "text-gray-600",
    primary: "text-primary-600",
  };

  return (
    <p
      className={`${sizes[size]} ${weights[weight]} ${colors[color]} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
