import { useState } from "react";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import BaseFieldSet from "./base-field-set";
import { toast } from "sonner"

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { updateField } from "@/store/slices/form-builder-slice";

import type { SelectFieldConfig } from "@/types";
import { PlusIcon } from "lucide-react";

type SelectFieldConfigCompProps = {
  config: SelectFieldConfig;
};

const SelectFieldConfigComp = ({
  config: {
    id,
    label,
    options,
    type,
    validation,
    defaultValue,
    placeholder,
  },
}: SelectFieldConfigCompProps) => {
  const [currentOptionValue, setCurrentOptionValue] = useState("");

  // Hooks
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-2">
      <BaseFieldSet
        id={id}
        type={type}
        label={label}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />

      <Field className="flex flex-col gap-2 text-foreground/80 mt-4">
        <FieldLabel htmlFor="field-label" className="text-lg">
          Options
        </FieldLabel>

        <div className="flex gap-2 items-center">
          <Input
            id="field-label"
            type="text"
            value={currentOptionValue}
            onChange={(event) => {
              setCurrentOptionValue(event.target.value);
            }}
            className="bg-background outline-none border-secondary focus-visible:border-accent"
          />

          <Tooltip disableHoverableContent delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => {
                  dispatch(
                    updateField({
                      fieldUpdates: {
                        id,
                        type,
                        options: [
                          ...options,
                          {
                            value: currentOptionValue,
                            label: currentOptionValue,
                          },
                        ],
                      },
                    }),
                  );
                  toast.success(`Added ${currentOptionValue.toUpperCase()} to the options`)
                  setCurrentOptionValue("");
                }}
                className="border-secondary"
              >
                <PlusIcon className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Option</TooltipContent>
          </Tooltip>
        </div>
      </Field>

      <FieldSet className="mt-4">
        <FieldLegend className="text-2xl! text-accent">Validation</FieldLegend>
        <FieldGroup>
          <Field className="flex flex-col gap-2 text-foreground/80">
            <FieldLabel htmlFor="field-is-required" className="text-lg">
              Is required?
            </FieldLabel>
            <Checkbox
              id="field-is-required"
              checked={validation.required}
              className="cursor-pointer focus-visible:border-accent"
              onCheckedChange={(event) => {
                if (typeof event === "boolean") {
                  dispatch(
                    updateField({
                      fieldUpdates: {
                        id,
                        type,
                        validation: { required: event },
                      },
                    }),
                  );
                }
              }}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
};

export default SelectFieldConfigComp;
