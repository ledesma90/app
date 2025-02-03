import SideNav from "@/app/ui/dashboard/sidenav";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-100 transition-all duration-300 ease-in-out">
        {children}
      </div>
    </div>
  );
}
