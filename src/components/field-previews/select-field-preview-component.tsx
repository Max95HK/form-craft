import { useAppSelector } from "@/hooks/use-app-selector";
import { selectSelectedId } from "@/store/slices/selected-id-slice";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FieldActions from "../field-actions";

import { cn } from "@/lib/utils";

import type { SelectFieldConfig } from "@/types";

type SelectFieldPreviewCompProps = {
  config: SelectFieldConfig;
};

const SelectFieldPreviewComp = ({
  config: { label, id, defaultValue, placeholder, isMultiple, options },
}: SelectFieldPreviewCompProps) => {
  // Hooks
  const selectedId = useAppSelector(selectSelectedId);

  // Derived state
  const isSelected = selectedId !== null && selectedId === id;

  return (
    <Field className={cn("group/field")}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="flex gap-2">
        <Select value={!isMultiple ? defaultValue : ""} >
          <SelectTrigger
            className={cn(
              "border-none outline-none bg-secondary/80 group-hover/field:bg-secondary transition-all flex-1 cursor-pointer",
              isSelected &&
                "bg-accent/60 group-hover/field:bg-accent/80 border-accent",
            )}
          >
            <SelectValue placeholder={placeholder} className=""/>
          </SelectTrigger>
          <SelectContent side="bottom" position="popper">
            <SelectGroup>
              {options &&
                options.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="pointer-events-none">{option.label}</SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <FieldActions id={id} />
      </div>
    </Field>
  );
};

export default SelectFieldPreviewComp;
