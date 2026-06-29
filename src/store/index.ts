import { configureStore } from "@reduxjs/toolkit";

import FormBuilderReducer from "@/store/slices/form-builder-slice";
import SelectedIdReducer from "@/store/slices/selected-id-slice";
import DndReducer from "@/store/slices/dnd-slice";

export const store = configureStore({
  reducer: {
    formBuilder: FormBuilderReducer,
    selectedId: SelectedIdReducer,
    dnd: DndReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
