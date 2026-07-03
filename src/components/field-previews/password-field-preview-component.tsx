import { useAppSelector } from "@/hooks/use-app-selector";
import { selectId, selectSelectedId } from "@/store/slices/selected-id-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { EyeIcon, EyeClosedIcon, MousePointerClickIcon } from "lucide-react";

import type { PasswordFieldConfig } from "@/types";
import SortableHanlde from "../sortable-handle";

type PasswordFieldPreviewCompProps = {
  config: PasswordFieldConfig;
};

const PasswordFieldPreviewComp = ({
  config: { label, id, defaultValue, textVisible, placeholder },
}: PasswordFieldPreviewCompProps) => {
  // Hooks
  const selectedId = useAppSelector(selectSelectedId);
  const dispatch = useAppDispatch();

  // Derived state
  const isSelected = selectedId !== null && selectedId === id;

  return (
    <Field
      className="group/field cursor-pointer"
    >
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative flex gap-2">
        <Input
          id={id}
          type={textVisible ? "text" : "password"}
          className={cn(
            "border border-secondary outline-none bg-secondary/80 group-hover/field:bg-secondary transition-all pointer-events-none placeholder:text-foreground/60",
            isSelected &&
              "bg-accent/60 group-hover/field:bg-accent/80 border-accent",
          )}
          placeholder={placeholder}
          value={defaultValue ?? ""}
        />
        <Button size="icon" variant="ghost" className="absolute right-0 pointer-events-none">
          {textVisible ? <EyeClosedIcon /> : <EyeIcon />}
        </Button>

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

export default PasswordFieldPreviewComp;
