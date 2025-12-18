import React from 'react';
import { Outlet } from 'react-router';
import Header from './ui/Header';

function Layout({ user, setUser }) {
  return (
    <>
      <Header user={user} setUser={setUser}/>
      <div style={{ minHeight: '100vh' }}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
