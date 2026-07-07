import type { NumberFieldConfig } from "@/types";
import type { AnyFieldApi } from "@tanstack/react-form";

import { Input } from "../ui/input";

type NumberFieldFormProps = {
  field: AnyFieldApi;
  config: NumberFieldConfig;
  isInvalid: boolean;
};

const NumberFieldForm = ({ field, isInvalid }: NumberFieldFormProps) => {
  return (
    <Input
      id={field.name}
      type="number"
      name={field.name}
      value={field.state.value ?? 0}
      onBlur={field.handleBlur}
      onChange={(event) => field.handleChange(event.target.value)}
      aria-invalid={isInvalid}
    />
  );
};

export default NumberFieldForm;
