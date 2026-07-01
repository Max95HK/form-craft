import type { TextFieldConfig } from "@/types";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TextFieldPreviewCompProps = {
  config: TextFieldConfig;
};

const TextFieldPreviewComp = ({ config: { label = 'Text Input', id } }: TextFieldPreviewCompProps) => {
  return <div>
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type="text"/>
  </div>;
};

export default TextFieldPreviewComp;
