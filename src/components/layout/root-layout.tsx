import { Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { DragDropProvider } from "@dnd-kit/react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import AppSidebar from "@/components/layout/app-sidebar";

const RootLayout = () => (
  <>
    <DragDropProvider onDragStart={() => {}} onDragEnd={() => {}}>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-2 w-full">
          <SidebarTrigger />
          <div className="size-full flex items-center justify-center">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </DragDropProvider>
    {/* <TanStackRouterDevtools /> */}
  </>
);

export default RootLayout;
