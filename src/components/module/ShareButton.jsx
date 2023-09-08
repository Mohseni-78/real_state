"use client";

import { useEffect, useState } from "react";
import { LuShare2 } from "react-icons/lu";
import styles from "@/module/ShareButton.module.css";
import toast from "react-hot-toast";

function ShareButton() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  const copyHandler = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(url);
    toast("کپی شد");
  };

  return (
    <div className={styles.container} onClick={copyHandler}>
      <LuShare2 />
      <button>اشتراک گذاری</button>
    </div>
  );
}

export default ShareButton;
