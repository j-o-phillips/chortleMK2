"use client";

import { useContext, useEffect } from "react";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import style from "./Navbar.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { UserContext } from "@/context/UserContext";

function Navbar() {
  const session = useSession();
  const { user } = useContext(UserContext);

  useEffect(() => {
  }, [user]);

  return (
    <nav className={style.nav}>
      <div className={style.logo}>
      </div>
      <div className={style.end}>
        <div>{user}</div>
          <LogOutBtn />
      </div>
    </nav>
  );
}

export default Navbar;
