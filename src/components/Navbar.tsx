'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = ['static', 'dynamic', 'isr', 'limit/10'];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full text-gray-700 bg-white dark:text-gray-200 dark:bg-gray-800">
      <div className="flex flex-col max-w-screen-xl px-4 mx-auto items-center md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="p-4 flex flex-row items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark:text-white"
          >
            Next13 imgallery
          </Link>
        </div>
        <hr className="mb-2 w-full md:hidden h-2" />
        <div className="flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
          {navItems.map((item) => (
            <Link
              key={item}
              className={`uppercase px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 hover:bg-gray-100 ${
                pathname === '/' + item ? 'bg-gray-300' : ''
              }`}
              href={'/' + item}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
