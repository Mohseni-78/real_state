// Utils
import { Yekan } from "@/utils/font";
// Css
import "./globals.css";
import Layout from "@/layout/Layout";

export default function RootLayout({ children }) {
  return (
    <html lan="fa" dir="rtl">
      <body className={Yekan.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
