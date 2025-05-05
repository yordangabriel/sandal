import { Bandage as Sandal } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 md:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Sandal className="h-5 w-5" />
              <span className="text-lg font-semibold">SandalResale</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium used footwear, meticulously cared for and ready for its next journey.
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:col-span-2 lg:flex-row lg:justify-end lg:gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Shop</h3>
              <Link href="/" className="text-sm text-muted-foreground hover:underline">
                All Products
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:underline">
                Sandals
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:underline">
                Shoes
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Company</h3>
              <Link href="/" className="text-sm text-muted-foreground hover:underline">
                About
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:underline">
                Contact
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:underline">
                Terms
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Connect</h3>
              <Link href="/" className="text-sm text-muted-foreground hover:underline">
                Instagram
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:underline">
                Twitter
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:underline">
                Facebook
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-xs text-muted-foreground">© 2025 SandalResale. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;