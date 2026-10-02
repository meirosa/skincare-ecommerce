import { motion } from "framer-motion";

const categories = [
  {
    name: "Cleanse",
    description: "Gentle cleansing for a fresh start.",
  },
  {
    name: "Treat",
    description: "Targeted care for your skin needs.",
  },
  {
    name: "Hydrate",
    description: "Restore moisture and keep skin balanced.",
  },
  {
    name: "Protect",
    description: "Daily protection for healthy-looking skin.",
  },
];

export default function Categories() {
  const handleExplore = () => {
    document
      .getElementById("routine")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="categories"
      className="bg-[#DCE8DC] px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#6F8F72]">
            Explore
          </p>

          <h2 className="text-4xl font-medium tracking-[-0.03em] text-[#26332B] md:text-5xl">
            Find what your skin needs.
          </h2>

          <p className="mt-5 leading-7 text-[#26332B]/60">
            Explore the essential stages of an everyday skincare routine
            and discover what works best for your needs.
          </p>
        </motion.div>


        {/* =================================================
            ROUTINE STAGES
        ================================================= */}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{ y: -8 }}
              className="group min-h-[250px] rounded-[1.5rem] bg-[#F8F6F0] p-7 transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="flex h-full flex-col justify-between">

                <div>
                  <span className="text-sm text-[#6F8F72]">
                    0{index + 1}
                  </span>

                  <h3 className="mt-10 text-2xl font-medium text-[#26332B]">
                    {category.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#26332B]/55">
                    {category.description}
                  </p>
                </div>


                {/* =================================================
                    EXPLORE BUTTON
                ================================================= */}

                <button
                  type="button"
                  onClick={handleExplore}
                  className="mt-8 flex w-full items-center justify-between text-left"
                >
                  <span className="text-sm text-[#26332B]/50 transition-colors duration-300 group-hover:text-[#26332B]">
                    Explore
                  </span>

                  <span className="text-xl text-[#6F8F72] transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </button>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}