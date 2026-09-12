"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import WorkTile from "@/components/work/WorkTile";
import { Badge } from "@/components/ui/badge";
import { getWorkByKind } from "@/lib/work";

export default function WorkSection() {
  const products = getWorkByKind("product");
  const projects = getWorkByKind("project");
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="work"
      className="relative overflow-x-hidden bg-background py-12"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.4 }}
          className="mb-8 text-center"
        >
          <Badge variant="outline" className="mb-3">
            Selected work
          </Badge>

          <h2 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            My Work
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Shipping products and building projects across full-stack, AI, and
            systems.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          <div>
            <div className="mb-3 flex items-baseline justify-between gap-4 sm:mb-4">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Products
              </h3>
              <Link
                href="/products"
                className="text-xs font-medium text-muted-foreground transition hover:text-foreground"
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
              <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Projects
              </h3>
              <Link
                href="/projects"
                className="text-xs font-medium text-muted-foreground transition hover:text-foreground"
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
