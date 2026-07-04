import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { FieldPatch, FieldConfigUnion } from "@/types";
import type { RootState } from "..";

interface FormBuilderState {
  fields: FieldConfigUnion[];
}

const initialState: FormBuilderState = {
  fields: [],
};

export const formBuilderSlice = createSlice({
  name: "form-builder",
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<{ field: FieldConfigUnion }>) => {
      state.fields.push(action.payload.field);
    },
    updateField: (
      state,
      action: PayloadAction<{ fieldUpdates: FieldPatch }>,
    ) => {
      const fieldToUpdate = state.fields.find(
        (field) => field.id === action.payload.fieldUpdates.id,
      );
      if (!fieldToUpdate) return;
      if (fieldToUpdate.type !== action.payload.fieldUpdates.type) {
        console.warn("Types don't match!");
        return;
      }

      Object.assign(fieldToUpdate, action.payload.fieldUpdates);
    },
    removeField: (state, action: PayloadAction<{ id: string }>) => {
      state.fields = state.fields.filter(
        (field) => field.id !== action.payload.id,
      );
    },
  },
});

export const { addField, updateField, removeField } = formBuilderSlice.actions;

export const selectFields = (state: RootState) => state.formBuilder.fields;

export default formBuilderSlice.reducer;
