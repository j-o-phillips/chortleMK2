import LogOutBtn from "../LogOutBtn/LogOutBtn";
import style from "./Navbar.module.css"

function Navbar() {
  return (
      <nav className={style.nav}>
        <div>
          <div>Image</div>
          <div > Household Name</div>
        </div>
        <div>
          <LogOutBtn />
        </div>
      </nav>
  );
}

export default Navbar;
