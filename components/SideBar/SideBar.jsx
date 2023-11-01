"use client";
import style from "./SideBar.module.css";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
function SideBar() {
  const { user } = useContext(UserContext);

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        {user && (
          <div className={style.icons}>
            <NavItem icon="🏠" label="Home" />
            <NavItem icon="📊" label="Analytics" />
            <NavItem icon="⚙️" label="Settings" />
            <h1>Welcome, {user ? user.name : 'Guest'}</h1>
      <p>Email: {user ? user.email : 'N/A'}</p>
            <Link href={`/${user.households[0]}/addMember`}>Add Member</Link>
            <button
              onClick={() => {
                console.log(user);
              }}
            >
              Print
            </button>
          </div>
        )}
        <div className={style.copyright}>&copy; 2023 Chores App</div>
      </div>
      <div className={style.content}></div>
    </div>
  );
}

const NavItem = ({ icon, label }) => (
  <div
    style={{
      marginBottom: "10px",
      backgroundColor: "beige",
      borderRadius: "5px",
      padding: "7px",
      display: "flex",
      alignItems: "center",
    }}
  >
    <span style={{ marginRight: "10px" }}>{icon}</span>
    <span>{label}</span>
  </div>
);

export default SideBar;
