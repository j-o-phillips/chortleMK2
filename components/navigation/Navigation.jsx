"use client"
import Navbar from './Navbar/Navbar'
import SideBar from './SideBar/SideBar'
import style from './Navigation.module.css'

const Navigation = () => {

    return (
      <>
        <Navbar />
        <SideBar />
        <div className={style.content}></div>
      </>
    );
  };
  
  export default Navigation;