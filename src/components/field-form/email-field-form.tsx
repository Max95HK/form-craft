import type { EmailFieldConfig } from "@/types";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Input } from "../ui/input";

type EmailFieldFormProps = {
  field: AnyFieldApi;
  config: EmailFieldConfig;
  isInvalid: boolean;
};

const EmailFieldForm = ({ field, config, isInvalid }: EmailFieldFormProps) => {
  return (
    <Input
      id={field.name}
      type="email"
      name={field.name}
      value={field.state.value ?? ''}
      onBlur={field.handleBlur}
      onChange={(event) => field.handleChange(event.target.value)}
      aria-invalid={isInvalid}
      placeholder={config.placeholder}
    />
  );
};

export default EmailFieldForm;
