import { useEffect, useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { motion } from "framer-motion";
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

        // const handleScroll = () => {
        //     const currentY = window.scrollY;
        //     const delta = currentY - lastY;

        //     if (Math.abs(delta) > 10) {
        //         setScrollingDown(delta > 0);
        //         lastY = currentY;
        //     }
        // };
        const handleScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastY;

            if (Math.abs(delta) > 10) {
                if (currentY > 100) {  // only hide/show dock if scrolled down enough
                    setScrollingDown(delta > 0);
                } else {
                    setScrollingDown(false); // always show dock near top
                }
                lastY = currentY;
            }
        };


        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        {
            title: "Home",
            icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "#",
        },
        {
            title: "Projects",
            icon: <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "#projects",
        },
        {
            title: "Blog",
            icon: <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "/blog",
        },
        {
            title: "Contact",
            icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "#contact",
        },
        {
            title: "Twitter",
            icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "https://twitter.com/bimlesharma",
        },
        {
            title: "GitHub",
            icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "https://github.com/bimlesharma",
        },
        {
            title: "LinkedIn",
            icon: <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "https://www.linkedin.com/in/bimlesharma/",
        },
    ];

    return (
        <motion.div
            className="fixed bottom-4 z-50 -translate-x-1/2 left-1/2 md:left-1/2 md:bottom-8"
            initial={{ y: 100, opacity: 0 }}
            animate={{
                y: scrollingDown ? 100 : 0,
                opacity: scrollingDown ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <FloatingDock items={links} />
        </motion.div>
    );
}
