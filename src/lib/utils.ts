import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { isValid, parse } from "date-fns";

import { FIELD_REGISTRY, FIELD_TYPE, type FieldType } from "@/constants";

import type { DateFormat, FieldConfigUnion } from "@/types";

import { formOptions, type AnyFieldApi } from "@tanstack/react-form";

import { z } from "zod";

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
      const { type } = field;
      switch (type) {
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
          throw new Error(`Unhandled type: ${type satisfies never}`);
      }
    },
    {} as Record<string, unknown>,
  );

  const formOpt = formOptions({ defaultValues });
  return formOpt;
};

export const buildZodSchema = (fields: FieldConfigUnion[]) => {
  const fieldSchema = fields.reduce(
    (acc, field) => {
      const { type, name, id } = field;
      const key = name ?? id;

      switch (type) {
        case FIELD_TYPE.TEXT: {
          const {
            validation: { required, maxLength, minLength },
          } = field;
          let schema: z.ZodString | z.ZodOptional<z.ZodString> = z.string();

          if (minLength) {
            schema = schema.min(
              minLength,
              `${key} must be at least ${minLength} char long.`,
            );
          }
          if (maxLength) {
            schema = schema.max(
              maxLength,
              `${key} must be at most ${maxLength} char long.`,
            );
          }

          if (required) {
            schema = schema.min(1, `${key} is required.`);
          }

          acc[key] = schema;
          return acc;
        }

        case FIELD_TYPE.NUMBER: {
          const {
            validation: { required, max, min },
          } = field;
          let schema: z.ZodNumber | z.ZodOptional<z.ZodNumber> = z.number();

          if (min) {
            schema = schema.min(
              min,
              `${key} must have at least ${min} digit${min > 1 ? "s" : ""}.`,
            );
          }
          if (max) {
            schema = schema.max(max, `${key} must be at most ${max} digits.`);
          }

          if (!required) {
            schema = schema.optional();
          }

          acc[key] = schema;
          return acc;
        }

        case FIELD_TYPE.EMAIL: {
          const {
            validation: { required, maxLength, minLength },
          } = field;
          let schema: z.ZodString | z.ZodOptional<z.ZodString> = z.string();

          if (minLength) {
            schema = schema.min(
              minLength,
              `${key} must be at least ${minLength} char long.`,
            );
          }
          if (maxLength) {
            schema = schema.max(
              maxLength,
              `${key} must be at most ${maxLength} char long.`,
            );
          }

          if (!required) {
            schema = schema.optional();
          }

          acc[key] = schema;
          return acc;
        }

        case FIELD_TYPE.PASSWORD: {
          const {
            validation: {
              required,
              maxLength,
              minLength,
              requireLowercase,
              requireNumber,
              requireSymbol,
              requireUppercase,
              pattern,
              messages,
            },
          } = field;
          let schema: z.ZodString | z.ZodOptional<z.ZodString> = z.string();

          if (minLength) {
            schema = schema.min(
              minLength,
              `${key} must be at least ${minLength} char long.`,
            );
          }
          if (maxLength) {
            schema = schema.max(
              maxLength,
              `${key} must be at most ${maxLength} char long.`,
            );
          }
          if (requireLowercase) {
            schema = schema.refine(
              (val) => /[a-z]/.test(val),
              `${key} must contains at least a lowercase letter.`,
            );
          }
          if (requireUppercase) {
            schema = schema.refine(
              (val) => /[A-Z]/.test(val),
              `${key} must contains at least a uppercase letter.`,
            );
          }
          if (requireNumber) {
            schema = schema.refine(
              (val) => /[0-9]/.test(val),
              `${key} must contains at least a number.`,
            );
          }
          if (requireSymbol) {
            schema = schema.refine(
              (val) => /[^A-Za-z0-9]/.test(val),
              `${key} must contains at least a symbol.`,
            );
          }
          if (pattern) {
            schema = schema.regex(pattern, messages?.pattern);
          }

          if (!required) {
            schema = schema.optional();
          }

          acc[key] = schema;
          return acc;
        }

        case FIELD_TYPE.SELECT: {
          const {
            validation: { required },
            options,
          } = field;

          const optionsValues = options.map((option) => option.value);

          let schema: z.ZodEnum | z.ZodOptional<z.ZodEnum> =
            z.enum(optionsValues);

          if (!required) {
            schema = schema.optional();
          }

          acc[key] = schema;
          return acc;
        }

        case FIELD_TYPE.DATE: {
          const {
            validation: { required },
          } = field;
          let schema: z.ZodDate | z.ZodOptional<z.ZodDate> = z.date();

          if (!required) {
            schema = schema.optional();
          }

          acc[key] = schema;
          return acc;
        }

        case FIELD_TYPE.CHECKBOX: {
          const {
            validation: { required },
          } = field;
          let schema: z.ZodBoolean | z.ZodOptional<z.ZodBoolean> = z.boolean();

          if (!required) {
            schema = schema.optional();
          }

          acc[key] = schema;
          return acc;
        }

        default:
          throw new Error(`Unhandled type: ${type satisfies never}`);
      }
    },
    {} as Record<string, z.ZodType>,
  );

  return z.object(fieldSchema);
};
