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
      asChild
      variant="outline"
      className={cn("cursor-grab border-secondary", className)}
      {...props}
    >
      <button ref={handleRef}>
        <GripVertical className="size-5" />
      </button>
    </Button>
  );
};

export default SortableHanlde;
