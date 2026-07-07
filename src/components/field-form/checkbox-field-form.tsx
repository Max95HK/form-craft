import { cn } from "@/lib/utils";
import type { CheckboxFieldConfig } from "@/types";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Checkbox } from "../ui/checkbox";

type CheckboxFieldFormProps = {
  field: AnyFieldApi;
  config: CheckboxFieldConfig;
  isInvalid: boolean;
};

const CheckboxFieldForm = ({ field, isInvalid }: CheckboxFieldFormProps) => {
  return (
    <Checkbox
      id={field.name}
      checked={field.state.value ?? false}
      aria-invalid={isInvalid}
      onBlur={field.handleBlur}
      onCheckedChange={(event) => {
        if (typeof event === "boolean") {
          setTimeout(() => {
            field.handleChange(event);
          }, 0);
        }
      }}
      className={cn(
        "bg-secondary/80 group-hover/field:bg-secondary transition-all",
      )}
    />
  );
};

export default CheckboxFieldForm;
