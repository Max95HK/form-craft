import { useState } from "react";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn, getInitialDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { updateField } from "@/store/slices/form-builder-slice";

import type { DateFieldConfig } from "@/types";

type DateFieldConfigCompProps = {
  config: DateFieldConfig;
};

const DateFieldConfigComp = ({
  config: {
    format: defaultFormat,
    id,
    label,
    type,
    validation,
    allowedDates,
    defaultValue,
    disabledDates,
  },
}: DateFieldConfigCompProps) => {
  // States
  const [date, setDate] = useState<Date>(() =>
    getInitialDate(defaultFormat, defaultValue),
  );

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

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!date}
                className={cn(
                  "w-70 justify-start text-left font-normal data-[empty=true]:text-foreground bg-background outline-none border-secondary focus-visible:border-accent focus:border-accent hover:bg-background",
                )}
              >
                <CalendarIcon className="text-foreground" />
                {date ? (
                  <span className="text-foreground">
                    {format(date, defaultFormat)}
                  </span>
                ) : (
                  <span className="text-foreground">Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                onSelect={(date) => {
                  setDate(date);
                  dispatch(
                    updateField({
                      fieldUpdates: {
                        id,
                        type,
                        defaultValue: format(date, defaultFormat),
                      },
                    }),
                  );
                }}
                selected={date}
                required
              />
            </PopoverContent>
          </Popover>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

export default DateFieldConfigComp;
