import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { SquarePenIcon } from "lucide-react";

import type { TextFieldConfig, PatchText } from "@/types";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { updateField } from "@/store/slices/form-builder-slice";

type TextFieldConfigCompProps = {
  config: TextFieldConfig;
};

const TextFieldConfigComp = ({
  config: { label, defaultValue, placeholder, validation, id, type },
}: TextFieldConfigCompProps) => {
  // Hooks
  const dispatch = useAppDispatch();

  // Handlers

  return (
    <Field className="flex flex-col gap-2 text-foreground">
      <FieldLabel htmlFor={id} className="text-lg">
        Label
      </FieldLabel>

      <Input
        id={id}
        type="text"
        value={label}
        onChange={(event) =>
          dispatch(
            updateField({
              fieldUpdates: { id, type, label: event.target.value },
            }),
          )
        }
        className="bg-background outline-none border-secondary"
      />
    </Field>
  );
};

export default TextFieldConfigComp;
