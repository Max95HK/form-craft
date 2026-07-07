import type { PasswordFieldConfig } from "@/types";
import type { AnyFieldApi } from "@tanstack/react-form";

import { Input } from "../ui/input";

type PasswordFieldFormProps = {
  field: AnyFieldApi;
  config: PasswordFieldConfig;
  isInvalid: boolean;
};

const PasswordFieldForm = ({
  field,
  config: { textVisible, placeholder },
  isInvalid,
}: PasswordFieldFormProps) => {
  return (
    <Input
      id={field.name}
      type={textVisible ? "text" : "password"}
      name={field.name}
      value={field.state.value ?? ""}
      onBlur={field.handleBlur}
      onChange={(event) => field.handleChange(event.target.value)}
      aria-invalid={isInvalid}
      placeholder={placeholder}
    />
  );
};

export default PasswordFieldForm;
