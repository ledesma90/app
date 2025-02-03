"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Estructura",
    href: "/dashboard/estructura",
    icon: DocumentDuplicateIcon,
  },
  { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
];

export default function NavLinks({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col p-2 space-y-1">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center gap-2 p-2 text-sm font-medium rounded-md bg-gray-50 hover:bg-sky-100",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
                "justify-center": isCollapsed,
              }
            )}
          >
            <LinkIcon className="h-5 w-5" />
            {!isCollapsed && link.name}
          </Link>
        );
      })}
    </div>
  );
}
