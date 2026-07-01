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

import TextFieldPreviewComp from "@/components/field-previews/text-field-preview-component";
import TextFieldConfigComp from "@/components/field-configs/text-field-config-component";

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
};
