import { useCallback, useRef } from "react";

import type { DragEndEvent, DragStartEvent } from "@dnd-kit/react";

import { useAppDispatch } from "@/hooks/use-app-dispatch";

import { dragEnd, dragStart } from "@/store/slices/dnd-slice";
import { addField } from "@/store/slices/form-builder-slice";
import { selectId } from "@/store/slices/selected-id-slice";

import { type FieldType, FIELD_TYPE } from "@/constants";

import { buildField } from "@/lib/utils";

export const useDndHandlers = () => {
  // Refs
  const idRef = useRef<string | null>(null);
  // Hooks
  const dispatch = useAppDispatch();

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const id = crypto.randomUUID();
      idRef.current = id;

      const sourceId = event.operation.source?.id as string;
      if (!sourceId) return;

      const isFromSidebar = isFieldType(sourceId);

      dispatch(
        dragStart({
          activeId: isFromSidebar ? id : sourceId,
          source: isFromSidebar ? "sidebar" : "builder",
        }),
      );
    },
    [dispatch],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (event.canceled) return;

      const type = event.operation.source?.id as string;
      if (!type) return;
      if (!isFieldType(type)) return;

      if (!idRef.current) return;
      dispatch(selectId({ id: idRef.current }));

      const field = buildField(type, idRef.current);

      dispatch(addField({ field }));
      dispatch(dragEnd());

      idRef.current = null;
    },
    [dispatch],
  );

  return { handleDragStart, handleDragEnd };
};

const isFieldType = (str: string): str is FieldType => {
  const array = Object.values(FIELD_TYPE) as string[];
  return array.includes(str);
};
