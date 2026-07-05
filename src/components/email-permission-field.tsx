import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { PlusIcon } from "lucide-react";
import type { Permission } from "./field-configs/email-field-config-component";
import { useState } from "react";

type EmailPermissionFieldProps = {
  fieldKey: Permission;
  tooltipTitle: string;
  title: string;
  initialValue: string[] | undefined;
  onAddPermission: (fieldKey: Permission, updatedDomains: string[]) => void;
};

const EmailPermissionField = ({
  fieldKey,
  title,
  tooltipTitle,
  initialValue,
  onAddPermission,
}: EmailPermissionFieldProps) => {
  // States
  const [permissionValues, setPermissionValues] = useState<
    Record<Permission, string>
  >({
    allowedDomains: "",
    allowedEmails: "",
    blockedDomains: "",
    blockedEmails: "",
  });

  const [permission, setPermission] = useState<string[]>(initialValue ?? []);

  return (
    <Field className="flex flex-col gap-2 text-foreground/80">
      <FieldLabel htmlFor="field-allowed-domains" className="text-lg">
        {title}
      </FieldLabel>

      <div className="flex gap-2">
        <Input
          id="field-allowed-domains"
          type="text"
          value={permissionValues[fieldKey]}
          onChange={(event) =>
            setPermissionValues((prevValues) => ({
              ...prevValues,
              [fieldKey]: event.target.value,
            }))
          }
          className="bg-background outline-none border-secondary focus-visible:border-accent"
        />

        <Tooltip disableHoverableContent delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                const updatePermission = [
                  ...permission,
                  permissionValues[fieldKey],
                ];

                setPermission(updatePermission);
                onAddPermission(fieldKey, updatePermission);
              }}
              className="border-secondary"
            >
              <PlusIcon className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{tooltipTitle}</TooltipContent>
        </Tooltip>
      </div>
    </Field>
  );
};

export default EmailPermissionField;
