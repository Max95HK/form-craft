type TextFieldConfig = {
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

type NumberFieldConfig = {
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

type SelectFieldConfig =
  | {
      type: "select";
      id: string;
      isMultiple: false;
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
      isMultiple: true;
      defaultValue?: string[];
      options: Array<{ value: string; label: string }>;
      validation: {
        required: boolean;
      };
    };

type CheckboxFieldConfig = {
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

type DateFieldConfig = {
  type: "date";
  id: string;
  defaultValue?: string;
  label: string;
  format: "YYYY-MM-DD" | "DD/MM/YYYY" | "MM/DD/YYYY" | "ISO";
  allowedDates?: string[];
  disabledDates?: string[];
  validation: {
    required: boolean;
    minDate?: string;
    maxDate?: string;
  };
};

type EmailFieldConfig = {
  type: "email";
  id: string;
  defaultValue?: string;
  label: string;
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

type PasswordFieldConfig = {
  type: "password";
  id: string;
  defaultValue?: string;
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

export type FieldUnion =
  | TextFieldConfig
  | NumberFieldConfig
  | EmailFieldConfig
  | PasswordFieldConfig
  | DateFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig;

export type FieldDescriptor<T extends FieldUnion> = {
  components: {
    previewComponent: React.ComponentType<{ config: T }>;
    configComponent: React.ComponentType<{
      config: T;
    }>;
  };
};

export type PartialExceptMany<T, K extends keyof T> = Partial<Omit<T, K>> &
  Pick<T, K>;

type PatchText = PartialExceptMany<TextFieldConfig, "id" | "type">;
type PatchNumber = PartialExceptMany<NumberFieldConfig, "id" | "type">;
type PatchEmail = PartialExceptMany<EmailFieldConfig, "id" | "type">;
type PatchPassword = PartialExceptMany<PasswordFieldConfig, "id" | "type">;
type PatchDate = PartialExceptMany<DateFieldConfig, "id" | "type">;
type PatchSelect = PartialExceptMany<SelectFieldConfig, "id" | "type">;
type PatchCheckbox = PartialExceptMany<CheckboxFieldConfig, "id" | "type">;

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
      source: "palette" | "canvas";
    }
  | {
      active: false;
    };
