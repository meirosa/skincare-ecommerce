import { motion } from "framer-motion";

const morningRoutine = [
  {
    number: "01",
    title: "Cleanse",
    description: "Start fresh",
  },
  {
    number: "02",
    title: "Treat",
    description: "Target your needs",
  },
  {
    number: "03",
    title: "Hydrate",
    description: "Keep skin balanced",
  },
  {
    number: "04",
    title: "Protect",
    description: "Finish with SPF",
  },
];

const eveningRoutine = [
  {
    number: "01",
    title: "Cleanse",
    description: "Reset your skin",
  },
  {
    number: "02",
    title: "Treat",
    description: "Give targeted care",
  },
  {
    number: "03",
    title: "Hydrate",
    description: "Restore moisture",
  },
];

export default function OurRoutine() {
  return (
    <section
      id="routine"
      className="border-t border-[#26332B]/10 bg-[#DCE8D9] px-6 py-16 text-[#26332B] lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#6F8F72]/50" />

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#6F8F72]">
              Our Routine
            </p>

            <span className="h-px w-8 bg-[#6F8F72]/50" />
          </div>

          <h2 className="text-4xl font-medium leading-[1.08] tracking-[-0.04em] md:text-5xl">
            A little ritual,
            <br />
            every day.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#26332B]/55 md:text-base">
            Keep it simple, stay consistent, and give your skin the care it
            needs from morning to night.
          </p>
        </motion.div>

        {/* ROUTINE PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="mt-10 overflow-hidden rounded-[2rem] bg-[#F8F6F0] shadow-[0_20px_60px_rgba(38,51,43,0.08)] lg:mt-12"
        >
          {/* MORNING */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{
                    rotate: 12,
                    scale: 1.05,
                  }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8E4D3] text-xl text-[#6F8F72]"
                >
                  ☼
                </motion.div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#6F8F72]">
                    Morning
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-[#26332B]">
                    Start your day gently.
                  </h3>
                </div>
              </div>

              <p className="max-w-xs text-sm leading-6 text-[#26332B]/50 sm:text-right">
                Freshen up, nourish your skin, and finish with daily
                protection.
              </p>
            </div>

            {/* MORNING TIMELINE */}
            <div className="mt-10 grid gap-7 sm:grid-cols-4 sm:gap-0">
              {morningRoutine.map((routine, index) => (
                <motion.div
                  key={routine.number}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.4,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="relative flex gap-4 sm:block"
                >
                  {/* HORIZONTAL LINE - DESKTOP */}
                  {index < morningRoutine.length - 1 && (
                    <span className="absolute left-7 right-0 top-3.5 hidden h-px bg-[#6F8F72]/30 sm:block" />
                  )}

                  {/* VERTICAL LINE - MOBILE */}
                  {index < morningRoutine.length - 1 && (
                    <span className="absolute left-[13px] top-7 h-[calc(100%+28px)] w-px bg-[#6F8F72]/25 sm:hidden" />
                  )}

                  {/* DOT */}
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#6F8F72]/40 bg-[#F8F6F0]">
                    <span className="h-2 w-2 rounded-full bg-[#6F8F72]" />
                  </div>

                  {/* CONTENT */}
                  <div className="pt-0 sm:mt-5">
                    <span className="text-xs font-semibold tracking-[0.15em] text-[#6F8F72]">
                      {routine.number}
                    </span>

                    <h4 className="mt-1 text-lg font-semibold text-[#26332B]">
                      {routine.title}
                    </h4>

                    <p className="mt-1 text-sm leading-5 text-[#26332B]/60">
                      {routine.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* DIVIDER */}
          <div className="mx-6 border-t border-[#26332B]/10 sm:mx-8 lg:mx-10" />

          {/* EVENING */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{
                    rotate: -10,
                    scale: 1.05,
                  }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8DDD2] text-xl text-[#6F8F72]"
                >
                  ☾
                </motion.div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#6F8F72]">
                    Evening
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-[#26332B]">
                    Slow down and restore.
                  </h3>
                </div>
              </div>

              <p className="max-w-xs text-sm leading-6 text-[#26332B]/50 sm:text-right">
                Reset the day, give your skin targeted care, and let it
                recharge overnight.
              </p>
            </div>

            {/* EVENING TIMELINE */}
            <div className="mt-10 grid gap-7 sm:grid-cols-3 sm:gap-0">
              {eveningRoutine.map((routine, index) => (
                <motion.div
                  key={routine.number}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.4,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="relative flex gap-4 sm:block"
                >
                  {/* HORIZONTAL LINE - DESKTOP */}
                  {index < eveningRoutine.length - 1 && (
                    <span className="absolute left-7 right-0 top-3.5 hidden h-px bg-[#6F8F72]/30 sm:block" />
                  )}

                  {/* VERTICAL LINE - MOBILE */}
                  {index < eveningRoutine.length - 1 && (
                    <span className="absolute left-[13px] top-7 h-[calc(100%+28px)] w-px bg-[#6F8F72]/25 sm:hidden" />
                  )}

                  {/* DOT */}
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#6F8F72]/40 bg-[#F8F6F0]">
                    <span className="h-2 w-2 rounded-full bg-[#6F8F72]" />
                  </div>

                  {/* CONTENT */}
                  <div className="pt-0 sm:mt-5">
                    <span className="text-xs font-semibold tracking-[0.15em] text-[#6F8F72]">
                      {routine.number}
                    </span>

                    <h4 className="mt-1 text-lg font-semibold text-[#26332B]">
                      {routine.title}
                    </h4>

                    <p className="mt-1 text-sm leading-5 text-[#26332B]/60">
                      {routine.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* LITTLE SKIN NOTE */}
          <div className="border-t border-[#26332B]/10 bg-[#EEEAE0]/60 px-6 py-5 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#26332B]/55">
                ✦ Your routine doesn&apos;t have to be perfect.
              </p>

              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6F8F72]">
                Consistency over complexity.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}