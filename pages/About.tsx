"use client";
import LogoN from "@/components/about/LogoN";
import { TechStack } from "@/components/about/TechStack";
import ConnectCard from "@/components/about/ConnectCard";
import { Education } from "@/components/about/Education";
import { Certifications } from "@/components/about/Certifications";
import { Toaster } from "react-hot-toast";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import certifications from "@/data/certifications.json";
import { ProjectStatsGrid } from "@/components/about/ProjectStats";
import { ProfileCard } from "@/components/ui/card-spotlight";
import Image from "next/image";

const stats = [
  { label: "Projects", value: 10 },
  { label: "Technologies Mastered", value: 10 },
  { label: "Certifications", value: 5 },
];

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
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <Toaster position="top-center" />

        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-foreground text-center"
          >
            About <span className="text-rose-500">Me</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-muted-foreground mt-4 text-center max-w-2xl mx-auto"
          >
            A deep dive into my background, education, and the technologies I master.
          </motion.p>
        </div>

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
              <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] relative">
                <Image
                  src="/Nahid.jpg"
                  fill
                  loading="lazy"
                  alt="Sakib Nahid's Photo"
                  className="rounded-2xl z-10 object-cover"
                  sizes="(max-width: 640px) 150px, 200px"
                />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold relative mt-2 text-white z-20">
                Sakib Nahid
              </p>
              <p className="text-center text-neutral-300 mt-2 sm:mt-3 relative text-base sm:text-lg z-20">
                Frontend Addictive <br />
                <span className="font-semibold text-xs sm:text-sm italic opacity-50">
                  Capable of Full-Stack
                </span>
                <br />
                <span className="text-xs sm:text-sm">
                  I learn whatever I found interesting
                </span>
              </p>
            </ProfileCard>
          </GridItemWrapper>

          {/* Full-Stack Developer Title */}
          <GridItemWrapper
            className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-3 lg:row-start-1 row-span-2 border rounded-xl shadow flex justify-center items-center px-3 py-2"
            variants={slideInVariants}
          >
            <h1 className="uppercase tracking-widest text-lg lg:text-2xl font-semibold">
              Full-Stack
              <span className="text-rose-500">-</span>
              Developer
            </h1>
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
            <div className="h-full flex flex-col">
              <h1 className="text-center text-xl md:text-2xl font-bold mb-3">
                Certifications
              </h1>
              <Certifications data={certifications} />
            </div>
          </GridItemWrapper>

          {/* Logo */}
          <GridItemWrapper
            className="col-span-1 sm:col-span-1 lg:col-span-1 lg:col-start-3 lg:row-start-7 row-span-2 flex justify-center items-center w-full border rounded-xl shadow"
            variants={scaleVariants}
          >
            <LogoN />
          </GridItemWrapper>

          {/* Project Count */}
          <GridItemWrapper
            className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-5 lg:row-start-5 row-span-2 overflow-hidden"
            variants={itemVariants}
          >
            <div className="h-full">
              <ProjectStatsGrid stats={stats} />
            </div>
          </GridItemWrapper>

          {/* Tech Stack */}
          <GridItemWrapper
            className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-5 row-span-4 border rounded-xl shadow"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-center text-xl md:text-2xl font-bold w-full mb-3">
                Tech Stack
              </h1>
              <TechStack />
            </div>
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
    </section>
  );
};

export default AboutMe;

import { Variants } from "motion/react";

interface GridItemWrapperProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
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
