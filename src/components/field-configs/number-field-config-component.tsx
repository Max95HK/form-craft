import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { updateField } from "@/store/slices/form-builder-slice";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import type { NumberFieldConfig } from "@/types";
import { useState } from "react";

type NumberFieldConfigCompProps = {
  config: NumberFieldConfig;
};

const NumberFieldConfigComp = ({
  config: { id, label, type, validation, defaultValue },
}: NumberFieldConfigCompProps) => {
  // States
  const [value, setValue] = useState(String(defaultValue));

  // Hooks
  const dispatch = useAppDispatch();
  
  return (
    <div className="flex flex-col gap-6">
      <FieldSet>
        <FieldLegend className="text-2xl! text-accent">
          Field Properties
        </FieldLegend>
        <FieldGroup>
          <Field className="flex flex-col gap-2 text-foreground/80">
            <FieldLabel htmlFor="field-label" className="text-lg">
              Label
            </FieldLabel>

            <Input
              id="field-label"
              type="text"
              value={label}
              onChange={(event) =>
                dispatch(
                  updateField({
                    fieldUpdates: { id, type, label: event.target.value },
                  }),
                )
              }
              className="bg-background outline-none border-secondary focus-visible:border-accent"
            />
          </Field>

          <Field className="flex flex-col gap-2 text-foreground/80">
            <FieldLabel htmlFor="field-default-value" className="text-lg">
              Default Value
            </FieldLabel>

            <Input
              id="field-default-value"
              type="text"
              pattern="\d+"
              value={value}
              onChange={(event) => {
                const value = event.target.value;
                if (/^\d+$/.test(value) || value === "") {
                  setValue(value);

                  const parsedValue = parseFloat(value);
                  if (isNaN(parsedValue)) return;
                  dispatch(
                    updateField({
                      fieldUpdates: {
                        id,
                        type,
                        defaultValue: parsedValue,
                      },
                    }),
                  );
                }
              }}
              onBlur={() => {
                const parsedValue = parseFloat(value);
                if (isNaN(parsedValue)) return;
                dispatch(
                  updateField({
                    fieldUpdates: {
                      id,
                      type,
                      defaultValue: parsedValue,
                    },
                  }),
                );
              }}
              className="bg-background outline-none border-secondary focus-visible:border-accent"
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSet>
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

          <Field className="flex flex-col gap-2 text-foreground/80">
            <FieldLabel htmlFor="field-min-length" className="text-lg">
              Min length
            </FieldLabel>
            <Input
              id="field-min-length"
              type="number"
              className="bg-background outline-none border-secondary focus-visible:border-accent"
              value={validation.min}
              onChange={(event) =>
                dispatch(
                  updateField({
                    fieldUpdates: {
                      id,
                      type,
                      validation: {
                        required: validation.required,
                        min: parseInt(event.target.value),
                      },
                    },
                  }),
                )
              }
            />
          </Field>

          <Field className="flex flex-col gap-2 text-foreground/80">
            <FieldLabel htmlFor="field-max-length" className="text-lg">
              Max length
            </FieldLabel>
            <Input
              id="field-max-length"
              type="number"
              className="bg-background outline-none border-secondary focus-visible:border-accent"
              value={validation.max}
              onChange={(event) =>
                dispatch(
                  updateField({
                    fieldUpdates: {
                      id,
                      type,
                      validation: {
                        required: validation.required,
                        max: parseInt(event.target.value),
                      },
                    },
                  }),
                )
              }
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
};

export default NumberFieldConfigComp;
