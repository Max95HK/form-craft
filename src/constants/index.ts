import {
  TypeIcon,
  HashIcon,
  Calendar1Icon,
  ChevronDownIcon,
  CheckCheckIcon,
  MailIcon,
  LockIcon,
  type LucideProps,
} from "lucide-react";

export const SIDEBAR_ITEMS: {
  type: FieldType;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    type: "text",
    icon: TypeIcon,
  },
  {
    type: "number",
    icon: HashIcon,
  },
  {
    type: "email",
    icon: MailIcon,
  },
  {
    type: "password",
    icon: LockIcon,
  },
  {
    type: "date",
    icon: Calendar1Icon,
  },
  {
    type: "select",
    icon: ChevronDownIcon,
  },
  {
    type: "checkbox",
    icon: CheckCheckIcon,
  },
] as const;

export const FIELD_TYPE = {
  TEXT: "text",
  NUMBER: "number",
  EMAIL: "email",
  PASSWORD: "password",
  DATE: "date",
  SELECT: "select",
  CHECKBOX: "checkbox",
} as const;

export type FieldType = (typeof FIELD_TYPE)[keyof typeof FIELD_TYPE];
