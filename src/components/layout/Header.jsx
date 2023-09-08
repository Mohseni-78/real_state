"use client";
import Link from "next/link";
import { FiLogIn, FiUser } from "react-icons/fi";
import styles from "@/layout/Header.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Header = () => {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.screenY > 0 ? setScroll(true) : setScroll(false);

    () => {
      setScroll(false);
    };
  }, []);
  const { data } = useSession();
  return (
    <header className={`${styles.header} ${scroll && "sticky top-5"}`}>
      <div>
        <ul>
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/buy-residential">آگهی ها</Link>
          </li>
        </ul>
      </div>
      <div className={styles.login}>
        {data ? (
          <FiUser />
        ) : (
          <Link href="/signup">
            <FiLogIn /> <span>ثبت نام</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
