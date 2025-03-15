import React from "react";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

export const Modal = ({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}) => (
  <AlertDialog.Root open={open} onOpenChange={setOpen}>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-black/50 fixed inset-0 z-50" />
      <AlertDialog.Content
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-50 grid place-content-center"
      >
        <AlertDialog.Title />
        <AlertDialog.Description />

        <div
          onClick={(e) => e.stopPropagation()}
          className="grid bg-white border border-neutral-200 w-[440px] m-auto rounded-lg min-h-40"
        >
          <div>{children}</div>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);
