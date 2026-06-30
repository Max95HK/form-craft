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
        <main className="flex flex-col h-screen w-full overflow-hidden p-2">
          <SidebarTrigger />
          <div className="flex-1 min-h-0 flex items-center justify-center overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </DragDropProvider>
    {/* <TanStackRouterDevtools /> */}
  </>
);

export default RootLayout;
