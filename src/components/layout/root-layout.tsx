import { Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { DragDropProvider } from "@dnd-kit/react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import AppSidebar from "@/components/layout/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

import { useDndHandlers } from "@/hooks/use-dnd-handlers";

const RootLayout = () => {
  // Hooks
  const { handleDragStart, handleDragEnd } = useDndHandlers();

  return (
    <>
      <DragDropProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col h-screen w-full overflow-hidden p-2">
              <SidebarTrigger />
              <div className="flex-1 min-h-0 flex items-center justify-center overflow-y-auto">
                <Outlet />
              </div>
            </main>
            <Toaster richColors position="top-center"/>
          </SidebarProvider>
        </TooltipProvider>
      </DragDropProvider>
      {/* <TanStackRouterDevtools /> */}
    </>
  );
};

export default RootLayout;
