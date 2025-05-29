"use client";

import { Cover } from "@/components/hero/cover"; // Assuming this is a custom component
import { AuroraText } from "@/components/magicui/aurora-text";
import { motion } from "framer-motion";
import Link from "next/link"; // Import Link for navigation
import { Button } from "@/components/ui/button"; // Import Shadcn Button
import { Announcement } from "@/components/hero/Announcement"; // Import Announcement component

import { MdOutlineArrowDownward } from "react-icons/md";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Hero = () => {
  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
      id="home"
    >
      {/* Announcement at the top */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.1,
          duration: 0.5,
          type: "spring",
          stiffness: 300,
        }}
        className="absolute top-4 md:top-8"
      >
        <Announcement />
      </motion.div>

      {/* Header: Contains main content, responsive spacing. */}
      <motion.header
        className="text-center space-y-4 md:space-y-6 max-w-4xl z-10 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* H1: Main heading with "Blazing-Fast" and "Visually Stunning" */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400"
        >
          Delivering <Cover>Blazing-Fast</Cover> &
          <br />
          <AuroraText>Visually Stunning</AuroraText> Web Solutions.
        </motion.h1>

        {/* P: Sub-headline, responsive text size and max-width. */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto"
        >
          As a Frontend Developer, I transform innovative ideas into elegant,
          user-centric applications using modern web technologies.
        </motion.p>

        {/* Nav: CTA Buttons with Framer Motion animations */}
        <motion.nav
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center pt-4"
        >
          {/* Primary Button - Explore My Work */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="w-full sm:w-auto"
          >
            <Button asChild size="lg" className="w-full">
              <Link href="#projects" onClick={scrollToProjects}>
                Explore My Work
              </Link>
            </Button>
          </motion.div>

          {/* Secondary Button - Download Resume */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="w-full sm:w-auto"
          >
            <a href="/sakibnjr-resume.pdf" download className="w-full">
              <Button variant="outline" size="lg" className="w-full">
                Download Resume
              </Button>
            </a>
          </motion.div>
        </motion.nav>
      </motion.header>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 z-10 flex flex-col items-center justify-center text-foreground/60 cursor-pointer"
        onClick={scrollDown}
      >
        <span className="text-sm md:text-base mb-2 font-medium">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <MdOutlineArrowDownward className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
