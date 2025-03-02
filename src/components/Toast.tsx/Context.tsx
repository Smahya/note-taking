import { ToastNotificationType } from "@/types/utils";
import React from "react";

type ToastContextValue = {
  success: (message: string, rightSlot?: React.ReactNode) => void;
  error: (message: string, rightSlot?: React.ReactNode) => void;
  info: (message: string, rightSlot?: React.ReactNode) => void;
};

export const ToastContext = React.createContext<ToastContextValue>(
  {} as ToastContextValue
);

export function ToastContextProvider({
  children,
  addMessage,
}: React.PropsWithChildren<{
  addMessage: (
    message: string,
    rightSlot?: React.ReactNode,
    type?: ToastNotificationType
  ) => void;
}>) {
  const success = React.useCallback(
    (message: string, rightSlot?: React.ReactNode) =>
      addMessage(message, rightSlot, "success"),
    [addMessage]
  );
  const error = React.useCallback(
    (message: string, rightSlot?: React.ReactNode) =>
      addMessage(message, rightSlot, "error"),
    [addMessage]
  );
  const info = React.useCallback(
    (message: string, rightSlot?: React.ReactNode) =>
      addMessage(message, rightSlot, "info"),
    [addMessage]
  );
  const value = React.useMemo(() => {
    return { success, error, info };
  }, [success, error, info]);
  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
