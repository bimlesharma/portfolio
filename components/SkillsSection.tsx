"use client";

import { useCallback, useLayoutEffect, useRef, useState, type ElementType } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiTailwindcss,
  SiJavascript,
  SiGit,
  SiExpress,
  SiRedis,
  SiGraphql,
  SiFastapi,
  SiFirebase,
  SiVercel,
  SiNginx,
  SiSupabase,
  SiKubernetes,
  SiTauri,
  SiRust,
  SiGooglecloud,
  SiClerk,
  SiClickhouse,
} from "react-icons/si";
import { FaGolang, FaAws } from "react-icons/fa6";

type Tone = "dark" | "light";

type Skill = {
  name: string;
  icon: ElementType;
  category: string;
  /** Whole or half years. Values under 1 render as "<1". */
  years: number;
};

const SKILLS: Skill[] = [
  { name: "JavaScript", icon: SiJavascript, category: "Language", years: 3 },
  { name: "TypeScript", icon: SiTypescript, category: "Language", years: 3 },
  { name: "Python", icon: SiPython, category: "Language", years: 1 },
  { name: "Go", icon: FaGolang, category: "Language", years: 1 },
  { name: "Rust", icon: SiRust, category: "Language", years: 0.5 },

  { name: "React.js", icon: SiReact, category: "Frontend", years: 3 },
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend", years: 3 },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend", years: 3 },
  { name: "Tauri", icon: SiTauri, category: "Frontend", years: 0.5 },

  { name: "Node.js", icon: SiNodedotjs, category: "Backend", years: 3 },
  { name: "Express.js", icon: SiExpress, category: "Backend", years: 3 },
  { name: "Nginx", icon: SiNginx, category: "Backend", years: 1.5 },
  { name: "FastAPI", icon: SiFastapi, category: "Backend", years: 1 },

  { name: "MongoDB", icon: SiMongodb, category: "Database", years: 3 },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Database", years: 1 },
  { name: "Redis", icon: SiRedis, category: "Database", years: 1 },
  { name: "Supabase", icon: SiSupabase, category: "Database", years: 1 },
  { name: "ClickHouse", icon: SiClickhouse, category: "Database", years: 0.5 },

  { name: "GraphQL", icon: SiGraphql, category: "API", years: 1 },

  { name: "Vercel", icon: SiVercel, category: "Cloud", years: 3 },
  { name: "AWS", icon: FaAws, category: "Cloud", years: 1.5 },
  { name: "GCP", icon: SiGooglecloud, category: "Cloud", years: 1.5 },
  { name: "Firebase", icon: SiFirebase, category: "Cloud", years: 1 },

  { name: "Docker", icon: SiDocker, category: "DevOps", years: 1 },
  { name: "Kubernetes", icon: SiKubernetes, category: "DevOps", years: 1 },

  { name: "Git", icon: SiGit, category: "Tools", years: 3 },
  { name: "Clerk", icon: SiClerk, category: "Tools", years: 0.5 },
];

function yearsLabel(years: number): string {
  if (years < 1) return "<1";
  return `${years}+`;
}

function checkerTones(count: number, cols: number): Tone[] {
  return Array.from({ length: count }, (_, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    return (row + col) % 2 === 0 ? "dark" : "light";
  });
}

function neighbor(index: number, cols: number, count: number, key: string): number | null {
  const row = Math.floor(index / cols);
  const col = index % cols;
  const rows = Math.ceil(count / cols);
  const delta =
    key === "ArrowUp"
      ? [-1, 0]
      : key === "ArrowDown"
        ? [1, 0]
        : key === "ArrowLeft"
          ? [0, -1]
          : key === "ArrowRight"
            ? [0, 1]
            : null;
  if (!delta) return null;

  const nextRow = row + delta[0];
  const nextCol = col + delta[1];
  if (nextRow < 0 || nextCol < 0 || nextCol >= cols || nextRow >= rows) return null;

  const next = nextRow * cols + nextCol;
  return next < count ? next : null;
}

