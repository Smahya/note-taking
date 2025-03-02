import React from "react";

import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { nanoid } from "nanoid";
import { ToastContextProvider } from "./Context";
import { ToastNotificationType } from "@/types/utils";
import { cn } from "@/lib/utils";
import CheckCircle from "@/assets/icons/check-circle.svg";
import Close from "@/assets/icons/close.svg";
import { Text } from "../Text";

export function ToastProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [_document, set_document] = React.useState<Document | null>(null);

  React.useEffect(() => {
    set_document(document);
  }, []);

  const [notificationList, setNotificationList] = React.useState<
    {
      message?: string;
      rightSlot: React.ReactNode;
      type: ToastNotificationType;
      id: string;
      ended?: boolean;
      nodeRef?: React.RefObject<HTMLDivElement | null>;
    }[]
  >([
    // {
    //   rightSlot: null,
    //   message: "This is a success toast",
    //   type: "success",
    //   id: nanoid(),
    // },
  ]);

  function removeNotification(id: string) {
    setNotificationList((list) => list.filter((item) => item.id !== id));
  }

  const addMessage = React.useCallback(
    (
      message: string,
      rightSlot?: React.ReactNode,
      type: ToastNotificationType = "success"
    ) => {
      const id = nanoid();
      setNotificationList((list) => [
        ...list,
        { message, rightSlot, type, id, nodeRef: React.createRef() },
      ]);

      setTimeout(() => removeNotification(id), 4000);
    },
    [setNotificationList]
  );

  const variantStyles: Record<ToastNotificationType, string> = {
    success: "bg-white text-neutral-900 dark:text-white dark:bg-neutral-800",
    error: "bg-red-900 text-white",
    info: "bg-yellow-900 text-white",
  };

  const ICON_TYPE: Record<string, React.ReactNode> = {
    success: <CheckCircle className="relative top-1" />,
    error: <CheckCircle className="relative top-1" />,
  };

  return (
    <>
      <ToastContextProvider addMessage={addMessage}>
        {children}
      </ToastContextProvider>

      {_document?.body &&
        createPortal(
          <ul className="fixed z-[1000] grid gap-3 right-6 top-5">
            <LayoutGroup>
              <AnimatePresence>
                {notificationList

                  .filter((item) => !item.ended)

                  .map(({ id, message, rightSlot, type }, index) => (
                    <motion.li
                      layout
                      initial={{ x: "150%" }}
                      animate={{ x: 0 }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.2 },
                      }}
                      transition={{
                        delay: index * 0.05,
                        stiffness: 150,
                        damping: 14,
                        type: "spring",
                      }}
                      className={cn(
                        "grid items-center gap-2",
                        "rounded-[10px]",
                        variantStyles[type]
                      )}
                      key={id}
                    >
                      <div
                        className={cn(
                          "w-[400px] rounded-lg p-2 grid grid-cols-[max-content_1fr_max-content] gap-2.5 border border-neutral-200 dark:border-neutral-800",
                          variantStyles[type]
                        )}
                      >
                        {ICON_TYPE[type]}
                        <div className="flex items-center justify-between gap-2">
                          <Text variant="body1" className="text-sm">
                            {message}
                          </Text>
                          {rightSlot}
                        </div>

                        <Close
                          onClick={() => removeNotification(id)}
                          className="cursor-pointer text-xs text-neutral-500 dark:text-neutral-400"
                        />
                      </div>
                    </motion.li>
                  ))}
              </AnimatePresence>
            </LayoutGroup>
          </ul>,
          _document.body
        )}
    </>
  );
}
