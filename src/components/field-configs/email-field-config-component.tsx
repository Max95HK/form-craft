import type { EmailFieldConfig } from "@/types";

type EmailFieldConfigCompProps = {
  config: EmailFieldConfig;
};

const EmailFieldConfigComp = ({ config }: EmailFieldConfigCompProps) => {
  return <div>Config</div>;
};

export default EmailFieldConfigComp;
