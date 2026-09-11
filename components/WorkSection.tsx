"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import WorkTile from "@/components/work/WorkTile";
import { getAllWork } from "@/lib/work";

export default function WorkSection() {
  const items = getAllWork();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="work"
      className="relative min-h-screen overflow-x-hidden bg-slate-50 py-32 dark:bg-slate-950"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="absolute top-1/4 -left-48 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
        />
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }
          }
          className="absolute bottom-1/4 -right-48 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block"
          >
            <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-5 py-1.5 text-sm font-semibold text-purple-300 backdrop-blur-sm">
              Portfolio
            </span>
          </motion.div>

          <h2 className="mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-5xl leading-tight font-bold text-transparent dark:from-purple-400 dark:via-blue-400 dark:to-emerald-400 lg:text-6xl">
            My Work
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 lg:text-xl">
            Products I ship and projects I build.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {items.map((item, index) => (
            <WorkTile
              key={item.slug}
              item={item}
              index={index}
              featured={item.featured}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link
            href="/products"
            className="font-medium text-slate-500 transition hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
          >
            All products →
          </Link>
          <Link
            href="/projects"
            className="font-medium text-slate-500 transition hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
          >
            All projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
