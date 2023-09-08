import DashboardSidebar from "@/layout/DashboardSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  !session && redirect("/signin");
  return <DashboardSidebar>{children}</DashboardSidebar>;
}
