import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import BaseFieldSet from "@/components/field-configs/base-field-set";

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { updateField } from "@/store/slices/form-builder-slice";

import type { TextFieldConfig } from "@/types";

type TextFieldConfigCompProps = {
  config: TextFieldConfig;
};

const TextFieldConfigComp = ({
  config: { label, defaultValue, placeholder, validation, id, type },
}: TextFieldConfigCompProps) => {
  // Hooks
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-6">
      <BaseFieldSet
        id={id}
        type={type}
        label={label}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />

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
              value={validation.minLength}
              onChange={(event) =>
                dispatch(
                  updateField({
                    fieldUpdates: {
                      id,
                      type,
                      validation: {
                        required: validation.required,
                        minLength: parseInt(event.target.value),
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
              value={validation.maxLength}
              onChange={(event) =>
                dispatch(
                  updateField({
                    fieldUpdates: {
                      id,
                      type,
                      validation: {
                        required: validation.required,
                        maxLength: parseInt(event.target.value),
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

export default TextFieldConfigComp;
