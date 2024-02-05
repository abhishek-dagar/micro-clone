"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Button } from "@/components/ui/button";
import Hint from "@/components/hint";
import { BringToFrontIcon, SendToBackIcon, Trash2Icon } from "lucide-react";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayersIds = storage.get("layerIds");
        const indices = [];

        const arr = liveLayersIds.toImmutable();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          const index = indices[i];
          liveLayersIds.move(index, i);
        }
      },
      [selection]
    );
    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayersIds = storage.get("layerIds");
        const indices = [];

        const arr = liveLayersIds.toImmutable();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = indices.length - 1; i == 0; i--) {
          const index = indices[i];
          liveLayersIds.move(index, arr.length - 1 - (indices.length - 1 - i));
        }
      },
      [selection]
    );

    const deleteLayers = useDeleteLayers();

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);
        selection.forEach((layerId) => {
          liveLayers.get(layerId)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) return null;

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;
    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
        }}
      >
        <ColorPicker onChange={setFill} />
        <div className="flex flex-col gap-y-0.5">
          <Hint label="Bring to front">
            <Button variant={"board"} size={"icon"} onClick={moveToFront}>
              <BringToFrontIcon />
            </Button>
          </Hint>
          <Hint label="Send to back" side="bottom">
            <Button variant={"board"} size={"icon"} onClick={moveToBack}>
              <SendToBackIcon />
            </Button>
          </Hint>
        </div>
        <div className="flex items-center ml-2 pl-2 border-l \ border-neutral-200">
          <Hint label="Delete">
            <Button variant={"board"} size={"icon"} onClick={deleteLayers}>
              <Trash2Icon />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";