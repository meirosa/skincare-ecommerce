import { motion } from "framer-motion";

type AboutUsProps = {
  entered?: boolean;
};

export default function AboutUs({
  entered = false,
}: AboutUsProps) {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-[#F8F6F0] px-6 lg:px-10"
    >
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#DCE8DC]/40 blur-3xl" />

      <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-[#E9DED2]/40 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center">
        <div className="grid w-full items-center gap-16 py-20 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={
              entered
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -80 }
            }
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-[#6F8F72]">
              About SKINORA
            </p>

            <h2 className="max-w-xl text-5xl font-medium leading-[1.02] tracking-[-0.045em] text-[#26332B] md:text-6xl lg:text-7xl">
              Your skin,
              <br />
              your ritual.
            </h2>

            <p className="mt-8 max-w-lg text-base leading-8 text-[#26332B]/65">
              SKINORA creates a simple and thoughtful skincare shopping
              experience. Explore a curated selection of skincare products,
              discover their details, and find essentials that fit naturally
              into your everyday routine.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-12 bg-[#6F8F72]" />

              <p className="text-sm tracking-wide text-[#26332B]/60">
                Discover. Choose. Care.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={
              entered
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: 80 }
            }
            transition={{
              duration: 1.1,
              delay: 0.25,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="relative pt-8 lg:pt-16"
          >
            <div className="relative mx-auto max-w-lg">
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DCE8DC] blur-3xl"
              />

              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 0.4, 0, -0.4, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 overflow-hidden rounded-[2.5rem] bg-[#DCE8DC] shadow-2xl"
              >
                <img
                  src="/image/skincare-collection.png"
                  alt="SKINORA skincare collection"
                  className="h-[540px] w-full object-cover"
                />

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={
                    entered
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 15 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.8,
                  }}
                  className="absolute bottom-6 right-6 rounded-2xl bg-[#F8F6F0]/95 px-5 py-4 shadow-lg backdrop-blur-md"
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6F8F72]">
                    SKINORA COLLECTION
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#26332B]">
                    Everyday essentials
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}