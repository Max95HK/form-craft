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
import TextFieldForm from "@/components/field-form/text-field-form";
import NumberFieldForm from "@/components/field-form/number-field-form";
import EmailFieldForm from "@/components/field-form/email-field-form";
import PasswordFieldForm from "@/components/field-form/password-field-form";
import DateFieldForm from "@/components/field-form/date-field-form";
import SelectFieldForm from "@/components/field-form/select-field-form";
import CheckboxFieldForm from "@/components/field-form/checkbox-field-form";

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
      formComponent: TextFieldForm,
    },
  },
  number: {
    components: {
      previewComponent: NumberFieldPreviewComp,
      configComponent: NumberFieldConfigComp,
      formComponent: NumberFieldForm,
    },
  },
  email: {
    components: {
      previewComponent: EmailFieldPreviewComp,
      configComponent: EmailFieldConfigComp,
      formComponent: EmailFieldForm,
    },
  },
  password: {
    components: {
      previewComponent: PasswordFieldPreviewComp,
      configComponent: PasswordFieldConfigComp,
      formComponent: PasswordFieldForm,
    },
  },
  date: {
    components: {
      previewComponent: DateFieldPreviewComp,
      configComponent: DateFieldConfigComp,
      formComponent: DateFieldForm,
    },
  },
  select: {
    components: {
      previewComponent: SelectFieldPreviewComp,
      configComponent: SelectFieldConfigComp,
      formComponent: SelectFieldForm,
    },
  },
  checkbox: {
    components: {
      previewComponent: CheckboxFieldPreviewComp,
      configComponent: CheckboxFieldConfigComp,
      formComponent: CheckboxFieldForm,
    },
  },
};
