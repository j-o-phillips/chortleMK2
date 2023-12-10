"use client";
import { signIn } from "next-auth/react";

function LoginBtn() {
  function handleLogin() {
    signIn("google");
  }
  return (
    <div>
      <button className="button" onClick={handleLogin}>
        Login with Google
      </button>
    </div>
  );
}

export default LoginBtn;
