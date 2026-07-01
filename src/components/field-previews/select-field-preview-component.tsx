import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";

import type { SelectFieldConfig } from "@/types";

type SelectFieldPreviewCompProps = {
  config: SelectFieldConfig;
};

const SelectFieldPreviewComp = ({
  config: { label, id, defaultValue, placeholder, isMultiple, options },
}: SelectFieldPreviewCompProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select
        defaultValue={isMultiple ? defaultValue?.join(", ") : defaultValue}
      >
        <SelectTrigger className="border-none outline-none bg-secondary">
          <SelectValue placeholder={placeholder} className=""/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options &&
              options.map((option) => (
                <SelectItem value={option.value}>{option.label}</SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
};

export default SelectFieldPreviewComp;
