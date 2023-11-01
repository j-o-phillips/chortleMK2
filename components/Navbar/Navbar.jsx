"use client";

// import { useContext } from "react";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import style from "./Navbar.module.css";

// import { UserContext } from "@/context/UserContext";

// import Image from "next/image";

import { useSession } from "next-auth/react";

function Navbar() {
  // const { user } = useContext(UserContext);
  const session = useSession();


  return (
    <nav className={style.nav}>
      <div className={style.logo}>Image</div>
      {session.status === "authenticated" && (
        <div className={style.end}>
          <h4>{session.data.user.name}</h4>
          <img
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
