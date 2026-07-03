import { useAppSelector } from "@/hooks/use-app-selector";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { selectSelectedId, selectId } from "@/store/slices/selected-id-slice";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SortableHanlde from "@/components/sortable-handle";

import { cn } from "@/lib/utils";

import { MousePointerClickIcon } from "lucide-react";

import type { TextFieldConfig } from "@/types";
import { Button } from "../ui/button";

type TextFieldPreviewCompProps = {
  config: TextFieldConfig;
};

const TextFieldPreviewComp = ({
  config: { label, id, placeholder, defaultValue },
}: TextFieldPreviewCompProps) => {
  // Hooks
  const selectedId = useAppSelector(selectSelectedId);
  const dispatch = useAppDispatch();

  // Derived state
  const isSelected = selectedId !== null && selectedId === id;

  return (
    <Field className={cn("group/field cursor-pointer")}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="flex gap-2">
        <Input
          id={id}
          type="text"
          placeholder={placeholder}
          className={cn(
            "border border-secondary outline-none bg-secondary/80 group-hover/field:bg-secondary transition-all pointer-events-none",
            isSelected &&
              "bg-accent/60 group-hover/field:bg-accent/80 border-accent",
          )}
          value={defaultValue ?? ""}
        />
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

export default TextFieldPreviewComp;
