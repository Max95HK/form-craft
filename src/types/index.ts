import type { FieldType } from "@/constants";

export type TextFieldConfig = {
  type: "text";
  id: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  validation: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
  };
};

export type NumberFieldConfig = {
  type: "number";
  id: string;
  label: string;
  defaultValue?: number;
  validation: {
    required: boolean;
    min?: number;
    max?: number;
  };
};

export type SelectFieldConfig =
  | {
      type: "select";
      id: string;
      isMultiple: false;
      placeholder?: string;
      defaultValue?: string;
      label: string;
      options: Array<{ value: string; label: string }>;
      validation: {
        required: boolean;
      };
    }
  | {
      type: "select";
      id: string;
      label: string;
      placeholder?: string;
      isMultiple: true;
      defaultValue?: string[];
      options: Array<{ value: string; label: string }>;
      validation: {
        required: boolean;
      };
    };

export type CheckboxFieldConfig = {
  type: "checkbox";
  id: string;
  label: string;
  helperText?: string;
  defaultValue?: boolean;
  validation: {
    required: boolean;
    mustBeTrueMessage?: string;
  };
};

export type DateFieldConfig = {
  type: "date";
  id: string;
  defaultValue?: string;
  label: string;
  format:
    "P" | "PP" | "PPP" | "PPPP" | "yyyy-MM-dd" | "dd/MM/yyyy" | "MM/dd/yyyy";
  allowedDates?: string[];
  disabledDates?: string[];
  validation: {
    required: boolean;
    minDate?: string;
    maxDate?: string;
  };
};

export type EmailFieldConfig = {
  type: "email";
  id: string;
  defaultValue?: string;
  label: string;
  placeholder?: string;
  normalize?: boolean;
  allowedDomains?: string[]; // es: ["gmail.com"]
  blockedDomains?: string[]; // es: ["yopmail.com"]
  allowedEmails?: string[]; // whitelist
  blockedEmails?: string[];
  validation: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
  };
};

export type PasswordFieldConfig = {
  type: "password";
  id: string;
  defaultValue?: string;
  placeholder?: string;
  label: string;
  textVisible?: boolean;
  validation: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    requireSymbol?: boolean;
    requireNumber?: boolean;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    pattern?: string;
    confirmWith?: string; // id of the field for the match
    confirmPassword?: boolean;

    messages?: {
      minLength?: string;
      maxLength?: string;
      requireSymbol?: string;
      requireNumber?: string;
      requireUppercase?: string;
      requireLowercase?: string;
      pattern?: string;
      confirm?: string;
    };
  };
};

export type FieldConfigUnion =
  | TextFieldConfig
  | NumberFieldConfig
  | EmailFieldConfig
  | PasswordFieldConfig
  | DateFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig;

export type FieldDescriptor<T extends FieldConfigUnion> = {
  components: {
    previewComponent: React.ComponentType<{ config: T }>;
    configComponent: React.ComponentType<{
      config: T;
    }>;
  };
};

export type FieldRecord<K extends FieldType> = {
  [P in K]: FieldDescriptor<Extract<FieldConfigUnion, { type: P }>>;
};

export type PartialExceptMany<T, K extends keyof T> = Partial<Omit<T, K>> &
  Pick<T, K>;

export type PatchText = PartialExceptMany<TextFieldConfig, "id" | "type">;
export type PatchNumber = PartialExceptMany<NumberFieldConfig, "id" | "type">;
export type PatchEmail = PartialExceptMany<EmailFieldConfig, "id" | "type">;
export type PatchPassword = PartialExceptMany<PasswordFieldConfig, "id" | "type">;
export type PatchDate = PartialExceptMany<DateFieldConfig, "id" | "type">;
export type PatchSelect = PartialExceptMany<SelectFieldConfig, "id" | "type">;
export type PatchCheckbox = PartialExceptMany<CheckboxFieldConfig, "id" | "type">;

export type FieldPatch =
  | PatchText
  | PatchNumber
  | PatchEmail
  | PatchPassword
  | PatchDate
  | PatchSelect
  | PatchCheckbox;

export type DndState =
  | {
      active: true;
      activeId: string;
      source: "sidebar" | "builder";
    }
  | {
      active: false;
    };
