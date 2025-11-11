"use client";

import { ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";
import { MainContentPlaceholder } from "./MainContentPlaceholder";
import { PrimarySidebar } from "./PrimarySidebar";
import { SecondarySidebar } from "./SecondarySidebar";

type WorkspaceShellProps = {
  children?: ReactNode;
  activeTab?: "myPage" | "myClub";
};

export function WorkspaceShell({ children, activeTab = "myPage" }: WorkspaceShellProps) {
  return (
    <div className="flex min-h-screen w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-10 xl:px-14">
      <AppHeader />
      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)_minmax(220px,280px)]">
        <div className="order-2 lg:order-1 lg:h-full">
          <PrimarySidebar activeTab={activeTab} />
        </div>
        <main className="order-1 flex min-h-[560px] flex-col lg:order-2">
          {children ?? <MainContentPlaceholder />}
        </main>
        <div className="order-3 lg:h-full">
          <SecondarySidebar />
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

