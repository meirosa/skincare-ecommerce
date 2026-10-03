import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#26332B] px-6 pb-5 pt-9 text-[#F8F6F0] lg:px-10 lg:pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-[#F8F6F0]/15 pb-8 md:grid-cols-4 md:gap-6">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-xl font-semibold tracking-[0.18em]"
            >
              SKINORA
            </Link>

            <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-[#AFC5AF]">
              Your Everyday Skin Ritual
            </p>

            <p className="mt-3 max-w-xs text-xs leading-5 text-[#F8F6F0]/50">
              A simple skincare shopping experience to help you discover
              products and build your everyday routine.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#AFC5AF]">
              Explore
            </p>

            <div className="flex flex-col gap-2 text-xs text-[#F8F6F0]/60">
              <a href="#about" className="transition hover:text-[#F8F6F0]">
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
              <a href="#routine" className="transition hover:text-[#F8F6F0]">
                Our Routine
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#AFC5AF]">
              Shop
            </p>

            <div className="flex flex-col gap-2 text-xs text-[#F8F6F0]/60">
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

          {/* Contact */}
          <div>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#AFC5AF]">
              Contact
            </p>

            <p className="max-w-xs text-xs leading-5 text-[#F8F6F0]/50">
              Need help choosing a product or building your everyday routine?
            </p>

            <a
              href="https://wa.me/628814922923"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#F8F6F0]/15 px-3.5 py-2 text-xs text-[#F8F6F0]/75 transition hover:border-[#AFC5AF]/50 hover:bg-[#F8F6F0]/5 hover:text-[#F8F6F0]"
            >
              WhatsApp
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-1.5 pt-4 text-[10px] text-[#F8F6F0]/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SKINORA. All rights reserved.</p>
          <p>Skincare E-Commerce System</p>
        </div>
      </div>
    </footer>
  );
}