import { useSortableFieldHandle } from "@/hooks/use-sortable-field-handle";

import { GripVertical } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const SortableHanlde = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  const { handleRef } = useSortableFieldHandle();
  return (
    <Button
      ref={handleRef}
      variant="outline"
      className={cn("cursor-grab border-secondary", className)}
      {...props}
    >
      <GripVertical className="size-5"/>
    </Button>
  );
};

export default SortableHanlde;
