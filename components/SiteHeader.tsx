"use client";

import { useEffect, useId, useRef, useState, type ElementType, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Terminal,
  Twitter,
} from "lucide-react";
import { pageFrameClass } from "@/components/PageFrame";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CLEANPULSE = "https://cleanpulse.bimlesh.dev";

const contactLinks = [
  { label: "Contact form", href: "/contact", icon: MessageSquare },
  { label: "Email", href: "mailto:bimlesh.mdb@gmail.com", icon: Mail },
  { label: "X", href: "https://twitter.com/bimlesharma", icon: Twitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bimlesharma/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/bimlesharma", icon: Github },
];

const unfold = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.7 };

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

function navActive(pathname: string, id: "work" | "resume" | "blog") {
  if (id === "work") return pathname.startsWith("/projects") || pathname.startsWith("/products");
  if (id === "resume") return pathname.startsWith("/resume");
  return pathname.startsWith("/blog");
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const mobileContactRef = useRef<HTMLDivElement>(null);
  const contactId = useId();

  useEffect(() => {
    setContactOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!contactOpen) return;

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (contactRef.current?.contains(target) || mobileContactRef.current?.contains(target)) return;
      setContactOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setContactOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [contactOpen]);

  if (pathname.startsWith("/studio")) return null;

  const cells = [
    { id: "work" as const, label: "Work", href: "/#work", icon: Terminal },
    { id: "resume" as const, label: "Resume", href: "/resume", icon: FileText },
    { id: "blog" as const, label: "Blog", href: "/blog", icon: BookOpen },
  ];

  return (
    <>
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center py-4 transition-colors duration-300",
          scrolled && "border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl"
        )}
      >
        <div className={cn(pageFrameClass, "pointer-events-auto relative flex h-10 items-center justify-between")}>
          <Link href="/" className="hidden text-sm font-semibold tracking-tight text-zinc-50 sm:block">
            Bimlesh
          </Link>

          <DockRow
            className="flex-1 justify-center md:hidden"
            cells={cells}
            pathname={pathname}
            expandable={false}
            contactOpen={contactOpen}
            contactId={`${contactId}-mobile`}
            contactRef={mobileContactRef}
            onToggleContact={() => setContactOpen((value) => !value)}
            onCloseContact={() => setContactOpen(false)}
          />

          <DockRow
            className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex"
            cells={cells}
            pathname={pathname}
            expandable
            contactOpen={contactOpen}
            contactId={`${contactId}-desktop`}
            contactRef={contactRef}
            onToggleContact={() => setContactOpen((value) => !value)}
            onCloseContact={() => setContactOpen(false)}
          />

          <Button asChild size="sm">
            <a href={CLEANPULSE} target="_blank" rel="noopener noreferrer">
              CleanPulse
              <span className="bg-primary-foreground px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-widest text-primary uppercase">
                Featured
              </span>
            </a>
          </Button>
        </div>
      </header>
    </>
  );
}

function DockRow({
  cells,
  pathname,
  expandable,
  contactOpen,
  contactId,
  contactRef,
  onToggleContact,
  onCloseContact,
  className,
}: {
  cells: { id: "work" | "resume" | "blog"; label: string; href: string; icon: ElementType }[];
  pathname: string;
  expandable: boolean;
  contactOpen: boolean;
  contactId: string;
  contactRef: RefObject<HTMLDivElement | null>;
  onToggleContact: () => void;
  onCloseContact: () => void;
  className?: string;
}) {
  return (
    <nav aria-label="Primary" className={cn("flex items-center gap-2", className)}>
      {cells.map((item) => (
        <DockCell
          key={item.id}
          label={item.label}
          href={item.href}
          icon={item.icon}
          expandable={expandable}
          active={navActive(pathname, item.id)}
        />
      ))}
      <div ref={contactRef} className="relative">
        <DockCell
          label="Contact"
          icon={Mail}
          expandable={expandable}
          active={contactOpen || pathname.startsWith("/contact")}
          onClick={onToggleContact}
          controls={contactId}
          expanded={contactOpen}
        />
        {contactOpen ? <ContactMenu id={contactId} onNavigate={onCloseContact} /> : null}
      </div>
    </nav>
  );
}

function ContactMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  return (
    <div
      id={id}
      className="absolute top-[calc(100%+0.75rem)] left-1/2 z-50 min-w-48 -translate-x-1/2 border border-zinc-700 bg-zinc-950/95 p-1 shadow-xl backdrop-blur-xl"
    >
      {contactLinks.map((item) => (
        <ContactLink key={item.label} href={item.href} icon={item.icon} onNavigate={onNavigate}>
          {item.label}
        </ContactLink>
      ))}
    </div>
  );
}

function DockCell({
  label,
  href,
  icon: Icon,
  expandable,
  active,
  onClick,
  controls,
  expanded,
}: {
  label: string;
  href?: string;
  icon: ElementType;
  expandable: boolean;
  active?: boolean;
  onClick?: () => void;
  controls?: string;
  expanded?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const showLabel = expandable && (hovered || Boolean(active) || Boolean(expanded));

  const tile = (
    <span
      className={cn(
        "flex h-10 items-center overflow-hidden border transition-colors duration-200",
        showLabel || active
          ? "border-zinc-500 bg-zinc-800 text-white"
          : "border-zinc-700/80 bg-zinc-950/40 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center">
        <Icon className="size-5" />
      </span>
      <AnimatePresence initial={false}>
        {showLabel ? (
          <motion.span
            key="label"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={unfold}
            className="overflow-hidden"
          >
            <span className="block pr-3 text-xs font-medium whitespace-nowrap">{label}</span>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );

  const hover = expandable
    ? {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
        onFocus: () => setHovered(true),
        onBlur: () => setHovered(false),
      }
    : {};

  if (onClick) {
    return (
      <button
        type="button"
        className="relative"
        aria-label={label}
        aria-expanded={expanded}
        aria-controls={controls}
        onClick={onClick}
        {...hover}
      >
        {tile}
      </button>
    );
  }

  if (href && (isExternal(href) || href.endsWith(".pdf"))) {
    return (
      <a
        href={href}
        aria-label={label}
        target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="relative"
        {...hover}
      >
        {tile}
      </a>
    );
  }

  return (
    <Link href={href ?? "/"} aria-label={label} className="relative" {...hover}>
      {tile}
    </Link>
  );
}

function ContactLink({
  href,
  icon: Icon,
  children,
  onNavigate,
}: {
  href: string;
  icon: ElementType;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  const className = "flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white";
  const content = (
    <>
      <Icon className="size-4 shrink-0 text-zinc-400" />
      {children}
    </>
  );
  if (isExternal(href)) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={className} onClick={onNavigate}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {content}
    </Link>
  );
}
