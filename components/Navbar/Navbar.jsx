"use client"

import LogOutBtn from "../LogOutBtn/LogOutBtn";
import style from "./Navbar.module.css"
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";


function Navbar() {
  const user = useContext(UserContext)

  if (!user) {
    return null
  }
  
  console.log(user)
  
    return (
      <nav className={style.nav}> 
          <div className={style.logo}>Image</div> 
          {/* <Image src={user.image} height={10} width={10} alt="profile pic"></Image> */}
          <p>{user.name}</p>
          <div></div>
          <div className={style.end}>
            <div> Household Name</div>
            {/* logout button only appear if you are logged in */}
            <LogOutBtn />
        </div>
      </nav>
  );
}

export default Navbar;
