import type { SelectFieldConfig } from "@/types";
import type { AnyFieldApi } from "@tanstack/react-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SelectFieldFormProps = {
  field: AnyFieldApi;
  config: SelectFieldConfig;
  isInvalid: boolean;
};

const SelectFieldForm = ({
  field,
  config: { placeholder, options },
  isInvalid,
}: SelectFieldFormProps) => {
  return (
    <Select value={field.state.value ?? ''} onValueChange={field.handleChange}>
      <SelectTrigger
        className={cn(
          "border-none outline-none bg-secondary/80 transition-all flex-1 cursor-pointer",
        )}
      >
        <SelectValue placeholder={placeholder} aria-invalid={isInvalid} />
      </SelectTrigger>
      <SelectContent side="bottom" position="popper">
        <SelectGroup>
          {options &&
            options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectFieldForm;
