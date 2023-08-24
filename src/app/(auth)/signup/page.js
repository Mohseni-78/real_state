import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signup from "@/template/SignupPage";
const SignupPage = async () => {
  const session = await getServerSession(authOptions);
  session && redirect("/");
  return <Signup />;
};

export default SignupPage;
