import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { EyeIcon, EyeClosedIcon } from "lucide-react";

import type { PasswordFieldConfig } from "@/types";

type PasswordFieldPreviewCompProps = {
  config: PasswordFieldConfig;
};

const PasswordFieldPreviewComp = ({
  config: { label, id, defaultValue, textVisible },
}: PasswordFieldPreviewCompProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Input
          id={id}
          type={textVisible ? "text" : "password"}
          className="border-none outline-none bg-secondary pointer-events-none"
          value={defaultValue ?? ""}
        />
        <Button size="icon" variant="ghost" className="absolute right-0">
          {textVisible ? <EyeClosedIcon /> : <EyeIcon />}
        </Button>
      </div>
    </Field>
  );
};

export default PasswordFieldPreviewComp;
