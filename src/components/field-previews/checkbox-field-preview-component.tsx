import { useAppSelector } from "@/hooks/use-app-selector";
import { selectSelectedId } from "@/store/slices/selected-id-slice";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import FieldActions from "@/components/field-actions";

import { cn } from "@/lib/utils";


import type { CheckboxFieldConfig } from "@/types";

type CheckboxFieldPreviewCompProps = {
  config: CheckboxFieldConfig;
};

const CheckboxFieldPreviewComp = ({
  config: { label, id, defaultValue },
}: CheckboxFieldPreviewCompProps) => {
  // Hooks
  const selectedId = useAppSelector(selectSelectedId);

  // Derived state
  const isSelected = selectedId !== null && selectedId === id;

  return (
    <Field
      className={cn("group/field")}
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

      <FieldActions id={id} />
      </div>
    </Field>
  );
};

export default CheckboxFieldPreviewComp;
