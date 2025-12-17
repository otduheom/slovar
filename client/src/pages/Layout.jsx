import React from "react";
import NavBar from "../widgets/NavBar";
import { Outlet } from "react-router";

export default function Layout({ user, setUser }) {
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Outlet />
    </>
  );
}
