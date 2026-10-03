import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { skincareProducts } from "../../components/data/skincareProducts";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type ProductDetailProps = {
  product: Product | null;
};

const USD_TO_IDR = 17900;

const formatPrice = (price: number) => {
  const rupiah = Math.round((price * USD_TO_IDR) / 1000) * 1000;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(rupiah);
};

export default function ProductDetail({
  product,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setIsAdding(true);

      // Cari cart yang sudah ada
      const { data: existingCart, error: cartSelectError } =
        await supabase
          .from("cart")
          .select("id")
          .limit(1)
          .maybeSingle();

      if (cartSelectError) {
        throw cartSelectError;
      }

      let cartId = existingCart?.id;

      // Kalau belum ada cart, buat cart baru
      if (!cartId) {
        const { data: newCart, error: cartInsertError } =
          await supabase
            .from("cart")
            .insert({})
            .select("id")
            .single();

        if (cartInsertError) {
          throw cartInsertError;
        }

        cartId = newCart.id;
      }

      // Cek apakah product sudah ada di cart
      const { data: existingItem, error: itemSelectError } =
        await supabase
          .from("cart_items")
          .select("id, quantity")
          .eq("cart_id", cartId)
          .eq("product_id", product.id)
          .maybeSingle();

      if (itemSelectError) {
        throw itemSelectError;
      }

      if (existingItem) {
        // Kalau sudah ada, tambahkan quantity
        const { error: updateError } = await supabase
          .from("cart_items")
          .update({
            quantity: existingItem.quantity + quantity,
          })
          .eq("id", existingItem.id);

        if (updateError) {
          throw updateError;
        }
      } else {
        // Kalau belum ada, buat item baru
        const { error: insertError } = await supabase
          .from("cart_items")
          .insert({
            cart_id: cartId,
            product_id: product.id,
            product_title: product.title,
            product_brand: product.brand,
            product_price: product.price,
            product_image: product.thumbnail,
            quantity,
          });

        if (insertError) {
          throw insertError;
        }
      }

      alert("Product berhasil ditambahkan ke cart.");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Gagal menambahkan product ke cart.");
    } finally {
      setIsAdding(false);
    }
  };

  if (!product) {
    return (
      <>
        <Head>
          <title>Product Not Found | SKINORA</title>
        </Head>

        <main className="flex min-h-screen items-center justify-center bg-[#F8F6F0] px-6">
          <div className="text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#6F8F72]">
              SKINORA
            </p>

            <h1 className="text-4xl font-medium text-[#26332B]">
              Product not found
            </h1>

            <p className="mt-4 text-sm text-[#26332B]/60">
              Product yang kamu cari tidak tersedia.
            </p>

            <Link
              href="/#products"
              className="mt-8 inline-flex rounded-full bg-[#26332B] px-6 py-3 text-sm font-medium text-[#F8F6F0] transition hover:bg-[#6F8F72]"
            >
              Back to Products
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.title} | SKINORA</title>

        <meta
          name="description"
          content={product.description}
        />
      </Head>

      <main className="min-h-screen bg-[#F8F6F0] text-[#26332B]">
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 border-b border-[#26332B]/10 bg-[#F8F6F0]/90 backdrop-blur-md">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
            <Link
              href="/"
              className="text-xl font-semibold tracking-[-0.03em]"
            >
              SKINORA
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              <Link
                href="/#about"
                className="text-sm text-[#26332B]/60 transition hover:text-[#26332B]"
              >
                About Us
              </Link>

              <Link
                href="/#categories"
                className="text-sm text-[#26332B]/60 transition hover:text-[#26332B]"
              >
                Categories
              </Link>

              <Link
                href="/#products"
                className="text-sm text-[#26332B]/60 transition hover:text-[#26332B]"
              >
                Products
              </Link>

              <Link
                href="/#routine"
                className="text-sm text-[#26332B]/60 transition hover:text-[#26332B]"
              >
                Our Routine
              </Link>
            </nav>

            <Link
              href="/cart"
              className="rounded-full border border-[#26332B]/15 px-5 py-2.5 text-sm font-medium transition hover:bg-[#26332B] hover:text-[#F8F6F0]"
            >
              Cart
            </Link>
          </div>
        </header>

        {/* PRODUCT DETAIL */}
        <section className="px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            {/* BACK */}
            <Link
              href="/#products"
              className="mb-12 inline-flex items-center gap-2 text-sm text-[#26332B]/55 transition hover:text-[#26332B]"
            >
              <span>←</span>
              Back to Products
            </Link>

            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
              {/* IMAGE */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <div className="overflow-hidden rounded-[2rem] bg-[#EEEAE0]">
                  <img
                    src={
                      product.images?.[0] ||
                      product.thumbnail
                    }
                    alt={product.title}
                    className="aspect-square h-full w-full object-cover"
                  />
                </div>
              </motion.div>

              {/* INFORMATION */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                }}
                className="flex flex-col"
              >
                {/* BRAND */}
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
                  {product.brand || "Skincare"}
                </p>

                {/* TITLE */}
                <h1 className="mt-4 max-w-2xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] md:text-5xl lg:text-6xl">
                  {product.title}
                </h1>

                {/* PRICE */}
                <p className="mt-7 text-2xl font-medium">
                  {formatPrice(product.price)}
                </p>

                {/* DESCRIPTION */}
                <p className="mt-8 max-w-xl text-base leading-8 text-[#26332B]/65">
                  {product.description}
                </p>

                {/* META */}
                <div className="mt-8 grid max-w-xl grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-[#EEEAE0] p-5">
                    <p className="text-xs uppercase tracking-[0.15em] text-[#26332B]/45">
                      Category
                    </p>

                    <p className="mt-2 text-sm font-medium capitalize">
                      {product.category}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#EEEAE0] p-5">
                    <p className="text-xs uppercase tracking-[0.15em] text-[#26332B]/45">
                      Availability
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </p>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="mt-10">
                  <p className="mb-3 text-sm font-medium">
                    Quantity
                  </p>

                  <div className="flex w-fit items-center overflow-hidden rounded-full border border-[#26332B]/15">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((current) =>
                          Math.max(1, current - 1)
                        )
                      }
                      className="flex h-12 w-12 items-center justify-center text-lg transition hover:bg-[#EEEAE0]"
                    >
                      −
                    </button>

                    <span className="flex h-12 w-12 items-center justify-center text-sm font-medium">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((current) =>
                          Math.min(product.stock, current + 1)
                        )
                      }
                      disabled={quantity >= product.stock}
                      className="flex h-12 w-12 items-center justify-center text-lg transition hover:bg-[#EEEAE0] disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ADD TO CART */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdding || product.stock === 0}
                  className="mt-6 flex w-full max-w-xl items-center justify-between rounded-full bg-[#26332B] px-7 py-4 text-sm font-medium text-[#F8F6F0] transition hover:bg-[#6F8F72] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>
                    {isAdding
                      ? "Adding..."
                      : product.stock === 0
                        ? "Out of Stock"
                        : "Add to Cart"}
                  </span>

                  <span className="text-lg">
                    →
                  </span>
                </button>

                {/* PAYMENT NOTE */}
                <div className="mt-6 rounded-2xl border border-[#26332B]/10 bg-[#F1EBDD] p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#6F8F72]">
                    Payment
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#26332B]/65">
                    Pembayaran pada versi ini menggunakan
                    simulasi transaksi untuk menggambarkan
                    alur checkout dan payment.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  ProductDetailProps
> = async (context) => {
  const { id } = context.params ?? {};

  if (!id || Array.isArray(id)) {
    return {
      props: {
        product: null,
      },
    };
  }

  try {
    const productId = Number(id);

    // Cari dulu di produk skincare lokal
    const localProduct = skincareProducts.find(
      (product) => product.id === productId
    );

    if (localProduct) {
      return {
        props: {
          product: {
            ...localProduct,
            discountPercentage: 0,
            rating: 5,
          },
        },
      };
    }

    // Kalau bukan produk lokal, cari di DummyJSON
    const response = await fetch(
      `https://dummyjson.com/products/${id}`
    );

    if (!response.ok) {
      return {
        props: {
          product: null,
        },
      };
    }

    const product = await response.json();

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error(
      "Failed to fetch product:",
      error
    );

    return {
      props: {
        product: null,
      },
    };
  }
};