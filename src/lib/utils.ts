import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { type FieldType, FIELD_REGISTRY, FIELD_TYPE } from "@/constants";

import type { FieldConfigUnion } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const buildField = (type: FieldType, id: string): FieldConfigUnion => {
  switch (type) {
    case FIELD_TYPE.TEXT:
      return {
        type,
        id,
        label: "Text Field",
        defaultValue: "",
        validation: {
          required: false,
        },
      };

    case FIELD_TYPE.NUMBER:
      return {
        type,
        id,
        defaultValue: 0,
        label: "Number Field",
        validation: {
          required: false,
        },
      };

    case FIELD_TYPE.EMAIL:
      return {
        type,
        id,
        defaultValue: "",
        label: "Email Field",
        validation: {
          required: false,
        },
      };

    case FIELD_TYPE.DATE:
      return {
        type,
        id,
        defaultValue: "",
        format: "ISO",
        label: "Date Field",
        validation: {
          required: false,
        },
      };

    case FIELD_TYPE.PASSWORD:
      return {
        type,
        id,
        defaultValue: "",
        label: "Password Field",
        textVisible: false,
        validation: {
          required: false,
        },
      };

    case FIELD_TYPE.SELECT:
      return {
        type,
        id,
        label: "Select Field",
        placeholder: 'Options',
        isMultiple: false,
        defaultValue: "",
        options: [],
        validation: {
          required: false,
        },
      };

    case FIELD_TYPE.CHECKBOX:
      return {
        type,
        id,
        label: "Checkbox Field",
        defaultValue: false,
        validation: {
          required: false,
        },
      };

    default:
      throw new Error(`Unhandled type: ${type satisfies never}`);
  }
};

export const extractFieldComponents = <T extends FieldConfigUnion>(
  field: T,
): {
  previewComponent: React.ComponentType<{ config: FieldConfigUnion }>;
  configComponent: React.ComponentType<{ config: FieldConfigUnion }>;
} => {
  return {
    previewComponent: FIELD_REGISTRY[field["type"]].components
      .previewComponent as React.ComponentType<{ config: FieldConfigUnion }>,
    configComponent: FIELD_REGISTRY[field["type"]].components
      .configComponent as React.ComponentType<{ config: FieldConfigUnion }>,
  };
};
