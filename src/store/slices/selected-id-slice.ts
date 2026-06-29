import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "..";

interface SelectedIdState {
  selectedId: string | null;
}

const initialState: SelectedIdState = {
  selectedId: null,
};

export const selectedIdSlice = createSlice({
  name: "selected-id",
  initialState,
  reducers: {
    selectId: (state, action: PayloadAction<{ id: string }>) => {
      state.selectedId = action.payload.id;
    },
    clearId: (state) => {
      state.selectedId = null;
    },
  },
});

export const { selectId, clearId } = selectedIdSlice.actions;

export const selectSelectedId = (state: RootState) =>
  state.selectedId.selectedId;

export default selectedIdSlice.reducer;
