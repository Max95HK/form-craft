import { useAppSelector } from "@/hooks/use-app-selector";
import { selectId, selectSelectedId } from "@/store/slices/selected-id-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";

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
import { Calendar as CalendarIcon } from "lucide-react";

import { cn, getInitialDate } from "@/lib/utils";

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
  const dispatch = useAppDispatch();

  // Derived state
  const isSelected = selectedId !== null && selectedId === id;

  return (
    <Field
      onClick={() => dispatch(selectId({ id }))}
      className="cursor-pointer"
    >
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Popover open={false}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            data-empty={!date}
            className={cn(
              "w-70 justify-start text-left font-normal data-[empty=true]:text-foreground bg-secondary/80 hover:bg-secondary",
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
          <Calendar mode="single" selected={date} onSelect={setDate} required />
        </PopoverContent>
      </Popover>
    </Field>
  );
};

export default DateFieldPreviewComp;
