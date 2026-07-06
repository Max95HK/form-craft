import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";

import { useForm, formOptions, type AnyFieldApi } from "@tanstack/react-form";
import { Input } from "./ui/input";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectFields } from "@/store/slices/form-builder-slice";

type FormProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Form = ({ isOpen, setIsOpen }: FormProps) => {
  // Hooks
  const form = useForm();

  const fields = useAppSelector(selectFields);

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
              }}
            >
              <FieldGroup>
                {fields.map((customField) => (
                  <form.Field name="">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            {customField.label}
                          </FieldLabel>
                        
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                ))}
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
