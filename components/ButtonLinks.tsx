import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const ButtonLinks = ({
  href,
  className = "",
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "w-full sm:w-auto px-8 py-4 text-lg font-medium",
        className
      )}>
      {children}
    </Link>
  );
};
