import React from 'react';
import Link from 'next/link';
import { Bandage as Sandal } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Header = () => {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Sandal className="h-6 w-6" />
          <span className="text-lg font-semibold">SandalResale</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;