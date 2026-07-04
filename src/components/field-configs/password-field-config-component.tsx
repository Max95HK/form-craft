import type { PasswordFieldConfig } from "@/types";

type PasswordFieldConfigCompProps = {
  config: PasswordFieldConfig;
};

const PasswordFieldConfigComp = ({ config: {} }: PasswordFieldConfigCompProps) => {
  return <div>Password Config</div>;
};

export default PasswordFieldConfigComp;
