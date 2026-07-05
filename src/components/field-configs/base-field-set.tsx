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

type BaseFieldConfigCompProps = {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "select";
  defaultValue?: string | string[];
  placeholder?: string;
};

const BaseFieldSet = ({
  id,
  defaultValue,
  label,
  type,
  placeholder,
}: BaseFieldConfigCompProps) => {
  // Hooks
  const dispatch = useAppDispatch();

  return (
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
            value={defaultValue ?? ""}
            onChange={(event) =>
              dispatch(
                updateField({
                  fieldUpdates: {
                    id,
                    type,
                    defaultValue: event.target.value,
                  },
                }),
              )
            }
            className="bg-background outline-none border-secondary focus-visible:border-accent"
          />
        </Field>
        <Field className="flex flex-col gap-2 text-foreground/80">
          <FieldLabel htmlFor="field-placeholder" className="text-lg">
            Placeholder
          </FieldLabel>

          <Input
            id="field-placeholder"
            type="text"
            value={placeholder ?? ""}
            onChange={(event) =>
              dispatch(
                updateField({
                  fieldUpdates: { id, type, placeholder: event.target.value },
                }),
              )
            }
            className="bg-background outline-none border-secondary focus-visible:border-accent"
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

export default BaseFieldSet;
