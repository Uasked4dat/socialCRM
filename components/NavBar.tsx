import React from 'react';
import Link from 'next/link';
import ButtonAccount from './ButtonAccount';

const NavBar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg rounded-lg mt-6 mb-4">
      <div className="navbar-start">
        <Link href="/dashboard" className="btn btn-ghost normal-case text-2xl text-primary">
          Simple Connect
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* Add any center-aligned items here */}
      </div>
      <div className="navbar-end">
        <ButtonAccount />
      </div>
    </div>
  );
};

export default NavBar;
