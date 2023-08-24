"use client";

import Link from "next/link";
import Loader from "@/module/Loader";
import styles from "@/template/Signup.module.css";
import { useFormik } from "formik";
import { userSchema_signin } from "@/schema/validate";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const initialValues = { email: "", password: "" };

const SigninPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { errors, handleBlur, handleChange, handleSubmit, touched, values } = useFormik({
    initialValues,
    validationSchema: userSchema_signin,
    onSubmit: async (values) => {
      setLoading(true);
      const response = await signIn("credentials", { ...values, redirect: false });
      setLoading(false);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("welcome");
        router.push("/");
      }
    },
  });
  return (
    <div className={styles.form}>
      <h4>فرم ورود</h4>
      <form>
        <div className="flex flex-col mb-10 ">
          <label>ایمیل:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <span className=" mt-2 text-sm text-red-600">{errors.email}</span>
          )}
        </div>
        <div className="flex flex-col mb-10 ">
          <label>رمز عبور:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <span className=" mt-2 text-sm text-red-600">{errors.password}</span>
          )}
        </div>
        {loading ? (
          <Loader />
        ) : (
          <button type="submit" onClick={handleSubmit}>
            ورود
          </button>
        )}
      </form>
      <p>
        حساب کاربری ندارید؟
        <Link href="/signup">ثبت نام کنید</Link>
      </p>
    </div>
  );
};

export default SigninPage;
