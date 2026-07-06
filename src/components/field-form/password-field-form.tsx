import type { PasswordFieldConfig } from "@/types";
import type { AnyFieldApi } from "@tanstack/react-form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

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
    <div className="relative">
      <Input
        id={field.name}
        type={textVisible ? "text" : "password"}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder}
      />
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-0"
      >
        {textVisible ? <EyeClosedIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
};

export default PasswordFieldForm;
