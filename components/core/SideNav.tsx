"use client";
import { useState, useEffect, useRef } from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BsHouse,
  BsPerson,
  BsCodeSlash,
  BsBook,
  BsEnvelope,
  BsList,
  BsX,
  BsBriefcase,
  BsGithub,
} from "react-icons/bs";

const navItems = [
  { href: "#home", icon: BsHouse, label: "Home" },
  { href: "#about", icon: BsPerson, label: "ReadME" },
  { href: "#experience", icon: BsBriefcase, label: "Experience" },
  { href: "#projects", icon: BsCodeSlash, label: "Projects" },
  { href: "#activity", icon: BsGithub, label: "Activity" },
  { href: "#blog", icon: BsBook, label: "Blog" },
  { href: "#contact", icon: BsEnvelope, label: "Contact" },
];

const SideNav = () => {
  const [activeSection, setActiveSection] = useState("#home");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileNavOpen(false);
      }
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observerRef.current?.observe(section);
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileNavOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(href);
    }
  };

  return (
    <>
      <nav className="fixed top-1/2 left-4 -translate-y-1/2 z-50 hidden lg:block">
        <div className="bg-background/30 backdrop-blur-lg border border-white/10 p-3.5 rounded-full shadow-xl">
          <TooltipProvider delayDuration={50}>
            <ul className="flex flex-col items-center space-y-5">
              <motion.li
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/" className="block">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src="/Nahid.jpg"
                          alt="Sakib Nahid"
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    <p className="font-sans">Sakib Nahid</p>
                  </TooltipContent>
                </Tooltip>
              </motion.li>

              <li className="w-5 h-px bg-border/50"></li>

              {navItems.map((item) => (
                <motion.li
                  key={item.href}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`
                          relative flex items-center justify-center h-10 w-10 rounded-full
                          text-foreground/70 hover:text-primary hover:bg-primary/10
                          transition-all duration-200 group
                          ${activeSection === item.href
                            ? "bg-rose-500/15 text-rose-500"
                            : ""
                          }
                        `}
                      >
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">{item.label}</span>
                        {activeSection === item.href && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute -right-3.5 h-1.5 w-1.5 rounded-full bg-rose-500 shadow-md"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="ml-2 font-sans">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </motion.li>
              ))}

              <li className="w-5 h-px bg-border/50"></li>

              <motion.li
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <ModeToggle />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    <p className="font-sans">Toggle Theme</p>
                  </TooltipContent>
                </Tooltip>
              </motion.li>
            </ul>
          </TooltipProvider>
        </div>
      </nav>

      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md p-4 flex justify-between items-center lg:hidden">
        <Link href="/" className="text-xl font-bold font-sans">
          Sakib Nahid
        </Link>
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-3 rounded-xl text-foreground hover:bg-primary/10 transition-colors duration-200 touch-manipulation"
          aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
        >
          {isMobileNavOpen ? (
            <BsX className="h-7 w-7" />
          ) : (
            <BsList className="h-7 w-7" />
          )}
        </button>
      </header>

      {isMobileNavOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full max-h-screen w-80 max-w-[85vw] bg-background z-50 lg:hidden shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header - Fixed */}
            <div className="flex items-center justify-between p-6 border-b border-border/10 flex-shrink-0">
              <h2 className="text-lg font-semibold font-sans">Navigation</h2>
              <button
                onClick={() => setIsMobileNavOpen(false)}
                className="p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-primary/10 transition-colors duration-200 touch-manipulation"
                aria-label="Close menu"
              >
                <BsX className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Items - Scrollable */}
            <nav className="flex-1 p-6 overflow-y-auto overflow-x-hidden min-h-0">
              <ul className="space-y-3">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        setIsMobileNavOpen(false);
                      }}
                      className={`
                        flex items-center space-x-4 p-4 rounded-xl
                        hover:bg-primary/10 hover:text-primary
                        transition-all duration-200 touch-manipulation
                        ${activeSection === item.href
                          ? "bg-rose-500/10 text-rose-500 font-semibold"
                          : "text-foreground/80"
                        }
                      `}
                    >
                      <item.icon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                      <span className="text-lg">{item.label}</span>
                      {activeSection === item.href && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="ml-auto h-2 w-2 rounded-full bg-rose-500"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Theme Toggle - Fixed at Bottom */}
            <div className="p-6 border-t border-border/20 flex-shrink-0 bg-background">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-foreground/80 font-sans">
                  Theme
                </span>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="ml-4 h-10 w-10 rounded-lg border border-border/50 bg-background hover:bg-primary/10 transition-colors duration-200 flex items-center justify-center touch-manipulation"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <FiSun className="h-5 w-5 text-foreground" />
                  ) : (
                    <FiMoon className="h-5 w-5 text-foreground" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default SideNav;
