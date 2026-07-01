import { useAppSelector } from "@/hooks/use-app-selector";

import { selectFields } from "@/store/slices/form-builder-slice";

import AnimatedCard from "@/components/animated-card";
import EmptyState from "@/components/empty-state";
import SortableField from "@/components/sortable-field";

import { extractFieldComponents } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Home = () => {
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
              const PreviewComp = extractFieldComponents(field).previewComponent;
              return (
                <SortableField index={index} id={field.id}>
                  <PreviewComp key={field.id} config={field} />
                </SortableField>
              );
            })}
          </div>

          <div className="self-end mt-4">
            <Button>Create Form</Button>
          </div>
        </AnimatedCard>
      )}
    </>
  );
};

export default Home;
