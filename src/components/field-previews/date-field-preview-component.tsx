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

import { getInitialDate } from "@/lib/utils";

import type { DateFieldConfig } from "@/types";

type DateFieldPreviewCompProps = {
  config: DateFieldConfig;
};

const DateFieldPreviewComp = ({
  config: { label, id, defaultValue, format: defaultFormat },
}: DateFieldPreviewCompProps) => {
  const [date, setDate] = useState<Date>(() => getInitialDate(defaultValue));
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            data-empty={!date}
            className="w-70 justify-start text-left font-normal data-[empty=true]:text-foreground"
          >
            <CalendarIcon />
            {date ? (
              format(date, defaultFormat)
            ) : (
              <span className="text-foreground">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} required/>
        </PopoverContent>
      </Popover>
    </Field>
  );
};

export default DateFieldPreviewComp;
