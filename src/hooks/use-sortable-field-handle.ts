import { useContext } from "react";

import { SortableFieldContext } from "@/contexts/sortable-field-context";

export const useSortableFieldHandle = () => {
  const ctx = useContext(SortableFieldContext);
  if (!ctx) {
    throw new Error(
      "useSortableFieldHandle must be used within a SortableItem",
    );
  }
  return ctx;
};
