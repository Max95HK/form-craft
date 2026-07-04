import { selectFields } from "@/store/slices/form-builder-slice";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useIsMobile } from "@/hooks/use-mobile";

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { clearId, selectSelectedId } from "@/store/slices/selected-id-slice";

import { capitalize, extractFieldComponents } from "@/lib/utils";

const FieldConfigSheet = () => {
  // Hooks
  const fields = useAppSelector(selectFields);
  const selectedId = useAppSelector(selectSelectedId);
  const dispatch = useAppDispatch();

  const isMobile = useIsMobile();

  // Derived states
  const isOpen = selectedId !== null;

  const selectedField = fields.find((field) => field.id === selectedId);

  if (!selectedField) return;

  const ConfigComp = extractFieldComponents(selectedField).configComponent;

  const handleOpenChange = (open: boolean) => {
    if (!open) dispatch(clearId());
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange} modal={isMobile}>
      <SheetContent
        className="bg-light-background border-none p-2"
        onInteractOutside={(event) => {
          if (!isMobile) {
            event.preventDefault();
          }
        }}
      >
        <SheetHeader>
          <SheetTitle className="text-2xl text-accent">
            {capitalize(selectedField.type)} Field Options
          </SheetTitle>
          <SheetDescription className="text-foreground/50 leading-6">
            Configure the properties, behaviors, and accessibility settings for
            this field.
          </SheetDescription>
        </SheetHeader>

        <div className="p-4">
          <ConfigComp config={selectedField} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FieldConfigSheet;
