import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ButtonAccount from './ButtonAccount';
import logo from '@/app/icon.png'; // Ensure the correct path to the logo

const NavBar: React.FC = () => {
  return (
    <div className="bg-base-300 mb-6">
      <nav
        className="container flex items-center justify-between px-8 py-4 mx-auto"
        aria-label="Global"
      >
        {/* Logo and text on the left */}
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-extrabold text-lg"
            title="Simple Connect Dashboard"
          >
            <Image
              src={logo}
              alt="Simple Connect logo"
              className="w-8"
              placeholder="blur"
              priority={true}
              width={32}
              height={32}
            />
            <span>Simple Connect</span>
          </Link>
        </div>

        {/* Links in the center (if needed later) */}
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          {/* Add links here if required */}
        </div>

        {/* Account Button on the right */}
        <div className="flex justify-end">
          <ButtonAccount />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
