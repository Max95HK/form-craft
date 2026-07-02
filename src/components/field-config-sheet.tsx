import { selectFields } from "@/store/slices/form-builder-slice";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useAppSelector } from "@/hooks/use-app-selector";
import { selectSelectedId } from "@/store/slices/selected-id-slice";

import { extractFieldComponents } from "@/lib/utils";

const FieldConfigSheet = () => {
  // Hooks
  const fields = useAppSelector(selectFields);
  const selectedId = useAppSelector(selectSelectedId);

  // Derived states
  const isOpen = fields.length > 0;

  const selectedField = fields.find((field) => field.id === selectedId);

  if (!selectedField) return;

  const ConfigComp = extractFieldComponents(selectedField).configComponent;

  return (
    <Sheet open={isOpen} modal={false}>
      <SheetContent
        showCloseButton={false}
        className="bg-light-background border-none"
      >
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>

        <div className="">
          <ConfigComp config={selectedField} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FieldConfigSheet;
