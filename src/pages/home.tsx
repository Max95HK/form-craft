import { useAppSelector } from "@/hooks/use-app-selector";

import { selectFields } from "@/store/slices/form-builder-slice";

import AnimatedCard from "@/components/animated-card";
import EmptyState from "@/components/empty-state";

const Home = () => {
  const fields = useAppSelector(selectFields);

  return (
    <>
      {fields.length === 0 ? (
        <AnimatedCard className="flex h-full items-center justify-center">
          <EmptyState />
        </AnimatedCard>
      ) : (
        <AnimatedCard>
          {fields.map((field) => (
            <div key={field.id}>{field.type}</div>
          ))}
        </AnimatedCard>
      )}
    </>
  );
};

export default Home;
