import { useSortable } from "@dnd-kit/react/sortable";

import { Button } from "@/components/ui/button";

import { GripVertical } from "lucide-react";

type SortableFieldProps = {
  id: string;
  index: number;
} & Omit<React.ComponentProps<"div">, "ref">;

const SortableField = ({
  id,
  index,
  children,
  ...props
}: SortableFieldProps) => {
  const { ref, handleRef } = useSortable({ id, index });
  return (
    <div ref={ref} {...props} className="relative">
      <GripVertical
        role="button"
        ref={handleRef}
        className="absolute right-0 cursor-grab"
      />
      {children}
    </div>
  );
};

export default SortableField;
