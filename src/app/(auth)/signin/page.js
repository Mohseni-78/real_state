import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signin from "@/template/SigninPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SigninPage = async () => {
  const session = await getServerSession(authOptions);
  session && redirect("/");
  return <Signin />;
};

export default SigninPage;
