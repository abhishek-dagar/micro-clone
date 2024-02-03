"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import useApiMutation from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const EmptyBoard = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);
  const onClick = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: "Untitled",
    }).then(id=>{
      toast.success("Board created");
    }).catch(()=>toast.error("Failed to create Board"));
  };
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={"/note.svg"} alt="Empty" height={110} width={110} />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for you organization
      </p>
      <div className="mt-6">
        <Button size="lg" onClick={onClick} disabled={pending}>
          {pending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Create board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoard;
