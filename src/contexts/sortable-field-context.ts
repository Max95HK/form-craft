import { createContext } from "react";

type SortableFieldContextState = {
  handleRef: (element: Element | null) => void;
};

export const SortableFieldContext = createContext<SortableFieldContextState | null>(
  null,
);

