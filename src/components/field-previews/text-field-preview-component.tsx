import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { TextFieldConfig } from "@/types";


type TextFieldPreviewCompProps = {
  config: TextFieldConfig;
};

const TextFieldPreviewComp = ({
  config: { label, id, placeholder, defaultValue },
}: TextFieldPreviewCompProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        className="border-none outline-none bg-secondary pointer-events-none"
        value={defaultValue ?? ""}
      />
    </Field>
  );
};

export default TextFieldPreviewComp;
