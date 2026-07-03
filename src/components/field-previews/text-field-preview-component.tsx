import { useAppSelector } from "@/hooks/use-app-selector";
import { selectSelectedId } from "@/store/slices/selected-id-slice";

import FieldActions from "@/components/field-actions";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";


import type { TextFieldConfig } from "@/types";

type TextFieldPreviewCompProps = {
  config: TextFieldConfig;
};

const TextFieldPreviewComp = ({
  config: { label, id, placeholder, defaultValue },
}: TextFieldPreviewCompProps) => {
  // Hooks
  const selectedId = useAppSelector(selectSelectedId);

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
        
        <FieldActions id={id} />
      </div>
    </Field>
  );
};

export default TextFieldPreviewComp;
