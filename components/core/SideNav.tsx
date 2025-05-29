"use client";
import { useState, useEffect, useRef } from "react";
import { ModeToggle } from "../core/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

// Bootstrap Icons - consistent filled style
import {
  BsHouse,
  BsPerson,
  BsCodeSlash,
  BsBook,
  BsEnvelope,
  BsList, // For Menu
  BsX, // For Close
} from "react-icons/bs"; // Note the 'bs' prefix for imports

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { href: "#home", icon: BsHouse, label: "Home" },
  { href: "#about", icon: BsPerson, label: "ReadME" },
  { href: "#projects", icon: BsCodeSlash, label: "Projects" },
  { href: "#blog", icon: BsBook, label: "Blog" },
  { href: "#contact", icon: BsEnvelope, label: "Contact" },
];

const SideNavRedesigned = () => {
  const [activeSection, setActiveSection] = useState("#home");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Handle resize
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileNavOpen(false);
      }
    };

    // Setup intersection observer
    const setupObserver = () => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${entry.target.id}`);
            }
          });
        },
        {
          rootMargin: "-50% 0px -50% 0px",
          threshold: 0,
        }
      );

      // Observe all sections
      navItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (section) {
          observerRef.current?.observe(section);
        }
      });
    };

    window.addEventListener("resize", handleResize);
    setupObserver();

    return () => {
      window.removeEventListener("resize", handleResize);
      observerRef.current?.disconnect();
    };
  }, []);

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
      {/* Fixed Side Nav for larger screens */}
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
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/sakibnjr/sakibnjr/blob/main/sakibnjr.jpg?raw=true"
                          alt="Sakib Nahid"
                        />
                        <AvatarFallback>SN</AvatarFallback>
                      </Avatar>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    <p className="font-playwrite">Sakib Njr</p>
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
                          ${
                            activeSection === item.href
                              ? "bg-rose-500/15 text-rose-500"
                              : ""
                          }
                        `}
                      >
                        <item.icon className="h-5 w-5" />
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
                    <TooltipContent
                      side="right"
                      className="ml-2 font-playwrite"
                    >
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
                    <p className="font-playwrite">Toggle Theme</p>
                  </TooltipContent>
                </Tooltip>
              </motion.li>
            </ul>
          </TooltipProvider>
        </div>
      </nav>

      {/* Mobile Header (Hamburger Menu) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm p-4 flex justify-between items-center lg:hidden border-b border-border/50">
        <Link href="/" className="text-xl font-bold font-playwrite">
          Sakib Njr
        </Link>
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-2 rounded-full text-foreground hover:bg-primary/10 transition-colors duration-200"
          aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
        >
          {isMobileNavOpen ? (
            <BsX className="h-6 w-6" />
          ) : (
            <BsList className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileNavOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center lg:hidden"
        >
          <ul className="flex flex-col items-center space-y-8 text-2xl">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setIsMobileNavOpen(false);
                  }}
                  className={`
                    flex items-center space-x-3 p-2 rounded-lg
                    hover:text-primary hover:bg-primary/10
                    transition-all duration-200
                    ${
                      activeSection === item.href
                        ? "text-rose-500 font-semibold"
                        : "text-foreground/80"
                    }
                  `}
                >
                  <item.icon className="h-7 w-7" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <ModeToggle />
            </li>
          </ul>
        </motion.div>
      )}
    </>
  );
};

export default SideNavRedesigned;
