import Head from "next/head";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skincareProducts } from "../components/data/skincareProducts";

import Header from "../components/Navbar";
import AboutUs from "../components/AboutUs";
import Categories from "../components/Categories";
import ProductShowcase from "../components/ProductShowCase";
import OurRoutine from "../components/OurRoutine";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  stock: number;
};

type ProductResponse = {
  products: Product[];
};

type HomeProps = {
  products: Product[];
};

const formatPrice = (price: number) => {
  const rupiah = price * 17898;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(rupiah);
};

export default function Home({ products }: HomeProps) {
  /*
    ==========================================================
    OPENING STAGE
  */

  const [openingStage, setOpeningStage] = useState<
    0 | 1 | 2 | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");

  /*
    ==========================================================
    CHECK OPENING SESSION
    ==========================================================
  */

  useEffect(() => {
    const hasSeenOpening = sessionStorage.getItem(
      "skinora-opening-seen"
    );

    if (hasSeenOpening === "true") {
      setOpeningStage(2);
    } else {
      setOpeningStage(0);
    }
  }, []);

  /*
    ==========================================================
    ATTITUDE PRODUCT
    ==========================================================
  */

  const openingProduct =
    products.find((product) => product.id === 118) ||
    products.find(
      (product) =>
        product.brand?.toLowerCase() === "attitude"
    ) ||
    products[0];

  /*
    ==========================================================
    OLAY PRODUCT
    ==========================================================
  */

  const aboutProduct =
    products.find((product) => product.id === 119) ||
    products.find(
      (product) =>
        product.brand?.toLowerCase() === "olay"
    );

  /*
    ==========================================================
    ENTER SKINORA

    Opening -> Hero
    ==========================================================
  */

  const handleEnter = () => {
    setOpeningStage(1);
  };

  /*
    ==========================================================
    DISCOVER SKINORA

    Hero -> Website normal -> About Us
    ==========================================================
  */

  const handleDiscover = () => {
    sessionStorage.setItem(
      "skinora-opening-seen",
      "true"
    );

    setOpeningStage(2);

    setTimeout(() => {
      document
        .getElementById("about")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  /*
    ==========================================================
    SHOP SKINCARE

    Hero -> Website normal -> Products
    ==========================================================
  */

  const handleShopSkincare = () => {
    sessionStorage.setItem(
      "skinora-opening-seen",
      "true"
    );

    setOpeningStage(2);

    setTimeout(() => {
      document
        .getElementById("products")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  /*
    ==========================================================
    WEBSITE BELUM SIAP DIRENDER
    SAAT SESSION STORAGE MASIH DICEK
    ==========================================================
  */

  if (openingStage === null) {
    return (
      <div className="min-h-screen bg-[#F8F6F0]" />
    );
  }

  return (
    <>
      <Head>
        <title>
          SKINORA — Your Everyday Skin Ritual
        </title>

        <meta
          name="description"
          content="Discover skincare products with SKINORA."
        />

        {/* =================================================
            LOCK SCROLL SAAT OPENING / HERO
        ================================================== */}

        {openingStage !== 2 && (
          <style>{`
            html,
            body {
              overflow: hidden !important;
              height: 100%;
            }
          `}</style>
        )}
      </Head>

      {/* =====================================================
          WEBSITE NORMAL
      ====================================================== */}

      <motion.div
        animate={{
          opacity: openingStage === 2 ? 1 : 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="min-h-screen bg-[#F8F6F0] text-[#26332B]"
      >
        {/* =================================================
            NAVBAR
        ================================================== */}

        {openingStage === 2 && <Header
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
/>}

        <main>
          {/* =================================================
              ABOUT US
          ================================================== */}

          {aboutProduct && (
            <section
              id="about"
              className="scroll-mt-24"
            >
              <AboutUs entered={true} />
            </section>
          )}

          {/* =================================================
              CATEGORIES
          ================================================== */}

          <section
            id="categories"
            className="scroll-mt-24"
          >
            <Categories />
          </section>

          {/* =================================================
              PRODUCTS
          ================================================== */}

          <section
            id="products"
            className="scroll-mt-24"
          >
            <ProductShowcase
              products={products}
              searchQuery={searchQuery}
            />
          </section>

          {/* =================================================
              OUR ROUTINE
          ================================================== */}

          <section
            id="routine"
            className="scroll-mt-24"
          >
            <OurRoutine />
          </section>

          <CTA />
        </main>

        <Footer />
      </motion.div>

      {/* =====================================================
          OPENING EXPERIENCE
      ====================================================== */}

      <AnimatePresence mode="wait">

        {/* ===================================================
            STAGE 0
            OPENING
        ==================================================== */}

        {openingStage === 0 && (
          <motion.div
            key="opening"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="fixed inset-0 z-[100] h-screen w-full overflow-y-auto overflow-x-hidden bg-[#F8F6F0]"
          >
            {/* Background */}

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DCE8DC] opacity-60 blur-3xl" />

              <div className="absolute left-0 top-16 select-none text-[9rem] font-bold tracking-[-0.08em] text-[#6F8F72]/5">
                SKIN
              </div>

              <div className="absolute -bottom-16 right-0 select-none text-[9rem] font-bold tracking-[-0.08em] text-[#6F8F72]/5">
                CARE
              </div>
            </div>

            {/* Content */}

            <div className="relative z-10 flex h-full items-center justify-center px-6">
              <div className="flex flex-col items-center text-center">

                {/* Heading */}

                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#6F8F72]">
                  Your Everyday Skin Ritual
                </p>

                <h1 className="mt-3 font-serif text-6xl font-semibold tracking-[0.12em] text-[#26332B] sm:text-7xl">
                  SKINORA
                </h1>

                {/* Collection label */}

                <div className="mt-5">
                  <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#6F8F72]">
                    SKINORA COLLECTION
                  </p>

                  <p className="mt-1 text-xs text-[#26332B]/50">
                    Everyday skincare essentials
                  </p>
                </div>

                {/* Static collection image */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                  }}
                  className="relative mt-5"
                >
                  <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DCE8DC] blur-3xl" />

                  <motion.img
                    src="/image/skincare-collection.png"
                    alt="SKINORA skincare collection"
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative z-10 h-[250px] w-[350px] rounded-[2rem] object-cover shadow-2xl sm:h-[280px] sm:w-[420px]"
                  />
                </motion.div>

                {/* Enter */}

                <motion.button
                  type="button"
                  onClick={handleEnter}
                  className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#26332B] px-7 py-3.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-[#6F8F72]"
                >
                  Enter SKINORA

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </motion.button>

                <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-[#26332B]/40">
                  Discover your everyday ritual
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===================================================
            STAGE 1
            HERO
        ==================================================== */}

        {openingStage === 1 && (
          <motion.div
            key="hero"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="fixed inset-0 z-[100] h-screen w-full overflow-y-auto overflow-x-hidden bg-[#F8F6F0]"
          >
            {/* Background */}

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute right-[15%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#DCE8DC] opacity-60 blur-3xl" />

              <div className="absolute left-0 top-10 select-none text-[8rem] font-bold tracking-[-0.08em] text-[#6F8F72]/5">
                SKIN
              </div>

              <div className="absolute right-0 -bottom-8 select-none text-[8rem] font-bold tracking-[-0.08em] text-[#6F8F72]/5">
                RITUAL
              </div>
            </div>

            {/* Hero Content */}

            <div className="relative z-10 flex min-h-full items-center px-5 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-0">
              <div className="mx-auto grid w-full max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-12">

                {/* Text */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -50,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                  }}
                  className="max-w-xl"
                >
                  <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#6F8F72] sm:mb-5 sm:text-sm sm:tracking-[0.25em]">
                    Everyday skincare essentials
                  </p>

                  <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#26332B] sm:text-6xl lg:text-7xl">
                    Your skin,
                    <br />
                    your everyday
                    <br />
                    <span className="text-[#6F8F72]">
                      ritual.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-md text-sm leading-6 text-[#26332B]/70 sm:mt-7 sm:text-base sm:leading-7">
                    Discover skincare essentials designed
                    to become a natural part of your
                    everyday routine.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">

                    {/* SHOP SKINCARE */}

                    <button
                      type="button"
                      onClick={handleShopSkincare}
                      className="w-fit rounded-full bg-[#26332B] px-6 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-[#6F8F72] sm:px-7 sm:py-3.5"
                    >
                      Shop skincare
                    </button>

                    {/* DISCOVER SKINORA */}

                    <button
                      type="button"
                      onClick={handleDiscover}
                      className="w-fit rounded-full border border-[#26332B]/20 bg-white/70 px-6 py-3 text-sm font-medium text-[#26332B] transition duration-300 hover:-translate-y-1 hover:bg-white sm:px-7 sm:py-3.5"
                    >
                      Discover SKINORA
                    </button>
                  </div>
                </motion.div>

                {/* STATIC SKINCARE COLLECTION IMAGE */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 50,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                  }}
                  className="relative flex justify-center"
                >
                  <div className="relative w-full max-w-[500px]">

                    <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F1EBDD] blur-3xl sm:h-80 sm:w-80" />

                    <motion.img
                      src="/image/skincare-collection.png"
                      alt="SKINORA skincare collection"
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative z-10 aspect-[5/3] h-auto w-[calc(100vw-40px)] max-w-[500px] rounded-[1.5rem] object-cover shadow-2xl sm:w-full sm:rounded-[2rem]"
                    />

                    {/* Collection label */}

                    <motion.div
                      animate={{
                        y: [0, -6, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute left-2 top-8 z-20 hidden rounded-2xl border border-[#26332B]/10 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:block sm:-left-16 sm:top-12 sm:px-5 sm:py-3.5"
                    >
                      <p className="text-[9px] uppercase tracking-wider text-[#6F8F72] sm:text-[10px]">
                        SKINORA COLLECTION
                      </p>

                      <p className="mt-1 text-[11px] font-semibold text-[#26332B] sm:text-xs">
                        Everyday essentials
                      </p>
                    </motion.div>

                    {/* Offer label */}

                    <motion.div
                      animate={{
                        y: [0, 6, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -bottom-3 right-2 z-20 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-right-10 sm:px-5 sm:py-4"
                    >
                      <p className="text-[10px] text-[#26332B]/50 sm:text-xs">
                        Special offers
                      </p>

                      <p className="mt-1 text-xs font-semibold leading-5 text-[#26332B] sm:text-sm">
                        Everyday beauty,
                        <br />
                        better value.
                      </p>
                    </motion.div>

                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category/skin-care?limit=20"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch skincare products");
    }

    const data: ProductResponse = await response.json();

    const products = [...data.products, ...skincareProducts];

    return {
      props: {
        products,
      },
    };
  } catch {
    return {
      props: {
        products: skincareProducts,
      },
    };
  }
}