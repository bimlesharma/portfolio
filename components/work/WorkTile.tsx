"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  type WorkItem,
  workDemoLabel,
  workGithubLabel,
  workHref,
  workKindLabel,
} from "@/lib/work";

type WorkTileProps = {
  item: WorkItem;
  index?: number;
};

function useAlwaysShowCtas(): boolean {
  const [always, setAlways] = useState(false);

  useEffect(() => {
    const hoverNone = window.matchMedia("(hover: none)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const update = () => setAlways(hoverNone.matches || coarse.matches);
    update();
    hoverNone.addEventListener("change", update);
    coarse.addEventListener("change", update);
    return () => {
      hoverNone.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
    };
  }, []);

  return always;
}

const ctaBase =
  "inline-flex items-center justify-center rounded-lg px-3.5 py-2 text-xs font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 sm:text-sm";

export default function WorkTile({ item, index = 0 }: WorkTileProps) {
  const href = workHref(item);
  const reduceMotion = useReducedMotion();
  const alwaysShowCtas = useAlwaysShowCtas();
  const demoLabel = workDemoLabel(item.kind);
  const githubLabel = workGithubLabel(item);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        delay: reduceMotion ? 0 : index * 0.06,
      }}
      className="relative h-full"
    >
      <div aria-hidden className="pointer-events-none aspect-[16/10] w-full" />

      <div className="group absolute inset-0 overflow-hidden rounded-2xl border border-white/12 bg-slate-950 shadow-[0_14px_40px_-20px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/5">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className={`object-cover transition-transform duration-[650ms] ease-out will-change-transform ${
            reduceMotion
              ? ""
              : "group-hover:scale-[1.04] group-focus-within:scale-[1.04]"
          }`}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 ease-out group-hover:bg-black/35 group-focus-within:bg-black/35"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-70"
          style={{
            background: `linear-gradient(to top, ${item.color}40, transparent)`,
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-center scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-within:scale-y-100"
          style={{ backgroundColor: item.color }}
        />

        {/* Primary card surface → detail */}
        <Link
          href={href}
          className="absolute inset-0 z-[1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
          aria-label={`${item.title} details`}
        />

        <span
          className="pointer-events-none absolute left-3 top-3 z-10 rounded-md border border-white/20 px-2.5 py-1 text-[11px] font-bold tracking-wider text-white uppercase shadow-md backdrop-blur-md sm:left-4 sm:top-4"
          style={{
            backgroundColor: item.color,
            boxShadow: `0 8px 20px -10px ${item.color}`,
          }}
        >
          {workKindLabel(item.kind)}
        </span>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col p-4 sm:p-5 md:p-6">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] sm:text-2xl">
              {item.title}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-white/85 sm:text-[15px]">
              {item.tagline}
            </p>
          </div>

          <div
            className={
              alwaysShowCtas
                ? "pointer-events-auto mt-3.5 flex flex-wrap items-center gap-2 opacity-100"
                : "pointer-events-none mt-0 flex max-h-0 flex-wrap items-center gap-2 overflow-hidden opacity-0 transition-[opacity,margin,max-height] duration-300 ease-out group-hover:pointer-events-auto group-hover:mt-3.5 group-hover:max-h-14 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:mt-3.5 group-focus-within:max-h-14 group-focus-within:opacity-100"
            }
          >
            {item.demo ? (
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaBase} text-white hover:brightness-110`}
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 8px 22px -10px ${item.color}`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {demoLabel}
              </a>
            ) : null}
            {item.github ? (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaBase} border border-white/30 bg-white/12 text-white backdrop-blur-md hover:bg-white/22`}
                onClick={(e) => e.stopPropagation()}
              >
                {githubLabel}
              </a>
            ) : null}
            <Link
              href={href}
              className={`${ctaBase} border border-white/25 bg-black/55 text-white backdrop-blur-md hover:bg-black/75`}
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
