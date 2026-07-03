import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { SIDEBAR_ITEMS } from "@/constants";

import { FormIcon, XIcon } from "lucide-react";
import DraggableSidebarItem from "../ui/draggable-sidebar-item";

const AppSidebar = () => {
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader className="flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold">FormCraft</span>
          <FormIcon />
        </div>
        {isMobile && (
          <Button variant="outline" onClick={() => setOpenMobile(false)}>
            <XIcon />
          </Button>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-6">
              {SIDEBAR_ITEMS.map(({ type, icon }) => (
                // TODO: Mostrare in base a isMobile il componente adatto (da mobile niente drag)
                <DraggableSidebarItem key={type} type={type} icon={icon} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
