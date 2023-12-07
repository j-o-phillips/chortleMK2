"use client";

import LogOutBtn from "../LogOutBtn/LogOutBtn";
import style from "./Navbar.module.css";
import Image from "next/image";
import { useState } from "react";

import { useSession } from "next-auth/react";

function Navbar() {
  const session = useSession();
  const [showUserName, setShowUserName] = useState(false);

  const toggleUserName = () => {
    setShowUserName(!showUserName);
  };

  return (
    <nav className={style.nav}>
      <div className={style.hello} width="auto">
        Choretle
      </div>
      {session.status === "authenticated" && (
        <div className={style.end}>
          {showUserName && (
            <h4 className={style.userName}>{session.data.user.name}</h4>
          )}
          <img
            onClick={toggleUserName}
            src={session.data.user.image}
            alt="image"
            className={style.image}
          />
          <LogOutBtn />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
