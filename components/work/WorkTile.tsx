"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { type WorkItem, workHref, workKindLabel } from "@/lib/work";

type WorkTileProps = {
  item: WorkItem;
  index?: number;
  /** When true, spans two columns on md+ grids (homepage featured). */
  featured?: boolean;
};

export default function WorkTile({
  item,
  index = 0,
  featured = false,
}: WorkTileProps) {
  const href = workHref(item);
  const isFeatured = featured;
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        delay: reduceMotion ? 0 : index * 0.06,
      }}
      className={isFeatured ? "md:col-span-2" : undefined}
    >
      <Link
        href={href}
        className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200/60 bg-slate-900 dark:border-slate-800"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 transition-opacity duration-500 group-hover:from-black/80" />

        <span
          className="absolute left-3 top-3 rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white/95 backdrop-blur-sm"
          style={{ backgroundColor: `${item.color}cc` }}
        >
          {workKindLabel(item.kind)}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            {item.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-white/70">
            {item.tagline}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
