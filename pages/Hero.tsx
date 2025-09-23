"use client";

import { Cover } from "@/components/hero/cover"; // Assuming this is a custom component
import { AuroraText } from "@/components/magicui/aurora-text";
import { motion } from "motion/react";
import Link from "next/link"; // Import Link for navigation
import { Button } from "@/components/ui/button"; // Import Shadcn Button

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
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden lg:px-8"
      id="home"
    >
      <style jsx global>{`
        @keyframes wave {
          0% {
            transform: rotate(0deg);
          }
          10% {
            transform: rotate(14deg);
          }
          20% {
            transform: rotate(-8deg);
          }
          30% {
            transform: rotate(14deg);
          }
          40% {
            transform: rotate(-4deg);
          }
          50% {
            transform: rotate(10deg);
          }
          60% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        .animate-wave {
          display: inline-block;
          animation: wave 2.5s infinite;
          transform-origin: 70% 70%;
        }
      `}</style>

      {/* Main Content Container */}
      <div className="relative w-full max-w-4xl mx-auto pb-16">
        {/* Header: Contains main content */}
        <motion.header
          className="text-center space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting Message */}
          <motion.div
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 font-medium"
          >
            <span className="animate-wave inline-block mr-2">👋</span> Hello,
            I&apos;m Sakib
          </motion.div>

          {/* H1: Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400"
          >
            Delivering <Cover>Blazing-Fast</Cover> &
            <br className="hidden sm:block" />
            <AuroraText>Visually Stunning</AuroraText> Web Solutions.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto"
          >
            As a Frontend Developer, I transform innovative ideas into elegant,
            user-centric applications using modern web technologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.nav
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 items-center justify-center w-full pt-4 sm:pt-6"
          >
            {/* Primary Button - Explore My Work */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-full sm:w-auto"
            >
              <Button asChild size="lg" className="w-full text-sm sm:text-base">
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
              <Button
                variant="outline"
                size="lg"
                className="w-full text-sm sm:text-base"
                asChild
              >
                <a
                  href="/sakibnjr_resume.pdf"
                  download="Sakib_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.nav>
        </motion.header>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center text-foreground/60 cursor-pointer hover:text-foreground/80 transition-colors"
        onClick={scrollDown}
      >
        <span className="text-xs sm:text-sm md:text-base mb-1 sm:mb-2 font-medium">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="flex items-center justify-center"
        >
          <MdOutlineArrowDownward className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
