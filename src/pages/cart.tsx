import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

type CartItem = {
  id: string;
  cart_id: string;
  product_id: number;
  product_title: string;
  product_brand: string | null;
  product_price: number;
  product_image: string | null;
  quantity: number;
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

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const loadCart = async () => {
    try {
      setIsLoading(true);

      const { data: cart, error: cartError } = await supabase
        .from("cart")
        .select("id")
        .limit(1)
        .maybeSingle();

      if (cartError) {
        throw cartError;
      }

      if (!cart) {
        setItems([]);
        return;
      }

      const { data: cartItems, error: itemsError } = await supabase
        .from("cart_items")
        .select("*")
        .eq("cart_id", cart.id)
        .order("created_at", {
          ascending: false,
        });

      if (itemsError) {
        throw itemsError;
      }

      setItems(cartItems || []);
    } catch (error) {
      console.error("Load cart error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (
    itemId: string,
    quantity: number
  ) => {
    if (quantity < 1) return;

    try {
      setIsUpdating(true);

      const { error } = await supabase
        .from("cart_items")
        .update({
          quantity,
        })
        .eq("id", itemId);

      if (error) {
        throw error;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === itemId
            ? { ...item, quantity }
            : item
        )
      );
    } catch (error) {
      console.error("Update quantity error:", error);
      alert("Gagal mengubah quantity.");
    } finally {
      setIsUpdating(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      setIsUpdating(true);

      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) {
        throw error;
      }

      setItems((currentItems) =>
        currentItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Remove item error:", error);
      alert("Gagal menghapus product.");
    } finally {
      setIsUpdating(false);
    }
  };

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product_price * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Head>
        <title>Shopping Cart | SKINORA</title>

        <meta
          name="description"
          content="Review your skincare products before checkout."
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
              className="rounded-full bg-[#26332B] px-5 py-2.5 text-sm font-medium text-[#F8F6F0]"
            >
              Cart
            </Link>
          </div>
        </header>

        {/* CART */}
        <section className="px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#6F8F72]">
                Your Cart
              </p>

              <h1 className="text-5xl font-medium tracking-[-0.04em] md:text-6xl">
                Your skincare essentials.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#26332B]/60">
                Review your selected products before continuing
                to checkout.
              </p>
            </div>

            {isLoading ? (
              <div className="rounded-[2rem] bg-[#EEEAE0] px-6 py-20 text-center">
                <p className="text-sm text-[#26332B]/60">
                  Loading your cart...
                </p>
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-[2rem] bg-[#EEEAE0] px-6 py-20 text-center">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
                  Your Cart Is Empty
                </p>

                <h2 className="mt-4 text-3xl font-medium">
                  Nothing here yet.
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#26332B]/60">
                  Explore our skincare collection and add
                  products that fit your everyday routine.
                </p>

                <Link
                  href="/#products"
                  className="mt-8 inline-flex rounded-full bg-[#26332B] px-7 py-3.5 text-sm font-medium text-[#F8F6F0] transition hover:bg-[#6F8F72]"
                >
                  Explore Products
                </Link>
              </div>
            ) : (
              <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
                {/* ITEMS */}
                <div className="space-y-5">
                  {items.map((item, index) => (
                    <motion.article
                      key={item.id}
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                      }}
                      className="rounded-[1.5rem] bg-[#EEEAE0] p-5 md:p-6"
                    >
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        {/* IMAGE */}
                        <div className="h-32 w-full shrink-0 overflow-hidden rounded-2xl bg-[#F8F6F0] sm:h-36 sm:w-36">
                          {item.product_image ? (
                            <img
                              src={item.product_image}
                              alt={item.product_title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-[#26332B]/40">
                              No image
                            </div>
                          )}
                        </div>

                        {/* INFO */}
                        <div className="flex-1">
                          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#6F8F72]">
                            {item.product_brand ||
                              "Skincare"}
                          </p>

                          <h2 className="mt-2 text-lg font-medium leading-6">
                            {item.product_title}
                          </h2>

                          <p className="mt-3 text-sm font-medium">
                            {formatPrice(item.product_price)}
                          </p>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                          <div className="flex items-center overflow-hidden rounded-full border border-[#26332B]/15 bg-[#F8F6F0]">
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1
                                )
                              }
                              className="flex h-10 w-10 items-center justify-center transition hover:bg-[#DCE8DC] disabled:opacity-40"
                            >
                              −
                            </button>

                            <span className="flex h-10 w-10 items-center justify-center text-sm font-medium">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1
                                )
                              }
                              className="flex h-10 w-10 items-center justify-center transition hover:bg-[#DCE8DC] disabled:opacity-40"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() =>
                              removeItem(item.id)
                            }
                            className="text-xs text-[#26332B]/45 transition hover:text-red-600 disabled:opacity-40"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* SUMMARY */}
                <aside className="h-fit rounded-[2rem] bg-[#26332B] p-7 text-[#F8F6F0] lg:sticky lg:top-28">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#DCE8DC]">
                    Order Summary
                  </p>

                  <h2 className="mt-4 text-3xl font-medium">
                    Your order
                  </h2>

                  <div className="mt-8 space-y-4 border-b border-[#F8F6F0]/15 pb-6">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-[#F8F6F0]/60">
                        Items
                      </span>

                      <span>
                        {totalItems} item
                        {totalItems !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-[#F8F6F0]/60">
                        Subtotal
                      </span>

                      <span>{formatPrice(subtotal)}</span>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-[#F8F6F0]/60">
                        Shipping
                      </span>

                      <span>Free</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-sm text-[#F8F6F0]/60">
                      Total
                    </span>

                    <span className="text-xl font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    className="mt-8 flex w-full items-center justify-between rounded-full bg-[#F8F6F0] px-6 py-4 text-sm font-medium text-[#26332B] transition hover:bg-[#DCE8DC]"
                  >
                    <span>Proceed to Checkout</span>
                    <span className="text-lg">→</span>
                  </Link>

                  <Link
                    href="/#products"
                    className="mt-4 flex w-full justify-center text-sm text-[#F8F6F0]/55 transition hover:text-[#F8F6F0]"
                  >
                    Continue Shopping
                  </Link>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}