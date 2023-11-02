"use client";
import style from "./SideBar.module.css";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

function SideBar() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user && (
          <div className={style.sidebar}>
            <div className={style.icons}>
              <Link href={`/${user.households[0]}`}>
                <NavItem icon="🏠" label="My Household" />
              </Link>
              <Link
                style={{ display: "block" }}
                href={`/${user.households[0]}/members`}
              >
                <NavItem icon="👤" label="Edit Household" />
              </Link>
              <Link
                style={{ display: "block" }}
                href={`/${user.households[0]}/createChore`}
              >
                <NavItem icon="🧹" label="Create Chore" />
              </Link>
              <Link
                style={{ display: "block" }}
                href={`/${user.households[0]}/allChores`}
              >
                <NavItem icon="☑️" label="See all chores" />
              </Link>

              {/* <button
                style={{ display: "block" }}
                onClick={() => {
                  console.log(user);
                }}
              >
                Print
              </button> */}
            </div>
            <div className={style.copyright}>&copy; 2023 Chores App</div>
            <div className={style.design}>
              <p>Designed by:</p>
              <p>Hairdynamics Team</p>
              <p>(SEI 75)</p>
            </div>
          </div>
      )}
    </>
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
      justifyContent: "center",
    }}
  >
    <span style={{ marginRight: "10px" }}>{icon}</span>
    <span>{label}</span>
  </div>
);

export default SideBar;
