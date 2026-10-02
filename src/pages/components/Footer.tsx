import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#26332B] px-6 pb-8 pt-16 text-[#F8F6F0] lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-[#F8F6F0]/15 pb-12 md:grid-cols-3">
          
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-semibold tracking-[0.18em]"
            >
              SKINORA
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-[#F8F6F0]/55">
              A simple skincare shopping experience to help you discover
              products and build your everyday routine.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[#AFC5AF]">
              Explore
            </p>

            <div className="flex flex-col gap-3 text-sm text-[#F8F6F0]/60">
              <a
                href="#about"
                className="transition hover:text-[#F8F6F0]"
              >
                About Us
              </a>

              <a
                href="#categories"
                className="transition hover:text-[#F8F6F0]"
              >
                Categories
              </a>

              <a
                href="#products"
                className="transition hover:text-[#F8F6F0]"
              >
                Products
              </a>

              <a
                href="#routine"
                className="transition hover:text-[#F8F6F0]"
              >
                Our Routine
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[#AFC5AF]">
              Shop
            </p>

            <div className="flex flex-col gap-3 text-sm text-[#F8F6F0]/60">
              <Link
                href="/products"
                className="transition hover:text-[#F8F6F0]"
              >
                All Products
              </Link>

              <Link
                href="/cart"
                className="transition hover:text-[#F8F6F0]"
              >
                Shopping Cart
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 pt-6 text-xs text-[#F8F6F0]/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 SKINORA. All rights reserved.</p>

          <p>Skincare E-Commerce System</p>
        </div>
      </div>
    </footer>
  );
}