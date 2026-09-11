"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import WorkTile from "@/components/work/WorkTile";
import { getWorkByKind } from "@/lib/work";

export default function WorkSection() {
  const products = getWorkByKind("product");
  const projects = getWorkByKind("project");
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
              Selected work
            </span>
          </motion.div>

          <h2 className="mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-5xl leading-tight font-bold text-transparent dark:from-purple-400 dark:via-blue-400 dark:to-emerald-400 lg:text-6xl">
            My Work
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 lg:text-xl">
            Shipping products and building projects across full-stack, AI, and
            systems.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 sm:gap-10">
          <div>
            <div className="mb-3 flex items-baseline justify-between gap-4 sm:mb-4">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">
                Products
              </h3>
              <Link
                href="/products"
                className="text-xs font-medium text-slate-500 transition hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5">
              {products.map((item, index) => (
                <WorkTile key={item.slug} item={item} index={index} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-baseline justify-between gap-4 sm:mb-4">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">
                Projects
              </h3>
              <Link
                href="/projects"
                className="text-xs font-medium text-slate-500 transition hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5">
              {projects.map((item, index) => (
                <WorkTile
                  key={item.slug}
                  item={item}
                  index={products.length + index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
