import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import BaseFieldSet from "@/components/field-configs/base-field-set";
import EmailPermissionField from "@/components/email-permission-field";

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { updateField } from "@/store/slices/form-builder-slice";

import type { EmailFieldConfig } from "@/types";

export type Permission =
  "allowedDomains" | "allowedEmails" | "blockedDomains" | "blockedEmails";

type EmailFieldConfigCompProps = {
  config: EmailFieldConfig;
};

const EmailFieldConfigComp = ({
  config: {
    id,
    label,
    type,
    validation,
    allowedDomains,
    allowedEmails,
    blockedDomains,
    blockedEmails,
    defaultValue,
    placeholder,
  },
}: EmailFieldConfigCompProps) => {
  // Hooks
  const dispatch = useAppDispatch();

  // Handler
  const handleAddPermission = (
    fieldKey: Permission,
    updatedPermission: string[],
  ) => {
    dispatch(
      updateField({
        fieldUpdates: {
          id,
          type,
          [fieldKey]: updatedPermission,
        },
      }),
    );
  };

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
        <FieldLegend className="text-2xl! text-accent">Permissions</FieldLegend>
        <FieldGroup>
          <EmailPermissionField
            fieldKey="allowedDomains"
            title="Allowed Domain"
            tooltipTitle="Add Domain"
            initialValue={allowedDomains}
            onAddPermission={handleAddPermission}
          />
          <EmailPermissionField
            fieldKey="allowedEmails"
            title="Allowed Emails"
            tooltipTitle="Add Email"
            initialValue={allowedEmails}
            onAddPermission={handleAddPermission}
          />
          <EmailPermissionField
            fieldKey="blockedDomains"
            title="Blocked Domain"
            tooltipTitle="Block Domain"
            initialValue={blockedDomains}
            onAddPermission={handleAddPermission}
          />
          <EmailPermissionField
            fieldKey="blockedEmails"
            title="Blocked Emails"
            tooltipTitle="Block Email"
            initialValue={blockedEmails}
            onAddPermission={handleAddPermission}
          />
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

export default EmailFieldConfigComp;
