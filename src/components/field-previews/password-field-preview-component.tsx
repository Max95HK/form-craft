import { useAppSelector } from "@/hooks/use-app-selector";
import { selectSelectedId } from "@/store/slices/selected-id-slice";

import FieldActions from "@/components/field-actions";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { EyeClosedIcon, EyeIcon } from "lucide-react";

import type { PasswordFieldConfig } from "@/types";

type PasswordFieldPreviewCompProps = {
  config: PasswordFieldConfig;
};

const PasswordFieldPreviewComp = ({
  config: { label, id, defaultValue, textVisible, placeholder },
}: PasswordFieldPreviewCompProps) => {
  // Hooks
  const selectedId = useAppSelector(selectSelectedId);

  // Derived state
  const isSelected = selectedId !== null && selectedId === id;

  return (
    <Field className="group/field">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="flex gap-2">
        <div className="relative flex-1">
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
            readOnly
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-0 pointer-events-none"
          >
            {textVisible ? <EyeClosedIcon /> : <EyeIcon />}
          </Button>
        </div>

        <FieldActions id={id} />
      </div>
    </Field>
  );
};

export default PasswordFieldPreviewComp;
