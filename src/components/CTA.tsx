import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="bg-[#F1EBDD] px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#6F8F72]">
            Start Your Routine
          </p>

          <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] text-[#26332B] md:text-6xl">
            Find your next skincare essential.
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-7 text-[#26332B]/60">
            Explore our skincare collection and discover products that fit
            naturally into your everyday routine.
          </p>

          <motion.a
            href="#products"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 inline-flex rounded-full bg-[#26332B] px-7 py-3.5 text-sm font-medium text-[#F8F6F0] transition-colors hover:bg-[#6F8F72]"
          >
            Explore Products
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}