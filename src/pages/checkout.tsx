import Head from "next/head";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
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

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingPostalCode, setShippingPostalCode] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("bank_transfer");

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

      const { data: cartItems, error: itemsError } =
        await supabase
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
      console.error("Load checkout cart error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product_price * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (items.length === 0) {
      alert("Cart kamu masih kosong.");
      return;
    }

    try {
      setIsSubmitting(true);

      /*
       * Untuk sementara proses checkout belum membuat order.
       * Data akan dikirim ke halaman payment setelah validasi form.
       */

      const checkoutData = {
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        shippingCity,
        shippingPostalCode,
        paymentMethod,
      };

      sessionStorage.setItem(
        "skinora_checkout",
        JSON.stringify(checkoutData)
      );

      window.location.href = "/payment";
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Terjadi kesalahan saat memproses checkout.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Checkout | SKINORA</title>
        </Head>

        <main className="flex min-h-screen items-center justify-center bg-[#F8F6F0]">
          <p className="text-sm text-[#26332B]/60">
            Loading checkout...
          </p>
        </main>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Head>
          <title>Checkout | SKINORA</title>
        </Head>

        <main className="min-h-screen bg-[#F8F6F0] px-6 py-20 text-[#26332B]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
              Checkout
            </p>

            <h1 className="mt-4 text-4xl font-medium">
              Your cart is empty.
            </h1>

            <p className="mt-5 text-sm leading-6 text-[#26332B]/60">
              Add a skincare product to your cart before
              continuing to checkout.
            </p>

            <Link
              href="/#products"
              className="mt-8 inline-flex rounded-full bg-[#26332B] px-7 py-3.5 text-sm font-medium text-[#F8F6F0] transition hover:bg-[#6F8F72]"
            >
              Explore Products
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout | SKINORA</title>

        <meta
          name="description"
          content="Complete your SKINORA order."
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

            <Link
              href="/cart"
              className="text-sm text-[#26332B]/60 transition hover:text-[#26332B]"
            >
              ← Back to Cart
            </Link>
          </div>
        </header>

        <section className="px-6 py-10 lg:px-10 lg:py-9">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#6F8F72]">
                Checkout
              </p>

              <h1 className="text-5xl font-medium tracking-[-0.04em] md:text-6xl">
                Complete your order.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#26332B]/60">
                Enter your information and choose your
                preferred payment method.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid gap-10 lg:grid-cols-[1fr_360px]"
            >
              {/* FORM */}
              <div className="space-y-8">
                {/* CUSTOMER */}
                <motion.section
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="rounded-[2rem] bg-[#EEEAE0] p-7 md:p-9"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
                    01
                  </p>

                  <h2 className="mt-3 text-2xl font-medium">
                    Customer Information
                  </h2>

                  <div className="mt-7 grid gap-5">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Full Name
                      </label>

                      <input
                        type="text"
                        value={customerName}
                        onChange={(event) =>
                          setCustomerName(event.target.value)
                        }
                        required
                        placeholder="Mei Rosa Widyawati"
                        className="w-full rounded-2xl border border-[#26332B]/10 bg-[#F8F6F0] px-5 py-3.5 text-sm outline-none transition focus:border-[#6F8F72]"
                      />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Email
                        </label>

                        <input
                          type="email"
                          value={customerEmail}
                          onChange={(event) =>
                            setCustomerEmail(event.target.value)
                          }
                          required
                          placeholder="you@email.com"
                          className="w-full rounded-2xl border border-[#26332B]/10 bg-[#F8F6F0] px-5 py-3.5 text-sm outline-none transition focus:border-[#6F8F72]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Phone Number
                        </label>

                        <input
                          type="tel"
                          value={customerPhone}
                          onChange={(event) =>
                            setCustomerPhone(event.target.value)
                          }
                          required
                          placeholder="08xxxxxxxxxx"
                          className="w-full rounded-2xl border border-[#26332B]/10 bg-[#F8F6F0] px-5 py-3.5 text-sm outline-none transition focus:border-[#6F8F72]"
                        />
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* SHIPPING */}
                <motion.section
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.1,
                  }}
                  className="rounded-[2rem] bg-[#EEEAE0] p-7 md:p-9"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
                    02
                  </p>

                  <h2 className="mt-3 text-2xl font-medium">
                    Shipping Information
                  </h2>

                  <div className="mt-7 grid gap-5">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Shipping Address
                      </label>

                      <textarea
                        value={shippingAddress}
                        onChange={(event) =>
                          setShippingAddress(event.target.value)
                        }
                        required
                        rows={4}
                        placeholder="Enter your complete address"
                        className="w-full resize-none rounded-2xl border border-[#26332B]/10 bg-[#F8F6F0] px-5 py-3.5 text-sm outline-none transition focus:border-[#6F8F72]"
                      />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          City
                        </label>

                        <input
                          type="text"
                          value={shippingCity}
                          onChange={(event) =>
                            setShippingCity(event.target.value)
                          }
                          required
                          placeholder="Surabaya"
                          className="w-full rounded-2xl border border-[#26332B]/10 bg-[#F8F6F0] px-5 py-3.5 text-sm outline-none transition focus:border-[#6F8F72]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Postal Code
                        </label>

                        <input
                          type="text"
                          value={shippingPostalCode}
                          onChange={(event) =>
                            setShippingPostalCode(
                              event.target.value
                            )
                          }
                          required
                          placeholder="60200"
                          className="w-full rounded-2xl border border-[#26332B]/10 bg-[#F8F6F0] px-5 py-3.5 text-sm outline-none transition focus:border-[#6F8F72]"
                        />
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* PAYMENT */}
                <motion.section
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  className="rounded-[2rem] bg-[#EEEAE0] p-7 md:p-9"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
                    03
                  </p>

                  <h2 className="mt-3 text-2xl font-medium">
                    Payment Method
                  </h2>

                  <div className="mt-7 space-y-3">
                    <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-[#26332B]/10 bg-[#F8F6F0] p-5 transition hover:border-[#6F8F72]">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={
                          paymentMethod === "bank_transfer"
                        }
                        onChange={(event) =>
                          setPaymentMethod(event.target.value)
                        }
                        className="h-4 w-4 accent-[#6F8F72]"
                      />

                      <div>
                        <p className="text-sm font-medium">
                          Bank Transfer
                        </p>

                        <p className="mt-1 text-xs text-[#26332B]/50">
                          Simulated bank transfer payment
                        </p>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-[#26332B]/10 bg-[#F8F6F0] p-5 transition hover:border-[#6F8F72]">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="e_wallet"
                        checked={
                          paymentMethod === "e_wallet"
                        }
                        onChange={(event) =>
                          setPaymentMethod(event.target.value)
                        }
                        className="h-4 w-4 accent-[#6F8F72]"
                      />

                      <div>
                        <p className="text-sm font-medium">
                          E-Wallet
                        </p>

                        <p className="mt-1 text-xs text-[#26332B]/50">
                          Simulated e-wallet payment
                        </p>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-[#26332B]/10 bg-[#F8F6F0] p-5 transition hover:border-[#6F8F72]">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit_card"
                        checked={
                          paymentMethod === "credit_card"
                        }
                        onChange={(event) =>
                          setPaymentMethod(event.target.value)
                        }
                        className="h-4 w-4 accent-[#6F8F72]"
                      />

                      <div>
                        <p className="text-sm font-medium">
                          Credit Card
                        </p>

                        <p className="mt-1 text-xs text-[#26332B]/50">
                          Simulated credit card payment
                        </p>
                      </div>
                    </label>
                  </div>
                </motion.section>
              </div>

              {/* ORDER SUMMARY */}
              <aside className="h-fit rounded-[2rem] bg-[#26332B] p-7 text-[#F8F6F0] lg:sticky lg:top-28">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#DCE8DC]">
                  04
                </p>

                <h2 className="mt-3 text-2xl font-medium">
                  Review Order
                </h2>

                <div className="mt-7 space-y-5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F8F6F0]/10">
                        {item.product_image && (
                          <img
                            src={item.product_image}
                            alt={item.product_title}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium">
                          {item.product_title}
                        </p>

                        <p className="mt-1 text-xs text-[#F8F6F0]/50">
                          Qty {item.quantity}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm">
                        {formatPrice(
                          item.product_price *
                            item.quantity
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 space-y-4 border-t border-[#F8F6F0]/15 pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#F8F6F0]/55">
                      Items
                    </span>

                    <span>{totalItems}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#F8F6F0]/55">
                      Shipping
                    </span>

                    <span>Free</span>
                  </div>

                  <div className="flex items-end justify-between gap-4 pt-2">
                    <span className="text-sm text-[#F8F6F0]/55">
                      Total
                    </span>

                    <span className="text-xl font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 flex w-full items-center justify-between rounded-full bg-[#F8F6F0] px-6 py-4 text-sm font-medium text-[#26332B] transition hover:bg-[#DCE8DC] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>
                    {isSubmitting
                      ? "Processing..."
                      : "Continue to Payment"}
                  </span>

                  <span className="text-lg">
                    →
                  </span>
                </button>

                <p className="mt-5 text-center text-xs leading-5 text-[#F8F6F0]/40">
                  Payment is simulated for this technical
                  assessment.
                </p>
              </aside>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}