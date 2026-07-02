import type { EmailFieldConfig } from "@/types";

type EmailFieldConfigCompProps = {
  config: EmailFieldConfig;
};

const EmailFieldConfigComp = ({ config }: EmailFieldConfigCompProps) => {
  return <div>Email Config</div>;
};

export default EmailFieldConfigComp;
