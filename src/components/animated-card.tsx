import { useEffect } from "react";
import {
  motion,
  animate,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";

import { useAppSelector } from "@/hooks/use-app-selector";
import { selectDnd } from "@/store/slices/dnd-slice";

import { cn } from "@/lib/utils";

const AnimatedCard = ({ children, className }: React.ComponentProps<"div">) => {
  // Hooks
  const dndState = useAppSelector(selectDnd);
  const turn = useMotionValue(0);

  // Derived states
  const isSidebarDrag = dndState.active && dndState.source === "sidebar";

  useEffect(() => {
    if (!isSidebarDrag) return;

    const controls = animate(turn, turn.get() + 1, {
      ease: "linear",
      duration: 4,
      repeat: Infinity,
    });

    return () => controls.stop();
  }, [turn, isSidebarDrag]);

  const gradient = useMotionTemplate`conic-gradient(from ${turn}turn, transparent 0%, oklch(0.6756 0.0947 182.68 / 0) 5%, oklch(0.6756 0.0947 182.68) 10%, oklch(0.58 0.11 184) 18%, oklch(0.50 0.10 186) 26%, oklch(0.42 0.08 182) 34%, oklch(0.55 0.10 179) 42%, oklch(0.74 0.09 181) 46%, oklch(0.74 0.09 181 / 0) 52%, transparent 56%)`;

  return (
    <div className="w-[min(90%,30rem)] aspect-square rounded-3xl p-0.5 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isSidebarDrag ? 1 : 0 }}
        className="absolute inset-0 rounded-[inherit]"
        style={{ backgroundImage: gradient }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isSidebarDrag ? 1 : 0 }}
        className="absolute inset-0 rounded-[inherit] blur-xs"
        style={{ backgroundImage: gradient }}
      />
      <div className="bg-light-background size-full rounded-[inherit] relative overflow-y-auto scrollbar-custom">
        <div className={cn("relative", className)}>{children}</div>
      </div>
    </div>
  );
};

export default AnimatedCard;
