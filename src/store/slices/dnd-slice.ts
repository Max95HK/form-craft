import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "..";
import type { FieldType } from "@/constants";

type Source = "sidebar" | "builder";

type DndState =
  | {
      active: true;
      activeId: string;
      activeType: FieldType | null;
      source: Source;
    }
  | {
      active: false;
    };

const initialState: DndState = {
  active: false,
} satisfies DndState as DndState;

export const DndSlice = createSlice({
  name: "selected-id",
  initialState,
  reducers: {
    dragStart: (
      _,
      action: PayloadAction<{
        activeId: string;
        activeType: FieldType | null;
        source: Source;
      }>,
    ) => {
      const { activeId, source, activeType } = action.payload;

      return {
        active: true,
        activeId,
        activeType,
        source,
      };
    },
    dragEnd: (state) => {
      state.active = false;
    },
  },
});

export const { dragStart, dragEnd } = DndSlice.actions;

export const selectDnd = (state: RootState) => state.dnd;

export default DndSlice.reducer;
