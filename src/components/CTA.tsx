import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#F1EBDD] px-6 py-24 lg:px-10 lg:py-28">
      {/* DECORATIVE SHAPES */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="absolute -right-16 top-10 h-52 w-52 rounded-full border border-[#6F8F72]/20 md:-right-10 md:h-64 md:w-64"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute right-16 top-24 h-3 w-3 rounded-full bg-[#6F8F72]/50"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="absolute bottom-16 left-10 h-2 w-2 rounded-full bg-[#6F8F72]/40"
      />

      <motion.span
        initial={{ opacity: 0, rotate: -20 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute right-24 top-16 text-xl text-[#6F8F72]/60"
      >
        ✦
      </motion.span>

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#6F8F72]/40" />

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#6F8F72]">
              Start Your Routine
            </p>

            <span className="h-px w-8 bg-[#6F8F72]/40" />
          </div>

          <h2 className="mx-auto max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-[#26332B] md:text-7xl">
            Find your next
            <br />
            <span className="text-[#6F8F72]">skincare essential.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#26332B]/55 md:text-base">
            Explore our skincare collection and discover products that fit
            naturally into your everyday routine.
          </p>

          <motion.a
            href="#products"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#26332B] px-7 py-3.5 text-sm font-medium text-[#F8F6F0] transition-colors hover:bg-[#6F8F72]"
          >
            <span>Explore Products</span>
            <span className="text-base">→</span>
          </motion.a>

          <div className="mt-10 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.18em] text-[#26332B]/35">
            <span>Little ritual</span>
            <span className="text-[#6F8F72]">✦</span>
            <span>Every day</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}