import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import DashboardPage from "@/template/DashboardPage";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const {
    user: { email },
  } = await getServerSession(authOptions);
  const UserInfo = await User.findOne({ email: email });

  return <DashboardPage createdAt={UserInfo.createdAt} />;
};

export default Dashboard;
