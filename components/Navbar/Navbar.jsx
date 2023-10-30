import LogOutBtn from "../LogOutBtn/LogOutBtn";
import style from "./Navbar.module.css"
import Image from "next/image";
import { useSession } from "next-auth/react";

function Navbar() {
const session = useSession()
  return (
      <nav className={style.nav}>
        <div className="navbar-right">
          <Image width={20} height={20} src="" />
          <div > Household Name </div>
        </div >
        <div className="navbar-right">
          <p>{session.data.user.name}</p>
          <Image width={20} height={20} src={session.data.user.image} />
          <LogOutBtn />
        </div>
      </nav>
  );
}

export default Navbar;
