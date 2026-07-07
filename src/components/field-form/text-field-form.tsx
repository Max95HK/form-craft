import type { TextFieldConfig } from "@/types";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Input } from "../ui/input";

type TextFieldFormProps = {
  field: AnyFieldApi;
  config: TextFieldConfig;
  isInvalid: boolean;
};

const TextFieldForm = ({ field, config, isInvalid }: TextFieldFormProps) => {
  return (
    <Input
      id={field.name}
      name={field.name}
      value={field.state.value ?? ''}
      onBlur={field.handleBlur}
      onChange={(event) => field.handleChange(event.target.value)}
      aria-invalid={isInvalid}
      placeholder={config.placeholder}
    />
  );
};

export default TextFieldForm;
