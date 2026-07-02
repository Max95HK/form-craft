import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectId, selectSelectedId } from "@/store/slices/selected-id-slice";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import type { EmailFieldConfig } from "@/types";

type EmailFieldPreviewCompProps = {
  config: EmailFieldConfig;
};

const EmailFieldPreviewComp = ({
  config: { label, id, defaultValue, placeholder },
}: EmailFieldPreviewCompProps) => {
  // Hooks
  const selectedId = useAppSelector(selectSelectedId);
  const dispatch = useAppDispatch();

  // Derived state
  const isSelected = selectedId !== null && selectedId === id;

  return (
    <Field
      onClick={() => dispatch(selectId({ id }))}
      className="group/field cursor-pointer"
    >
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type="email"
        placeholder={placeholder}
        className={cn(
          "border border-secondary outline-none bg-secondary/80 group-hover/field:bg-secondary transition-all pointer-events-none placeholder:text-foreground/60",
          isSelected &&
            "bg-accent/60 group-hover/field:bg-accent/80 border-accent",
        )}
        value={defaultValue ?? ""}
      />
    </Field>
  );
};

export default EmailFieldPreviewComp;
