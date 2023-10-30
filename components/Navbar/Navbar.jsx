import Image from "next/image";
import Link from "next/link";
import LogOutBtn from "@/components/LogOutBtn/LogOutBtn";

function Navbar() {
  return (
    <>
      <nav className="w-full bg-black fixed top-0 left-0 right-0 z-10">
        <div className="text-white">Image</div>
        <div className="text-white"> Household Name</div>
        <div className="text-white">Logout</div>
        <LogOutBtn />
      </nav>
    </>
  );
}

export default Navbar;
