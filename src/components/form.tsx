import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { useAppSelector } from "@/hooks/use-app-selector";
import { buildZodSchema, extractFieldComponents } from "@/lib/utils";
import { selectFields } from "@/store/slices/form-builder-slice";
import { useForm } from "@tanstack/react-form";

import { buildFormOpt } from "@/lib/utils";
import { Button } from "./ui/button";
import { useMemo } from "react";

type FormProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Form = ({ isOpen, setIsOpen }: FormProps) => {
  // Hooks
  const fields = useAppSelector(selectFields);

  const formOpt = useMemo(() => buildFormOpt(fields), [fields]);
  const schema = useMemo(() => buildZodSchema(fields), [fields]);

  const form = useForm({
    ...formOpt,
    validators: {
      onSubmit: schema,
      onBlur: schema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Your Form</DialogTitle>
          <DialogDescription>
            Test the validation for each field or continue to finalize your
            form.
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardContent>
            <form
              id="personal-form"
              onSubmit={(event) => {
                event.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                {fields.map((customField) => {
                  const FormFieldComp =
                    extractFieldComponents(customField).formComponent;
                  return (
                    // TODO: Aggiungere l'input per aggiungere il name ad ogni field nei vari config
                    <form.Field
                      key={customField.id}
                      name={customField.name ?? customField.id}
                    >
                      {(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field key={customField.id} data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              {customField.label}
                            </FieldLabel>
                            <FormFieldComp
                              config={customField}
                              field={field}
                              isInvalid={isInvalid}
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    </form.Field>
                  );
                })}
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" form="personal-form">
              Try Form
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
