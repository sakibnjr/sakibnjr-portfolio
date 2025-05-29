"use client"; // Make sure this is at the very top for client-side functionality

import LogoN from "@/components/about/LogoN";
import { TechStack } from "@/components/about/TechStack";

import ConnectCard from "@/components/about/ConnectCard";
import { Education } from "@/components/about/Education";
import { Certifications } from "@/components/about/Certifications";
import { Toaster } from "react-hot-toast";

import { motion, useInView } from "framer-motion"; // Import motion and useInView
import { useRef } from "react"; // Import useRef

import certifications from "@/data/certifications.json";
import { ProjectStatsGrid } from "@/components/about/ProjectStats";
import { ProfileCard } from "@/components/ui/card-spotlight";
import Image from "next/image";

const stats = [
  { label: "Projects", value: 10 },
  { label: "Total Tools", value: 20 },
  { label: "Certifications", value: 5 },
];

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideInVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const AboutMe: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <div id="about" className="py-12">
      <Toaster position="top-center" />

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 grid-rows-8 gap-3 min-h-[calc(100vh-6rem)]"
      >
        {/* Profile Card */}
        <GridItemWrapper
          className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-3 sm:row-span-4 rounded-lg overflow-hidden"
          variants={scaleVariants}
        >
          <ProfileCard className="h-full flex flex-col justify-center items-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] relative"
            >
              <Image
                src="/Nahid.jpg"
                fill
                priority
                alt="Sakib Nahid's Photo"
                className="rounded-2xl z-50 object-cover"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl font-bold relative mt-2 text-white z-20"
            >
              Sakib Nahid
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center text-neutral-300 mt-2 sm:mt-3 relative text-base sm:text-lg z-20"
            >
              Frontend Addictive <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="font-semibold text-xs sm:text-sm italic"
              >
                Capable of Full-Stack
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                }
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-xs sm:text-sm"
              >
                I learn whatever I found interesting
              </motion.span>
            </motion.p>
          </ProfileCard>
        </GridItemWrapper>

        {/* Frontend Developer Title */}
        <GridItemWrapper
          className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-3 lg:row-start-1 row-span-2 border rounded-xl shadow flex justify-center items-center px-3 py-2"
          variants={slideInVariants}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ delay: 0.3, duration: 0.6 }}
            className="uppercase tracking-widest text-lg lg:text-2xl font-semibold"
          >
            Frontend
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-rose-500"
            >
              -
            </motion.span>
            Developer
          </motion.h1>
        </GridItemWrapper>

        {/* Education */}
        <GridItemWrapper
          className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-5 lg:row-start-1 row-span-4"
          variants={itemVariants}
        >
          <Education />
        </GridItemWrapper>

        {/* Certification */}
        <GridItemWrapper
          className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-3 lg:row-start-3 row-span-4"
          variants={itemVariants}
        >
          <motion.div
            className="h-full flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-center text-xl md:text-2xl font-bold mb-3">
              Certifications
            </h1>
            <Certifications data={certifications} />
          </motion.div>
        </GridItemWrapper>

        {/* Logo */}
        <GridItemWrapper
          className="col-span-1 sm:col-span-1 lg:col-span-1 lg:col-start-3 lg:row-start-7 row-span-2 rounded-lg flex justify-center items-center w-full border rounded-xl shadow"
          variants={scaleVariants}
        >
          <LogoN />
        </GridItemWrapper>

        {/* Project Count */}
        <GridItemWrapper
          className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-5 lg:row-start-5 row-span-2 overflow-hidden"
          variants={itemVariants}
        >
          <motion.div
            className="h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <ProjectStatsGrid stats={stats} />
          </motion.div>
        </GridItemWrapper>

        {/* Tech Stack */}
        <GridItemWrapper
          className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-5 row-span-4 border rounded-xl shadow"
          variants={itemVariants}
        >
          <motion.div
            className="flex flex-col items-center justify-center h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-center text-xl md:text-2xl font-bold w-full mb-3">
              Tech Stack
            </h1>
            <TechStack />
          </motion.div>
        </GridItemWrapper>

        {/* Connect With Me */}
        <GridItemWrapper
          className="col-span-1 sm:col-span-2 lg:col-span-3 lg:col-start-4 lg:row-start-7 row-span-2 rounded-lg"
          variants={itemVariants}
        >
          <ConnectCard />
        </GridItemWrapper>
      </motion.div>
    </div>
  );
};

export default AboutMe;

interface GridItemWrapperProps {
  children: React.ReactNode;
  className?: string;
  variants?: {
    hidden: {
      opacity?: number;
      y?: number;
      scale?: number;
    };
    visible: {
      opacity?: number;
      y?: number;
      scale?: number;
      transition?: {
        duration?: number;
        ease?: number[];
        delay?: number;
      };
    };
  };
}

const GridItemWrapper: React.FC<GridItemWrapperProps> = ({
  children,
  className,
  variants = itemVariants,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};
