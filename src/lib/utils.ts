import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { type FieldType, FIELD_TYPE } from "@/constants";

import type { FieldUnion } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const buildField = (type: FieldType, id: string): FieldUnion => {
  switch (type) {
    case FIELD_TYPE.TEXT:
      return {
        type,
        id,
        label: "",
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
        label: "",
        validation: {
          required: false,
        },
      };

    case FIELD_TYPE.EMAIL:
      return {
        type,
        id,
        defaultValue: "",
        label: "",
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
        label: "",
        validation: {
          required: false,
        },
      };

    case FIELD_TYPE.PASSWORD:
      return {
        type,
        id,
        defaultValue: "",
        label: "",
        validation: {
          required: false,
        },
      };

    case FIELD_TYPE.SELECT:
      return {
        type,
        id,
        label: "",
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
        label: "",
        defaultValue: false,
        validation: {
          required: false,
        },
      };

    default:
      throw new Error(`Unhandled type: ${type satisfies never}`);
  }
};
