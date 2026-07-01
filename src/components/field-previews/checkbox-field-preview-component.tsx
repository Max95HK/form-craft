import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox"

import type { CheckboxFieldConfig } from "@/types";

type CheckboxFieldPreviewCompProps = {
  config: CheckboxFieldConfig;
};

const CheckboxFieldPreviewComp = ({ config: { label, id, defaultValue,  }, }: CheckboxFieldPreviewCompProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Checkbox id={id} checked={defaultValue}/>
    </Field>
  );
};

export default CheckboxFieldPreviewComp;
