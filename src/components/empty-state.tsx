import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";

import { RiDragDropFill } from "react-icons/ri";

const EmptyState = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-transparent">
          <RiDragDropFill className="size-6" />
        </EmptyMedia>
        <EmptyTitle>Your Form Is Empty</EmptyTitle>
        <EmptyDescription>
          Drag a field from the sidebar to start creating your form.
        </EmptyDescription>
      </EmptyHeader>
      <p>or</p>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button variant="outline">Import Form</Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyState;
