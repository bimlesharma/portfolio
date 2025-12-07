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
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        let lastY = window.scrollY;
        const handleScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastY;

            if (Math.abs(delta) > 10) {
                if (currentY > 100) {
                    setScrollingDown(delta > 0);
                } else {
                    setScrollingDown(false);
                }
                lastY = currentY;
            }

            // Detect active section
            const sections = ['home', 'projects', 'contact'];
            const scrollPosition = currentY + window.innerHeight / 3;

            for (const section of sections) {
                const element = document.getElementById(section === 'home' ? '' : section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        {
            title: "Home",
            icon: <IconHome className="h-full w-full" />,
            href: "#",
            id: "home",
        },
        {
            title: "Projects",
            icon: <IconTerminal2 className="h-full w-full" />,
            href: "#projects",
            id: "projects",
        },
        {
            title: "Blog",
            icon: <IconFileText className="h-full w-full" />,
            href: "/blog",
            id: "blog",
        },
        {
            title: "Contact",
            icon: <IconMail className="h-full w-full" />,
            href: "#contact",
            id: "contact",
        },
        {
            title: "Twitter",
            icon: <IconBrandX className="h-full w-full" />,
            href: "https://twitter.com/bimlesharma",
            id: "twitter",
        },
        {
            title: "GitHub",
            icon: <IconBrandGithub className="h-full w-full" />,
            href: "https://github.com/bimlesharma",
            id: "github",
        },
        {
            title: "LinkedIn",
            icon: <IconBrandLinkedin className="h-full w-full" />,
            href: "https://www.linkedin.com/in/bimlesharma/",
            id: "linkedin",
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
            <FloatingDock
                items={links}
                activeSection={activeSection}
                mobileClassName="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-full shadow-2xl shadow-cyan-500/20"
                desktopClassName="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-full shadow-2xl shadow-cyan-500/20"
            />
        </motion.div>
    );
}
