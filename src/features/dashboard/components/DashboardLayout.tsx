import { NavbarMobile } from "./NavbarMobile";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <NotesProvider>
    <div className="grid lg:grid-cols-[258px_1fr] grid-rows-[calc(100vh-74px)_74px] lg:grid-rows-[100%] h-screen overflow-hidden">
      <Sidebar className="hidden lg:block" />
      <>{children}</>
      <NavbarMobile />
    </div>
    // </NotesProvider>
  );
}
