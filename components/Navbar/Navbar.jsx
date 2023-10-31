"use client"

import LogOutBtn from "../LogOutBtn/LogOutBtn";
import style from "./Navbar.module.css"
// import Image from "next/image";
import { useSession } from "next-auth/react";

function Navbar() {
// const session = useSession()
  return (
      <nav className={style.nav}> 
          <div className={style.logo}>Image</div> 
          <div className={style.end}>
          <div> Household Name</div>
        <button className={style.button}>
          LogOut
          <LogOutBtn />
        </button>
        </div>
      </nav>
  );
}

export default Navbar;
