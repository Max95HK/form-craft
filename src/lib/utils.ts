import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { isValid, parse } from "date-fns";

import { FIELD_REGISTRY, FIELD_TYPE, type FieldType } from "@/constants";

import type { DateFormat, FieldConfigUnion } from "@/types";
import { formOptions, type AnyFieldApi } from "@tanstack/react-form";

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
        placeholder: "john.doe@example.com",
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
        format: "dd/MM/yyyy",
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
        placeholder: "••••••••",
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
        placeholder: "Options",
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
  formComponent: React.ComponentType<{
    field: AnyFieldApi;
    config: T;
    isInvalid: boolean;
  }>;
} => {
  return {
    previewComponent: FIELD_REGISTRY[field["type"]].components
      .previewComponent as React.ComponentType<{ config: FieldConfigUnion }>,
    configComponent: FIELD_REGISTRY[field["type"]].components
      .configComponent as React.ComponentType<{ config: FieldConfigUnion }>,
    formComponent: FIELD_REGISTRY[field["type"]].components
      .formComponent as React.ComponentType<{
      field: AnyFieldApi;
      config: T;
      isInvalid: boolean;
    }>,
  };
};

export const getInitialDate = (format: DateFormat, value?: string) => {
  const parsed = value ? parse(value, format, new Date()) : new Date();
  return isValid(parsed) ? parsed : new Date();
};

export const parseDates = (format: DateFormat, values?: string[]) => {
  const parsedValues = values?.map((value) => parse(value, format, new Date()));
  return parsedValues;
};

export const buildFormOpt = (fields: FieldConfigUnion[]) => {
  const defaultValues = fields.reduce(
    (acc, field) => {
      switch (field.type) {
        case FIELD_TYPE.TEXT:
          acc[field.name ?? field.id] = field.defaultValue ?? "";
          return acc;

        case FIELD_TYPE.NUMBER:
          acc[field.name ?? field.id] = field.defaultValue ?? 0;
          return acc;

        case FIELD_TYPE.CHECKBOX: {
          console.log(field.defaultValue);
          acc[field.name ?? field.id] = field.defaultValue ?? false;
          return acc;
        }

        case FIELD_TYPE.DATE:
          acc[field.name ?? field.id] = field.defaultValue ?? new Date();
          return acc;

        case FIELD_TYPE.EMAIL:
          acc[field.name ?? field.id] = field.defaultValue ?? "";
          return acc;

        case FIELD_TYPE.PASSWORD:
          acc[field.name ?? field.id] = field.defaultValue ?? "";
          return acc;

        case FIELD_TYPE.SELECT:
          acc[field.name ?? field.id] = field.isMultiple
            ? (field.defaultValue ?? [])
            : [];
          return acc;

        default:
          throw new Error("Unhandled field type");
      }
    },
    {} as Record<string, unknown>,
  );

  const formOpt = formOptions({ defaultValues });
  return formOpt;
};
