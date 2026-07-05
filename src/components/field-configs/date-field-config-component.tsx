import type { DateFieldConfig } from "@/types";

type DateFieldConfigCompProps = {
  config: DateFieldConfig;
};

const DateFieldConfigComp = ({
  config: {
    format,
    id,
    label,
    type,
    validation,
    allowedDates,
    defaultValue,
    disabledDates,
  },
}: DateFieldConfigCompProps) => {
  return <div>Date Config</div>;
};

export default DateFieldConfigComp;
