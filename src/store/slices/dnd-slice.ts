import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "..";

type Source = "sidebar" | "builder";

type DndState =
  | {
      active: true;
      activeId: string;
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
      action: PayloadAction<{ activeId: string; source: Source }>,
    ) => {
      const { activeId, source } = action.payload;

      return {
        active: true,
        activeId,
        source,
      };
    },
    dragEnd: (state) => {
      state.active = false;
    },
  },
});

export const { dragStart, dragEnd } = DndSlice.actions;

export const selectDnd = (state: RootState) => state.dnd.active;

export default DndSlice.reducer;
