import React from 'react';
import Link from 'next/link';
import ButtonAccount from './ButtonAccount';

const NavBar: React.FC = () => {
  return (
    <div className="bg-base-300 mb-6">
      <nav
        className="container flex items-center justify-between px-8 py-4 mx-auto"
        aria-label="Global"
      >
        {/* Logo on the left */}
        <div className="flex flex-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-primary font-extrabold text-lg"
            title="Simple Connect Dashboard"
          >
            Simple Connect
          </Link>
        </div>

        {/* Links in the center (if needed later) */}
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          {/* Add links here if required */}
        </div>

        {/* Account Button on the right */}
        <div className="flex flex-1 justify-end">
          <ButtonAccount />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
