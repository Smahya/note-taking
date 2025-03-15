import { Loader } from "./Loader";

export const LoadingWrapper = ({
  children,
  isLoading,
  loaderClassName,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  loaderClassName?: string;
}) => {
  return <>{isLoading ? <Loader className={loaderClassName} /> : children}</>;
};
