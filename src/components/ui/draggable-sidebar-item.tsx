import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { capitalize } from "@/lib/utils";

import { useDraggable } from "@dnd-kit/react";

import type { LucideProps } from "lucide-react";

type DraggableSidebarItemProps = {
  type: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

const DraggableSidebarItem = ({
  type,
  icon: Icon,
}: DraggableSidebarItemProps) => {
  const { ref, isDragSource } = useDraggable({
    id: type,
  });
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        ref={ref}
        className="cursor-grab flex items-center justify-between menu-button-clip"
        style={{opacity: isDragSource ? 0.5 : '1'}}
      >
        <span className="font-semibold text-lg">{capitalize(type)}</span>
        <Icon className="size-5!" />
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default DraggableSidebarItem;