function useBoardColumns() {
  const [cols, setCols] = useState(3);

  useLayoutEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const read = () => (lg.matches ? 9 : md.matches ? 6 : 3);
    const apply = () => setCols(read());
    apply();
    md.addEventListener("change", apply);
    lg.addEventListener("change", apply);
    return () => {
      md.removeEventListener("change", apply);
      lg.removeEventListener("change", apply);
    };
  }, []);

  return cols;
}

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const activeRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const reduce = reduceMotion === true;
  const isInView = useInView(ref, {
    once: true,
    amount: 0.15,
    margin: "80px",
  });
  const cols = useBoardColumns();
  const [tones, setTones] = useState<Tone[]>(() => checkerTones(SKILLS.length, 3));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (activeRef.current !== null) return;
    setTones(checkerTones(SKILLS.length, cols));
  }, [cols]);

  const moveTo = useCallback((next: number) => {
    const prev = activeRef.current;
    if (prev === next) return;
    if (prev !== null) {
      setTones((current) => {
        const copy = current.slice();
        const swap = copy[prev];
        copy[prev] = copy[next];
        copy[next] = swap;
        return copy;
      });
    }
    activeRef.current = next;
    setActiveIndex(next);
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative overflow-x-hidden bg-background py-12"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(161, 161, 170, 0.45) 1px, transparent 1px),
              linear-gradient(90deg, rgba(161, 161, 170, 0.45) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reduce ? 0 : 0.5 }}
        >
          <SectionHeader
            eyebrow="Selected skills"
            title="Skills"
            description="Tools I use to ship."
          />
        </motion.div>

        <div
          aria-label="Skills"
          className="grid grid-cols-3 gap-px rounded-none bg-zinc-950 p-px md:grid-cols-6 lg:grid-cols-9"
        >
          {SKILLS.map((skill, index) => {
            const active = index === activeIndex;
            const tone = tones[index] ?? "dark";
            const Icon = skill.icon;

            return (
              <button
                key={skill.name}
                ref={(node) => {
                  buttons.current[index] = node;
                }}
                type="button"
                aria-pressed={active}
                aria-label={`${skill.name}, ${yearsLabel(skill.years)}, ${skill.category}`}
                onPointerEnter={(event) => {
                  if (event.pointerType !== "mouse") return;
                  moveTo(index);
                }}
                onClick={() => moveTo(index)}
                onFocus={() => moveTo(index)}
                onKeyDown={(event) => {
                  const next = neighbor(index, cols, SKILLS.length, event.key);
                  if (next == null) return;
                  event.preventDefault();
                  buttons.current[next]?.focus();
                }}
                className={`relative flex min-h-16 flex-col items-center justify-center gap-1 px-1.5 py-2 text-center select-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-zinc-300 focus-visible:outline-offset-2 sm:min-h-[4.75rem] ${
                  reduce ? "transition-none" : "transition-colors duration-300"
                } ${tone === "dark" ? "bg-zinc-800" : "bg-zinc-700"}`}
              >
                {active ? (
                  <motion.span
                    layoutId={reduce ? undefined : "skill-king"}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-white"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                    }
                  />
                ) : null}
                <span className="relative z-10 flex flex-col items-center gap-1">
                  <Icon
                    size={18}
                    aria-hidden
                    className={`shrink-0 ${active ? "text-zinc-900" : "text-zinc-200"}`}
                  />
                  <span
                    className={`line-clamp-2 text-[11px] leading-tight font-semibold sm:text-xs ${
                      active ? "text-zinc-900" : "text-zinc-100"
                    }`}
                  >
                    {skill.name}
                  </span>
                  <span
                    className={`text-[10px] font-medium tabular-nums ${
                      active ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  >
                    {yearsLabel(skill.years)}
                  </span>
                  <span
                    className={`text-[9px] font-semibold tracking-[0.14em] uppercase ${
                      active ? "text-zinc-500" : "invisible"
                    }`}
                  >
                    {skill.category}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
