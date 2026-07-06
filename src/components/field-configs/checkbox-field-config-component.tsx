import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { updateField } from "@/store/slices/form-builder-slice";

import type { CheckboxFieldConfig } from "@/types";
import { Checkbox } from "../ui/checkbox";

type CheckboxFieldConfigCompProps = {
  config: CheckboxFieldConfig;
};

const CheckboxFieldConfigComp = ({
  config: { id, label, type, validation, defaultValue },
}: CheckboxFieldConfigCompProps) => {
  // Hooks
  const dispatch = useAppDispatch();

  return (
    <>
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

            <Checkbox
              id="field-is-required"
              checked={defaultValue}
              className="cursor-pointer focus-visible:border-accent"
              onCheckedChange={(event) => {
                if (typeof event === "boolean") {
                  dispatch(
                    updateField({
                      fieldUpdates: {
                        id,
                        type,
                        defaultValue: event,
                      },
                    }),
                  );
                }
              }}
            />
          </Field>
        </FieldGroup>
      </FieldSet>

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
    </>
  );
};

export default CheckboxFieldConfigComp;
