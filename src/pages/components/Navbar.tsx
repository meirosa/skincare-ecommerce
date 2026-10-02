import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#26332B]/10 bg-[#F8F6F0]/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* Navigation */}
        <nav className="flex items-center gap-8">

          <a
            href="#about"
            className="text-[15px] font-medium text-[#26332B] transition hover:text-[#6F8F72]"
          >
            About Us
          </a>

          <a
            href="#categories"
            className="text-[15px] font-medium text-[#26332B] transition hover:text-[#6F8F72]"
          >
            Categories
          </a>

          <a
            href="#products"
            className="text-[15px] font-medium text-[#26332B] transition hover:text-[#6F8F72]"
          >
            Products
          </a>

          <a
            href="#routine"
            className="text-[15px] font-medium text-[#26332B] transition hover:text-[#6F8F72]"
          >
            Our Routine
          </a>

        </nav>

        {/* Brand */}
        <Link
          href="/"
          className="absolute left-1/2 top-4 -translate-x-1/2 text-center"
        >
          <div className="font-serif text-4xl font-semibold tracking-[0.18em] text-[#26332B] md:text-[42px]">
            SKINORA
          </div>

          <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.32em] text-[#6F8F72]">
            Your Everyday Skin Ritual
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#26332B]/20 text-[#26332B] transition hover:border-[#26332B] hover:bg-[#26332B] hover:text-[#F8F6F0]"
          >
            <Search
              size={19}
              strokeWidth={1.8}
            />
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#26332B]/20 text-[#26332B] transition hover:border-[#26332B] hover:bg-[#26332B] hover:text-[#F8F6F0]"
          >
            <ShoppingBag
              size={19}
              strokeWidth={1.8}
            />
          </Link>

        </div>

      </div>
    </header>
  );
}