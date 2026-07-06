import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { DateFieldConfig } from "@/types";
import type { AnyFieldApi } from "@tanstack/react-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";

type DateFieldFormProps = {
  field: AnyFieldApi;
  config: DateFieldConfig;
  isInvalid: boolean;
};

const DateFieldForm = ({
  field,
  config: { format: defaultFormat },
  isInvalid,
}: DateFieldFormProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={field.name}
          variant="secondary"
          data-invalid={!isInvalid}
          data-empty={!field.state.value}
          className={cn(
            "w-70 justify-start text-left font-normal data-[empty=true]:text-foreground bg-secondary/80 hover:bg-secondary flex-1",
          )}
        >
          <CalendarIcon className="text-foreground" />
          {field.state.value ? (
            <span className="text-foreground">
              {format(field.state.value, defaultFormat)}
            </span>
          ) : (
            <span className="text-foreground">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.state.value}
          onSelect={(value) => field.handleChange(value)}
          onDayBlur={field.handleBlur}
          required
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateFieldForm;
