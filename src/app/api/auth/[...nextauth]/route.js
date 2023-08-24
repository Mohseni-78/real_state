import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectDB();
        } catch (err) {
          throw new Error("مشکلی در سرور رخ داده است");
        }
        if (!email || !password) throw new Error("لطفا اطلاعات معتبر وارد کنید");
        const existedUser = await User.findOne({ email });
        if (!existedUser) throw new Error("لطفا ابتدا خساب کاربری ایجاد کنید");
        const isValid = await verifyPassword(password, existedUser.password);
        if (!isValid) throw new Error("ایمیل یا رمز عبور اشتباه است");

        return { email };
      },
    }),
  ],
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
