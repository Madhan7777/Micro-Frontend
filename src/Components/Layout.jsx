// Layout.js
import React from 'react';
import UserNavbar from './UserNavbar'; // Import your navbar component

const Layout = ({ children }) => {
  return (
    <div>
      <UserNavbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
