import React from 'react';
import { Outlet } from 'react-router';
import Header from './ui/Header';

function Layout({ user, setUser }) {
  return (
    <>
      <Header user={user} setUser={setUser}/>
      <div className="bg-dk-green pad-t-2 pad-s-1 pad-b-8 mar-b-16 c-white">
        <div className="max-w-700 center">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
