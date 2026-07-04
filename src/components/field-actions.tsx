import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { selectId } from "@/store/slices/selected-id-slice";
import { removeField } from "@/store/slices/form-builder-slice";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SortableHanlde from "@/components/sortable-handle";

import { MousePointerClickIcon, XIcon } from "lucide-react";

type FieldActionsProps = {
  id: string;
};

const FieldActions = ({ id }: FieldActionsProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <SortableHanlde />
        </TooltipTrigger>
        <TooltipContent>Order Field</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            onClick={() => dispatch(selectId({ id }))}
            className="border-secondary"
          >
            <MousePointerClickIcon className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Select Field</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            onClick={() => dispatch(removeField({ id }))}
            className="border-secondary"
          >
            <XIcon className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Remove Field</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default FieldActions;
