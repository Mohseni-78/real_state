import * as Yup from "yup";

const userSchema_signup = Yup.object({
  email: Yup.string().email("لطفا ایمیل معتبر وارد کنید").required("فیلد اجباری"),
  password: Yup.string().min(3, "کمتر از سه کاراکتر معتبر نمیباشد").required("فیلد اجباری"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "اشتباه است")
    .required("فیلد اجباری"),
});

const userSchema_signin = Yup.object({
  email: Yup.string().email("لطفا ایمیل معتبر وارد کنید").required("فیلد اجباری"),
  password: Yup.string().min(3, "کمتر از سه کاراکتر معتبر نمیباشد").required("فیلد اجباری"),
});
export { userSchema_signin, userSchema_signup };
