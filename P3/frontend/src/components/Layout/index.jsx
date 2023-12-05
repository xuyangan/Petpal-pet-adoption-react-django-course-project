// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      {/* Your header component */}
      <header>
        <h1>My Website Header</h1>
      </header>

      {/* Render child routes */}
      <main>
        <Outlet />
      </main>

      {/* Your footer component */}
      <footer>
        <p>&copy; {new Date().getFullYear()} My Website</p>
      </footer>
    </div>
  );
}

export default Layout;
