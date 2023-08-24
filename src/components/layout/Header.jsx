"use client";
import Link from "next/link";
import { FiLogIn, FiUser } from "react-icons/fi";
import styles from "@/layout/Header.module.css";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data } = useSession();
  return (
    <header className={styles.header}>
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
