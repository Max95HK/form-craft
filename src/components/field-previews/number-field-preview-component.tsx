import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { NumberFieldConfig } from "@/types";

type NumberFieldPreviewCompProps = {
  config: NumberFieldConfig;
};

const NumberFieldPreviewComp = ({
  config: { label, id, defaultValue },
}: NumberFieldPreviewCompProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type="number"
        className="border-none outline-none bg-secondary pointer-events-none"
        value={defaultValue ?? 0}
      />
    </Field>
  );
};

export default NumberFieldPreviewComp;
