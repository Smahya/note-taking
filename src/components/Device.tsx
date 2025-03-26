import dynamic from "next/dynamic";
import React from "react";

import { useState } from "react";

interface DeviceChildProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export const DeviceProvider = dynamic(
  () =>
    import("@/hooks/useDevice").then((mod) => {
      const DeviceComponent = ({ children }: { children: React.ReactNode }) => {
        const device = mod.default();
        const [isOpen, setIsOpen] = useState<boolean>(device.isMobile);

        const childrenWithProps = React.Children.map(children, (child) => {
          if (React.isValidElement<DeviceChildProps>(child)) {
            return React.cloneElement(child, { isOpen, setIsOpen });
          }
          return child;
        });

        return <>{childrenWithProps}</>;
      };
      return DeviceComponent;
    }),
  { ssr: false }
);
