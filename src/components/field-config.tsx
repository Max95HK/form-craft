import { selectFields } from "@/store/slices/form-builder-slice";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useRef, useState } from "react";

const FieldConfig = () => {
  // Hooks
  const fields = useAppSelector(selectFields);

  // Derived states
  const isOpen = fields.length > 0;

  return (
    <Sheet open={isOpen}>
      <SheetContent showCloseButton={false} className="bg-light-background border-none">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default FieldConfig;
