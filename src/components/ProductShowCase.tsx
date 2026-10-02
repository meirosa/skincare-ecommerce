import { motion } from "framer-motion";
import Link from "next/link";

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

type ProductShowcaseProps = {
  products: Product[];
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

export default function ProductShowcase({
  products,
}: ProductShowcaseProps) {
  return (
    <section
      id="products"
      className="bg-[#F8F6F0] px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#6F8F72]">
              Our Products
            </p>

            <h2 className="max-w-2xl text-4xl font-medium tracking-[-0.03em] text-[#26332B] md:text-5xl">
              Skincare made for your everyday ritual.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-[#26332B]/55">
            Explore our skincare collection and discover products
            that fit naturally into your everyday routine.
          </p>
        </motion.div>

        {/* PRODUCTS */}
        {products.length > 0 ? (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="group"
              >

                {/* PRODUCT IMAGE */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#EEEAE0]">

                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {/* CATEGORY */}
                  <div className="absolute left-4 top-4 rounded-full bg-[#F8F6F0]/90 px-3 py-1.5 backdrop-blur-sm">
                    <span className="text-xs capitalize text-[#26332B]">
                      {product.category}
                    </span>
                  </div>

                  {/* VIEW PRODUCT */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Link
                      href={`/product/${product.id}`}
                      className="flex w-full items-center justify-between rounded-full bg-[#26332B]/95 px-5 py-3 text-sm font-medium text-[#F8F6F0] backdrop-blur-sm transition-colors hover:bg-[#6F8F72]"
                    >
                      <span>View Product</span>

                      <span className="text-lg">
                        →
                      </span>
                    </Link>
                  </div>
                </div>

                {/* PRODUCT INFORMATION */}
                <div className="mt-5">

                  {/* BRAND */}
                  <p className="text-xs uppercase tracking-[0.15em] text-[#6F8F72]">
                    {product.brand || "Skincare"}
                  </p>

                  {/* PRODUCT NAME */}
                  <h3 className="mt-2 line-clamp-2 text-lg font-medium leading-6 text-[#26332B]">
                    {product.title}
                  </h3>

                  {/* PRICE + STOCK */}
                  <div className="mt-3 flex items-center justify-between gap-4">

                    <p className="text-sm font-medium text-[#26332B]">
                      {formatPrice(product.price)}
                    </p>

                    <span className="text-xs text-[#26332B]/45">
                      In stock
                    </span>

                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (

          /* EMPTY STATE */
          <div className="rounded-[1.5rem] bg-[#EEEAE0] px-6 py-16 text-center">
            <p className="text-sm text-[#26332B]/60">
              Product belum dapat dimuat. Silakan coba lagi.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}