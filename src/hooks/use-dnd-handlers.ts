import { useCallback, useRef } from "react";

import type { DragEndEvent, DragStartEvent } from "@dnd-kit/react";

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";

import { dragEnd, dragStart, selectDnd } from "@/store/slices/dnd-slice";
import { addField } from "@/store/slices/form-builder-slice";
import { selectId } from "@/store/slices/selected-id-slice";

import { type FieldType, FIELD_TYPE } from "@/constants";

import { buildField } from "@/lib/utils";

export const useDndHandlers = () => {
  // Refs
  const idRef = useRef<string | null>(null);
  // Hooks
  const dispatch = useAppDispatch();
  const dndState = useAppSelector(selectDnd);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const id = crypto.randomUUID();
      idRef.current = id;

      const sourceId = String(event.operation.source?.id);
      if (!sourceId) return;

      dispatch(
        dragStart({
          activeId: isFieldType(sourceId) ? id : sourceId,
          activeType: isFieldType(sourceId) ? sourceId : null,
          source: isFieldType(sourceId) ? "sidebar" : "builder",
        }),
      );
    },
    [dispatch],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (event.canceled) return;

      if (dndState.active && dndState.source === "builder") {
        dispatch(dragEnd());
        return;
      }

      if (!idRef.current) return;
      dispatch(selectId({ id: idRef.current }));

      if (!dndState.active) return;
      const type = dndState.activeType;
      if (!type) return;

      const field = buildField(type, idRef.current);

      dispatch(addField({ field }));
      dispatch(dragEnd());

      idRef.current = null;
    },
    [dispatch, dndState],
  );

  return { handleDragStart, handleDragEnd };
};

const isFieldType = (str: string): str is FieldType => {
  const array = Object.values(FIELD_TYPE) as string[];
  return array.includes(str);
};
