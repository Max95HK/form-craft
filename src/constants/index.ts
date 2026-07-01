import {
  Calendar1Icon,
  CheckCheckIcon,
  ChevronDownIcon,
  HashIcon,
  LockIcon,
  MailIcon,
  TypeIcon,
  type LucideProps,
} from "lucide-react";

import {
  TextFieldPreviewComp,
  CheckboxFieldPreviewComp,
  DateFieldPreviewComp,
  EmailFieldPreviewComp,
  NumberFieldPreviewComp,
  PasswordFieldPreviewComp,
  SelectFieldPreviewComp,
} from "@/components/field-previews";
import {
  TextFieldConfigComp,
  CheckboxFieldConfigComp,
  DateFieldConfigComp,
  EmailFieldConfigComp,
  NumberFieldConfigComp,
  PasswordFieldConfigComp,
  SelectFieldConfigComp,
} from "@/components/field-configs/";

import type { FieldRecord } from "@/types";

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

export const FIELD_REGISTRY: FieldRecord<FieldType> = {
  text: {
    components: {
      previewComponent: TextFieldPreviewComp,
      configComponent: TextFieldConfigComp,
    },
  },
  number: {
    components: {
      previewComponent: NumberFieldPreviewComp,
      configComponent: NumberFieldConfigComp,
    },
  },
  email: {
    components: {
      previewComponent: EmailFieldPreviewComp,
      configComponent: EmailFieldConfigComp,
    },
  },
  password: {
    components: {
      previewComponent: PasswordFieldPreviewComp,
      configComponent: PasswordFieldConfigComp,
    },
  },
  date: {
    components: {
      previewComponent: DateFieldPreviewComp,
      configComponent: DateFieldConfigComp,
    },
  },
  select: {
    components: {
      previewComponent: SelectFieldPreviewComp,
      configComponent: SelectFieldConfigComp,
    },
  },
  checkbox: {
    components: {
      previewComponent: CheckboxFieldPreviewComp,
      configComponent: CheckboxFieldConfigComp,
    },
  },
};
