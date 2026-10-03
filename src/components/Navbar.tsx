import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

type HeaderProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export default function Header({
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeMenu = () => {
  setMenuOpen(false);
};

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#26332B]/10 bg-[#F8F6F0]/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:h-24 sm:px-6 lg:px-10">

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <nav className="hidden items-center gap-8 lg:flex">
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

        {/* =================================================
            BRAND
        ================================================== */}

        <Link
          href="/"
          onClick={closeMenu}
          className="lg:absolute lg:left-1/2 lg:top-4 lg:-translate-x-1/2"
        >
          <div className="font-serif text-3xl font-semibold tracking-[0.14em] text-[#26332B] sm:text-4xl lg:text-[42px] lg:tracking-[0.18em]">
            SKINORA
          </div>

          <div className="mt-0.5 text-[7px] font-medium uppercase tracking-[0.25em] text-[#6F8F72] sm:text-[9px] sm:tracking-[0.32em] lg:mt-1">
            Your Everyday Skin Ritual
          </div>
        </Link>

        {/* =================================================
            ACTIONS
        ================================================== */}

        <div className="ml-auto flex items-center gap-2 sm:gap-3">

  {/* Search */}

{searchOpen ? (
  <div className="flex items-center gap-2">
    <input
      type="text"
      autoFocus
      value={searchQuery}
      onChange={(e) => {
  const value = e.target.value;
  setSearchQuery(value);

  document
    .getElementById("products")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
}}
      placeholder="Search products..."
      className="h-10 w-40 rounded-full border border-[#26332B]/20 bg-transparent px-4 text-sm text-[#26332B] outline-none placeholder:text-[#26332B]/40 focus:border-[#26332B] sm:h-11 sm:w-52"
    />

    <button
      type="button"
      aria-label="Close Search"
      onClick={() => {
        setSearchOpen(false);
        setSearchQuery("");
      }}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#26332B]/20 text-[#26332B] transition hover:border-[#26332B] hover:bg-[#26332B] hover:text-[#F8F6F0] sm:h-11 sm:w-11"
    >
      <X size={18} strokeWidth={1.8} />
    </button>
  </div>
) : (
  <button
    type="button"
    aria-label="Search"
    onClick={() => {
      setSearchOpen(true);
    }}
    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#26332B]/20 text-[#26332B] transition hover:border-[#26332B] hover:bg-[#26332B] hover:text-[#F8F6F0] sm:h-11 sm:w-11"
  >
    <Search
      size={18}
      strokeWidth={1.8}
    />
  </button>
)}

          {/* Cart */}

          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#26332B]/20 text-[#26332B] transition hover:border-[#26332B] hover:bg-[#26332B] hover:text-[#F8F6F0] sm:h-11 sm:w-11"
          >
            <ShoppingBag
              size={18}
              strokeWidth={1.8}
            />
          </Link>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#26332B]/20 text-[#26332B] transition hover:border-[#26332B] hover:bg-[#26332B] hover:text-[#F8F6F0] lg:hidden sm:h-11 sm:w-11"
          >
            {menuOpen ? (
              <X
                size={19}
                strokeWidth={1.8}
              />
            ) : (
              <Menu
                size={19}
                strokeWidth={1.8}
              />
            )}
          </button>
        </div>
      </div>

      {/* =================================================
          MOBILE MENU
      ================================================== */}

      {menuOpen && (
        <div className="border-t border-[#26332B]/10 bg-[#F8F6F0]/98 px-5 py-5 shadow-lg backdrop-blur-md lg:hidden">
          <nav className="flex flex-col">

            <a
              href="#about"
              onClick={closeMenu}
              className="border-b border-[#26332B]/10 py-4 text-sm font-medium text-[#26332B] transition hover:text-[#6F8F72]"
            >
              About Us
            </a>

            <a
              href="#categories"
              onClick={closeMenu}
              className="border-b border-[#26332B]/10 py-4 text-sm font-medium text-[#26332B] transition hover:text-[#6F8F72]"
            >
              Categories
            </a>

            <a
              href="#products"
              onClick={closeMenu}
              className="border-b border-[#26332B]/10 py-4 text-sm font-medium text-[#26332B] transition hover:text-[#6F8F72]"
            >
              Products
            </a>

            <a
              href="#routine"
              onClick={closeMenu}
              className="py-4 text-sm font-medium text-[#26332B] transition hover:text-[#6F8F72]"
            >
              Our Routine
            </a>

          </nav>
        </div>
      )}
    </header>
  );
}