import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type CheckoutData = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  paymentMethod: string;
};

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

const paymentLabels: Record<string, string> = {
  bank_transfer: "Bank Transfer",
  e_wallet: "E-Wallet",
  credit_card: "Credit Card",
};

export default function PaymentPage() {
  const [checkoutData, setCheckoutData] =
    useState<CheckoutData | null>(null);

  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedCheckout = sessionStorage.getItem(
      "skinora_checkout"
    );

    if (savedCheckout) {
      setCheckoutData(JSON.parse(savedCheckout));
    }

    const loadCart = async () => {
      try {
        const { data: cart, error: cartError } =
          await supabase
            .from("cart")
            .select("id")
            .limit(1)
            .maybeSingle();

        if (cartError) throw cartError;

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

        if (itemsError) throw itemsError;

        setItems(cartItems || []);
      } catch (error) {
        console.error("Load payment cart error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product_price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!checkoutData || items.length === 0) {
      alert("Data checkout tidak ditemukan.");
      return;
    }

    try {
      setIsProcessing(true);

      // 1. Simpan customer
      const { data: existingUser, error: userSelectError } =
        await supabase
          .from("users")
          .select("id")
          .eq("email", checkoutData.customerEmail)
          .maybeSingle();

      if (userSelectError) throw userSelectError;

      let userId = existingUser?.id;

      if (!userId) {
        const { data: newUser, error: userInsertError } =
          await supabase
            .from("users")
            .insert({
              name: checkoutData.customerName,
              email: checkoutData.customerEmail,
              phone: checkoutData.customerPhone,
            })
            .select("id")
            .single();

        if (userInsertError) throw userInsertError;

        userId = newUser.id;
      }

      // 2. Buat order
      const { data: order, error: orderError } =
        await supabase
          .from("orders")
          .insert({
            user_id: userId,
            customer_name: checkoutData.customerName,
            customer_email: checkoutData.customerEmail,
            customer_phone: checkoutData.customerPhone,
            shipping_address: checkoutData.shippingAddress,
            shipping_city: checkoutData.shippingCity,
            shipping_postal_code:
              checkoutData.shippingPostalCode,
            total_amount: subtotal,
            status: "paid",
          })
          .select("id")
          .single();

      if (orderError) throw orderError;

      // 3. Simpan order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_title: item.product_title,
        product_brand: item.product_brand,
        product_price: item.product_price,
        product_image: item.product_image,
        quantity: item.quantity,
        subtotal: item.product_price * item.quantity,
      }));

      const { error: orderItemsError } =
        await supabase
          .from("order_items")
          .insert(orderItems);

      if (orderItemsError) throw orderItemsError;

      // 4. Simpan payment
      const { data: payment, error: paymentError } =
        await supabase
          .from("payments")
          .insert({
            order_id: order.id,
            payment_method:
              checkoutData.paymentMethod,
            payment_status: "paid",
            amount: subtotal,
            paid_at: new Date().toISOString(),
          })
          .select("id")
          .single();

      if (paymentError) throw paymentError;

      // 5. Hapus isi cart
      const { data: cart } = await supabase
        .from("cart")
        .select("id")
        .limit(1)
        .maybeSingle();

      if (cart) {
        const { error: clearCartError } =
          await supabase
            .from("cart_items")
            .delete()
            .eq("cart_id", cart.id);

        if (clearCartError) throw clearCartError;
      }

      // 6. Simpan order ID untuk halaman confirmation
      sessionStorage.setItem(
        "skinora_order_id",
        order.id
      );

      sessionStorage.setItem(
        "skinora_payment_id",
        payment.id
      );

      sessionStorage.removeItem("skinora_checkout");

      window.location.href = `/order-success?order=${order.id}`;
    } catch (error) {
      console.error("Payment error:", error);
      alert(
        "Pembayaran gagal diproses. Silakan coba lagi."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Payment | SKINORA</title>
        </Head>

        <main className="flex min-h-screen items-center justify-center bg-[#F8F6F0]">
          <p className="text-sm text-[#26332B]/60">
            Loading payment...
          </p>
        </main>
      </>
    );
  }

  if (!checkoutData || items.length === 0) {
    return (
      <>
        <Head>
          <title>Payment | SKINORA</title>
        </Head>

        <main className="flex min-h-screen items-center justify-center bg-[#F8F6F0] px-6 text-[#26332B]">
          <div className="max-w-md text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
              Payment
            </p>

            <h1 className="mt-4 text-4xl font-medium">
              No payment data found.
            </h1>

            <p className="mt-5 text-sm leading-6 text-[#26332B]/60">
              Please return to checkout and complete your
              order information first.
            </p>

            <Link
              href="/cart"
              className="mt-8 inline-flex rounded-full bg-[#26332B] px-7 py-3.5 text-sm font-medium text-[#F8F6F0]"
            >
              Back to Cart
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Payment | SKINORA</title>
        <meta
          name="description"
          content="Complete your simulated SKINORA payment."
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

            <span className="text-sm text-[#26332B]/50">
              Secure Checkout
            </span>
          </div>
        </header>

        <section className="px-6 py-10 lg:px-10 lg:py-9">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#6F8F72]">
                Payment
              </p>

              <h1 className="mt-4 text-5xl font-medium tracking-[-0.04em]">
                Complete your payment.
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#26332B]/60">
                Review your payment details and complete
                the simulated transaction.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <div className="rounded-[2rem] bg-[#EEEAE0] p-7 md:p-9">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
                  Payment Method
                </p>

                <div className="mt-5 rounded-2xl bg-[#F8F6F0] p-6">
                  <p className="text-lg font-medium">
                    {
                      paymentLabels[
                        checkoutData.paymentMethod
                      ]
                    }
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#26332B]/55">
                    This is a simulated payment for the
                    technical assessment. No real payment
                    will be charged.
                  </p>
                </div>

                <div className="mt-8">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
                    Customer
                  </p>

                  <div className="mt-4 space-y-2 text-sm">
                    <p>
                      <span className="text-[#26332B]/50">
                        Name:
                      </span>{" "}
                      {checkoutData.customerName}
                    </p>

                    <p>
                      <span className="text-[#26332B]/50">
                        Email:
                      </span>{" "}
                      {checkoutData.customerEmail}
                    </p>

                    <p>
                      <span className="text-[#26332B]/50">
                        Phone:
                      </span>{" "}
                      {checkoutData.customerPhone}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
                    Shipping
                  </p>

                  <div className="mt-4 text-sm leading-6">
                    <p>{checkoutData.shippingAddress}</p>
                    <p>
                      {checkoutData.shippingCity},{" "}
                      {checkoutData.shippingPostalCode}
                    </p>
                  </div>
                </div>
              </div>

              <aside className="h-fit rounded-[2rem] bg-[#26332B] p-7 text-[#F8F6F0] lg:sticky lg:top-8">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#DCE8DC]">
                  Order Summary
                </p>

                <h2 className="mt-3 text-2xl font-medium">
                  Your order
                </h2>

                <div className="mt-7 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between gap-4 text-sm"
                    >
                      <div>
                        <p className="leading-5">
                          {item.product_title}
                        </p>

                        <p className="mt-1 text-xs text-[#F8F6F0]/45">
                          Qty {item.quantity}
                        </p>
                      </div>

                      <span className="shrink-0">
                        {formatPrice(
                          item.product_price *
                            item.quantity
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 border-t border-[#F8F6F0]/15 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#F8F6F0]/55">
                      Total
                    </span>

                    <span className="text-xl font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="mt-8 flex w-full items-center justify-between rounded-full bg-[#F8F6F0] px-6 py-4 text-sm font-medium text-[#26332B] transition hover:bg-[#DCE8DC] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>
                    {isProcessing
                      ? "Processing Payment..."
                      : "Pay Now"}
                  </span>

                  <span className="text-lg">
                    →
                  </span>
                </button>

                <p className="mt-5 text-center text-xs leading-5 text-[#F8F6F0]/40">
                  Simulation only — no real payment is
                  processed.
                </p>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}