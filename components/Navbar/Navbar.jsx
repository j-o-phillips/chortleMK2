import LogOutBtn from "../LogOutBtn/LogOutBtn";
import style from "./Navbar.module.css"

function Navbar() {
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
