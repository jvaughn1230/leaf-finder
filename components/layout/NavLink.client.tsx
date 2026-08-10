"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: React.ReactNode;
};

const NavLink = (props: Props) => {
  const { href, children } = props;
  const currentPath = usePathname();
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      className={`${isActive && " opacity-50 border-b-2 border-b-black"} mr-4`}
      aria-disabled={isActive}
      tabIndex={isActive ? -1 : 0}
    >
      {children}
    </Link>
  );
};

export default NavLink;
