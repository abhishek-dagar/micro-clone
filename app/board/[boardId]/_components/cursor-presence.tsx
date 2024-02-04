"use client";

import { useOthersConnectionIds } from "@/liveblocks.config";
import { memo } from "react";
import { Cursor } from "./cursor";

export const CursorPresence = memo(() => {
  const Cursors = () => {
    const ids = useOthersConnectionIds();
    return (
      <>
        {ids.map((connectionId) => (
          <Cursor key={connectionId} connectionId={connectionId} />
        ))}
      </>
    );
  };
  return (
    <>
      <Cursors />
    </>
  );
});
CursorPresence.displayName = "CursorPresence";
