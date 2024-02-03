import {
  DropdownMenuContentProps,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Link2Icon, PencilIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import useApiMutation from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import ConfirmModel from "./confirm-model";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {
  const { mutate, pending } = useApiMutation(api.board.remove);
  const { onOpen } = useRenameModal();

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete board"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
          <Link2Icon className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className="p-3 cursor-pointer"
        >
          <PencilIcon className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <ConfirmModel
          header="Delete Board?"
          description="This will delete the board an all it's content"
          onConfirm={onDelete}
        >
          <Button
            variant={"ghost"}
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
          >
            <Trash2Icon className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </ConfirmModel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
