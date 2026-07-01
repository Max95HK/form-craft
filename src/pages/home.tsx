import { useAppSelector } from "@/hooks/use-app-selector";

import { selectFields } from "@/store/slices/form-builder-slice";

import AnimatedCard from "@/components/animated-card";
import EmptyState from "@/components/empty-state";

import { extractFieldComponents } from "@/lib/utils";

const Home = () => {
  const fields = useAppSelector(selectFields);

  return (
    <>
      {fields.length === 0 ? (
        <AnimatedCard className="flex h-full items-center justify-center">
          <EmptyState />
        </AnimatedCard>
      ) : (
        <AnimatedCard className="p-4 flex flex-col gap-4">
          {fields.map((field) => {
            const PreviewComp = extractFieldComponents(field).previewComponent;
            return <PreviewComp key={field.id} config={field} />;
          })}
        </AnimatedCard>
      )}
    </>
  );
};

export default Home;
