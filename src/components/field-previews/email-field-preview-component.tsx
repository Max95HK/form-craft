import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { EmailFieldConfig } from "@/types";

type EmailFieldPreviewCompProps = {
  config: EmailFieldConfig;
};

const EmailFieldPreviewComp = ({
  config: { label, id, defaultValue },
}: EmailFieldPreviewCompProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type="email"
        className="border-none outline-none bg-secondary pointer-events-none"
        value={defaultValue ?? ""}
      />
    </Field>
  );
};

export default EmailFieldPreviewComp;
