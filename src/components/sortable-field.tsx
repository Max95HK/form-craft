import { useSortable } from "@dnd-kit/react/sortable";

import { SortableFieldContext } from "@/contexts/sortable-field-context";

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
    <SortableFieldContext.Provider value={{ handleRef }}>
      <div ref={ref} {...props}>
        {children}
      </div>
    </SortableFieldContext.Provider>
  );
};

export default SortableField;
