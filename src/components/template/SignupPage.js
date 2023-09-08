"use client";

import Link from "next/link";
import Loader from "@/module/Loader";
import styles from "@/template/SignupPage.module.css";
import { useFormik } from "formik";
import { userSchema_signup } from "@/schema/validate";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const initialValues = { email: "", password: "", repeatPassword: "" };

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { errors, handleBlur, handleChange, handleSubmit, touched, values } = useFormik({
    initialValues,
    validationSchema: userSchema_signup,
    onSubmit: async (values) => {
      setLoading(true);
      await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.message) {
            toast.success(response.message);
            router.push("/signin");
          }
          response.error && toast.error(response.error);
          setLoading(false);
        });
    },
  });
  return (
    <div className={styles.form}>
      <h4>فرم ثبت نام</h4>
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
        <div className="flex flex-col mb-10 ">
          <label>تکرار رمز عبور:</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={values.repeatPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.repeatPassword && touched.repeatPassword && (
            <span className=" mt-2 text-sm text-red-600">{errors.repeatPassword}</span>
          )}
        </div>
        {loading ? (
          <Loader />
        ) : (
          <button type="submit" onClick={handleSubmit}>
            ثبت نام
          </button>
        )}
      </form>
      <p>
        حساب کاربری دارید؟
        <Link href="/signin">ورود</Link>
      </p>
    </div>
  );
};

export default SignupPage;
