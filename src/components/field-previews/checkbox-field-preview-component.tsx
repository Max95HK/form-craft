import { useAppSelector } from "@/hooks/use-app-selector";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { selectId, selectSelectedId } from "@/store/slices/selected-id-slice";

import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import SortableHanlde from "@/components/sortable-handle";

import { cn } from "@/lib/utils";

import { MousePointerClickIcon } from "lucide-react";

import type { CheckboxFieldConfig } from "@/types";

type CheckboxFieldPreviewCompProps = {
  config: CheckboxFieldConfig;
};

const CheckboxFieldPreviewComp = ({
  config: { label, id, defaultValue },
}: CheckboxFieldPreviewCompProps) => {
  // Hooks
  const selectedId = useAppSelector(selectSelectedId);
  const dispatch = useAppDispatch();

  // Derived state
  const isSelected = selectedId !== null && selectedId === id;
  return (
    <Field
      className={cn("group/field cursor-pointer")}
    >
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="flex gap-2 items-center">
        <div className="flex-1">
          <Checkbox
            id={id}
            checked={defaultValue}
            className={cn(
              "bg-secondary/80 group-hover/field:bg-secondary transition-all pointer-events-none ",
              isSelected &&
                "bg-accent/60 group-hover/field:bg-accent/80 border-accent",
            )}
          />
        </div>

         <div className="flex gap-2">
          <SortableHanlde />
          <Button
            variant="outline"
            onClick={() => dispatch(selectId({ id }))}
            className="border-secondary"
          >
            <MousePointerClickIcon className="size-5" />
          </Button>
        </div>
      </div>
    </Field>
  );
};

export default CheckboxFieldPreviewComp;
