import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import { CustomSuspense } from "@/components";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CustomSuspense>
      <DashboardLayout>{children}</DashboardLayout>
    </CustomSuspense>
  );
}
