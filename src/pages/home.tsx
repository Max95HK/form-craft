import { useState } from "react";

import { useAppSelector } from "@/hooks/use-app-selector";

import { selectFields } from "@/store/slices/form-builder-slice";

import { Button } from "@/components/ui/button";
import AnimatedCard from "@/components/animated-card";
import EmptyState from "@/components/empty-state";
import SortableField from "@/components/sortable-field";
import FieldConfigSheet from "@/components/field-config-sheet";
import Form from "@/components/form";

import { extractFieldComponents } from "@/lib/utils";

const Home = () => {
  // States
  const [isOpen, setIsOpen] = useState(false);

  // Hooks
  const fields = useAppSelector(selectFields);

  return (
    <>
      {fields.length === 0 ? (
        <AnimatedCard className="flex h-full items-center justify-center">
          <EmptyState />
        </AnimatedCard>
      ) : (
        <AnimatedCard className="p-4 flex flex-col h-full">
          <div className="flex flex-col gap-4 overflow-y-auto flex-1 p-4">
            {fields.map((field, index) => {
              const PreviewComp =
                extractFieldComponents(field).previewComponent;
              return (
                <SortableField key={field.id} index={index} id={field.id}>
                  <PreviewComp config={field} />
                </SortableField>
              );
            })}
          </div>

          <div className="self-end mt-4">
            <Button onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}>
              Create Form
            </Button>
          </div>
        </AnimatedCard>
      )}

      <Form isOpen={isOpen} setIsOpen={setIsOpen} />

      <FieldConfigSheet />
    </>
  );
};

export default Home;
