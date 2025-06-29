import { useEffect, useState } from 'react';
import { FloatingDock } from '@/components/ui/floating-dock';
import { motion } from 'framer-motion';
import {
    IconBrandGithub,
    IconBrandX,
    IconHome,
    IconTerminal2,
    IconFileText,
    IconMail,
    IconBrandLinkedin,
} from "@tabler/icons-react";


export default function FloatingDockContainer() {
    const [scrollingDown, setScrollingDown] = useState(false);

    useEffect(() => {
        let lastY = window.scrollY;

        const handleScroll = () => {
            const currentY = window.scrollY;
            setScrollingDown(currentY > lastY);
            lastY = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        {
            title: "Home",
            icon: (
                <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Projects",
            icon: (
                <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#projects",
        },
        {
            title: "Blog",
            icon: (
                <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/blog",
        },
        {
            title: "Contact",
            icon: (
                <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#contact",
        },
        {
            title: "Twitter",
            icon: (
                <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "GitHub",
            icon: (
                <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "LinkedIn",
            icon: (
                <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
    ];

    return (
        <motion.div
            className="
    fixed bottom-8 left-1/2 -translate-x-1/2 z-50
  "
            initial={{ y: 0, opacity: 1 }}
            animate={{
                y: scrollingDown ? 100 : 0,
                opacity: scrollingDown ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <FloatingDock
                items={links}
            // desktopClassName="flex flex-col items-center gap-4"
            // mobileClassName="flex flex-row items-center gap-4"
            />
        </motion.div>


    )
}