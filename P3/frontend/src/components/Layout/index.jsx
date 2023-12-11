// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import './layout.css';
// import footer
import Footer from '../Footer';
import LoggedInHeader from '../LoggedInHeader/logged_in_header';

function Layout() {

  return (
    <div className="bg-color-baby-blue-3"
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <LoggedInHeader />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
