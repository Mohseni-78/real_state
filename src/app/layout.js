// Utils
import { Yekan } from "@/utils/font";
// Css
import "./globals.css";
import Layout from "@/layout/Layout";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "@/providers/NextAuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lan="fa" dir="rtl">
      <body className={Yekan.className}>
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
