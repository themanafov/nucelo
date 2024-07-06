"use client";

import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import useNavigation from "@/hooks/use-navigation";

export default function CommandMenuToggle() {
  const setOpen = useNavigation((state) => state.setOpen);
  return (
    <Button
      size="icon"
      onClick={() => setOpen(true)}
      aria-label="Navigation"
      variant="secondary"
    >
      <Icons.command size={15} />
    </Button>
  );
}
