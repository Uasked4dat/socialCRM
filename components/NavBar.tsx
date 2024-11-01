import React from 'react';
import Link from 'next/link';
import ButtonAccount from './ButtonAccount';

const NavBar = () => {
  return (
    <div className="navbar bg-primary-content rounded-lg p-4 mt-6">
      <div className="navbar-start">
        <Link href="/dashboard" className="text-3xl">
          Dashboard
        </Link>
      </div>
      <div className="navbar-center flex-1">
        {/* Placeholder for any center-aligned content */}
      </div>
      <div className="navbar-end">
        <ButtonAccount />
      </div>
    </div>
  );
};

export default NavBar;
