import { useAppSelector } from "@/hooks/use-app-selector";
import { selectSelectedId } from "@/store/slices/selected-id-slice";

import { format } from "date-fns";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FieldActions from "@/components/field-actions";

import { cn, getInitialDate } from "@/lib/utils";

import { Calendar as CalendarIcon } from "lucide-react";

import type { DateFieldConfig } from "@/types";

type DateFieldPreviewCompProps = {
  config: DateFieldConfig;
};

const DateFieldPreviewComp = ({
  config: { label, id, defaultValue, format: defaultFormat },
}: DateFieldPreviewCompProps) => {
  // States
  const [date, setDate] = useState<Date>(() => getInitialDate(defaultValue));

  // Hooks
  const selectedId = useAppSelector(selectSelectedId);

  // Derived state
  const isSelected = selectedId !== null && selectedId === id;

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="flex gap-2">
        <Popover open={false}>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              data-empty={!date}
              className={cn(
                "w-70 justify-start text-left font-normal data-[empty=true]:text-foreground bg-secondary/80 hover:bg-secondary flex-1",
                isSelected && "bg-accent/60 hover:bg-accent/80 border-accent ",
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
              selected={date}
              onSelect={setDate}
              required
            />
          </PopoverContent>
        </Popover>

        <FieldActions id={id} />
      </div>
    </Field>
  );
};

export default DateFieldPreviewComp;
