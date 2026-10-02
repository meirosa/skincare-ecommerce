import { motion } from "framer-motion";

const routines = [
  {
    number: "01",
    title: "Cleanse",
    description:
      "Start your routine by gently cleansing the skin and removing daily impurities.",
  },
  {
    number: "02",
    title: "Treat",
    description:
      "Add targeted skincare products according to what your skin needs.",
  },
  {
    number: "03",
    title: "Hydrate",
    description:
      "Keep your skin feeling comfortable and hydrated throughout the day.",
  },
  {
    number: "04",
    title: "Protect",
    description:
      "Finish your daytime routine with protection for your skin.",
  },
];

export default function OurRoutine() {
  return (
    <section
      id="routine"
      className="bg-[#26332B] px-6 py-24 text-[#F8F6F0] lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#AFC5AF]">
            Our Routine
          </p>

          <h2 className="text-4xl font-medium tracking-[-0.03em] md:text-5xl">
            Build a routine that feels right for you.
          </h2>

          <p className="mt-6 leading-7 text-[#F8F6F0]/60">
            Skincare does not have to be complicated. Discover the basic
            stages of a routine and choose products according to your needs.
          </p>
        </motion.div>

        <div className="mt-16 divide-y divide-[#F8F6F0]/15 border-y border-[#F8F6F0]/15">
          {routines.map((routine, index) => (
            <motion.div
              key={routine.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
              }}
              className="grid gap-4 py-8 md:grid-cols-[100px_1fr_1.5fr] md:items-center"
            >
              <span className="text-sm text-[#AFC5AF]">
                {routine.number}
              </span>

              <h3 className="text-2xl font-medium">{routine.title}</h3>

              <p className="max-w-lg text-sm leading-6 text-[#F8F6F0]/55">
                {routine.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}