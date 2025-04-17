import dynamic from "next/dynamic";
import React from "react";

interface DeviceChildProps {
  isMobile?: boolean;
}

export const DeviceProvider = dynamic(
  () =>
    import("@/hooks/useDevice").then((mod) => {
      const DeviceComponent = ({ children }: { children: React.ReactNode }) => {
        const isMobile = mod.default()?.isMobile;

        const childrenWithProps = React.Children.map(children, (child) => {
          if (React.isValidElement<DeviceChildProps>(child)) {
            return React.cloneElement(child, { isMobile });
          }
          return child;
        });

        return <>{childrenWithProps}</>;
      };
      return DeviceComponent;
    }),
  { ssr: false }
);
