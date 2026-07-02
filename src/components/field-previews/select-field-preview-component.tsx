import { useAppSelector } from "@/hooks/use-app-selector";
import { selectId, selectSelectedId } from "@/store/slices/selected-id-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";

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
  const dispatch = useAppDispatch();

  // Derived state
  const isSelected = selectedId !== null && selectedId === id;

  return (
    <Field
      onClick={() => dispatch(selectId({ id }))}
      className={cn("group/field cursor-pointer")}
    >
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select
        defaultValue={isMultiple ? defaultValue?.join(", ") : defaultValue}
      >
        <SelectTrigger
          className={cn(
            "border-none outline-none bg-secondary/80 group-hover/field:bg-secondary transition-all pointer-events-none",
            isSelected &&
              "bg-accent/60 group-hover/field:bg-accent/80 border-accent",
          )}
        >
          <SelectValue placeholder={placeholder} className="" />
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
