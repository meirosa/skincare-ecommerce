import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string | null;
  total_amount: number;
  status: string;
  created_at: string;
};

type OrderItem = {
  id: string;
  product_title: string;
  product_brand: string | null;
  product_price: number;
  product_image: string | null;
  quantity: number;
  subtotal: number;
};

const USD_TO_IDR = 17900;

const formatPrice = (price: number) => {
  const rupiah =
    Math.round((price * USD_TO_IDR) / 1000) * 1000;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(rupiah);
};

export default function OrderSuccessPage() {
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const loadOrder = async () => {
      try {
        const orderId = router.query.order;

        if (!orderId || Array.isArray(orderId)) {
          setIsLoading(false);
          return;
        }

        const { data: orderData, error: orderError } =
          await supabase
            .from("orders")
            .select("*")
            .eq("id", orderId)
            .maybeSingle();

        if (orderError) throw orderError;

        if (!orderData) {
          setIsLoading(false);
          return;
        }

        setOrder(orderData);

        const { data: orderItems, error: itemsError } =
          await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", orderId);

        if (itemsError) throw itemsError;

        setItems(orderItems || []);
      } catch (error) {
        console.error("Load order error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [router.isReady, router.query.order]);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Order Confirmation | SKINORA</title>
        </Head>

        <main className="flex min-h-screen items-center justify-center bg-[#F8F6F0]">
          <p className="text-sm text-[#26332B]/60">
            Loading your order...
          </p>
        </main>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Head>
          <title>Order Not Found | SKINORA</title>
        </Head>

        <main className="flex min-h-screen items-center justify-center bg-[#F8F6F0] px-6 text-[#26332B]">
          <div className="max-w-md text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
              SKINORA
            </p>

            <h1 className="mt-4 text-4xl font-medium">
              Order not found.
            </h1>

            <p className="mt-5 text-sm leading-6 text-[#26332B]/60">
              We could not find the order you are looking
              for.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex rounded-full bg-[#26332B] px-7 py-3.5 text-sm font-medium text-[#F8F6F0]"
            >
              Back to SKINORA
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Order Confirmed | SKINORA</title>

        <meta
          name="description"
          content="Your SKINORA order has been confirmed."
        />
      </Head>

      <main className="min-h-screen bg-[#F8F6F0] text-[#26332B]">
        <header className="border-b border-[#26332B]/10">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
            <Link
              href="/"
              className="text-xl font-semibold tracking-[-0.03em]"
            >
              SKINORA
            </Link>

            <Link
              href="/"
              className="text-sm text-[#26332B]/60 transition hover:text-[#26332B]"
            >
              Back to Home
            </Link>
          </div>
        </header>

        <section className="px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-5xl">
            {/* SUCCESS */}
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#DCE8DC]">
                <span className="text-3xl text-[#6F8F72]">
                  ✓
                </span>
              </div>

              <p className="mt-8 text-sm font-medium uppercase tracking-[0.25em] text-[#6F8F72]">
                Order Confirmed
              </p>

              <h1 className="mt-4 text-5xl font-medium tracking-[-0.04em] md:text-6xl">
                Thank you for your order.
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#26332B]/60">
                Your order has been successfully created
                and the simulated payment has been completed.
              </p>

              <p className="mt-4 text-sm text-[#26332B]/50">
                Order ID:{" "}
                <span className="font-medium text-[#26332B]">
                  {order.id}
                </span>
              </p>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_360px]">
              {/* ORDER DETAILS */}
              <div className="space-y-8">
                <section className="rounded-[2rem] bg-[#EEEAE0] p-7 md:p-9">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
                    Order Status
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#DCE8DC] px-4 py-2 text-xs font-medium capitalize text-[#26332B]">
                      {order.status}
                    </span>

                    <span className="text-sm text-[#26332B]/50">
                      Payment completed
                    </span>
                  </div>
                </section>

                <section className="rounded-[2rem] bg-[#EEEAE0] p-7 md:p-9">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
                    Customer Information
                  </p>

                  <div className="mt-5 space-y-2 text-sm leading-6">
                    <p>
                      <span className="text-[#26332B]/50">
                        Name:
                      </span>{" "}
                      {order.customer_name}
                    </p>

                    <p>
                      <span className="text-[#26332B]/50">
                        Email:
                      </span>{" "}
                      {order.customer_email}
                    </p>

                    {order.customer_phone && (
                      <p>
                        <span className="text-[#26332B]/50">
                          Phone:
                        </span>{" "}
                        {order.customer_phone}
                      </p>
                    )}
                  </div>
                </section>

                <section className="rounded-[2rem] bg-[#EEEAE0] p-7 md:p-9">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
                    Shipping Information
                  </p>

                  <div className="mt-5 text-sm leading-6">
                    <p>{order.shipping_address}</p>

                    <p>
                      {order.shipping_city}
                      {order.shipping_postal_code
                        ? `, ${order.shipping_postal_code}`
                        : ""}
                    </p>
                  </div>
                </section>

                <section className="rounded-[2rem] bg-[#EEEAE0] p-7 md:p-9">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
                    Ordered Products
                  </p>

                  <div className="mt-6 space-y-5">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 border-b border-[#26332B]/10 pb-5 last:border-0 last:pb-0"
                      >
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F8F6F0]">
                          {item.product_image && (
                            <img
                              src={item.product_image}
                              alt={item.product_title}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">
                            {item.product_title}
                          </p>

                          {item.product_brand && (
                            <p className="mt-1 text-xs text-[#26332B]/50">
                              {item.product_brand}
                            </p>
                          )}

                          <p className="mt-2 text-xs text-[#26332B]/50">
                            Qty {item.quantity}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-medium">
                          {formatPrice(item.subtotal)}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* SUMMARY */}
              <aside className="h-fit rounded-[2rem] bg-[#26332B] p-7 text-[#F8F6F0] lg:sticky lg:top-8">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#DCE8DC]">
                  Order Summary
                </p>

                <h2 className="mt-3 text-2xl font-medium">
                  Thank you, {order.customer_name.split(" ")[0]}.
                </h2>

                <div className="mt-7 space-y-4 border-b border-[#F8F6F0]/15 pb-6">
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-[#F8F6F0]/55">
                      Products
                    </span>

                    <span>{items.length}</span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-[#F8F6F0]/55">
                      Shipping
                    </span>

                    <span>Free</span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-[#F8F6F0]/55">
                      Payment
                    </span>

                    <span>Paid</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-sm text-[#F8F6F0]/55">
                    Total
                  </span>

                  <span className="text-xl font-medium">
                    {formatPrice(order.total_amount)}
                  </span>
                </div>

                <Link
                  href="/"
                  className="mt-8 flex w-full items-center justify-between rounded-full bg-[#F8F6F0] px-6 py-4 text-sm font-medium text-[#26332B] transition hover:bg-[#DCE8DC]"
                >
                  <span>Back to SKINORA</span>
                  <span className="text-lg">→</span>
                </Link>

                <p className="mt-5 text-center text-xs leading-5 text-[#F8F6F0]/40">
                  Thank you for choosing SKINORA.
                </p>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}