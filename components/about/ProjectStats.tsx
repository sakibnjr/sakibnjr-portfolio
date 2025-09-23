"use client";

import { motion, useInView } from "motion/react";
import React, { useRef } from "react";
import { FiTrendingUp } from "react-icons/fi";

interface Stat {
  label: string;
  value: number;
}

interface ProjectStatsGridProps {
  stats: Stat[];
}

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

export const ProjectStatsGrid: React.FC<ProjectStatsGridProps> = ({
  stats,
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="h-full w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative rounded-lg bg-background/50 p-6 text-center shadow-sm flex flex-col items-center justify-center h-full border border-border/50 hover:border-primary/50 transition-colors duration-300 group"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
              }
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative flex flex-col items-center justify-center flex-grow"
            >
              <motion.div
                className="absolute -top-2 -right-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ rotate: -45 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiTrendingUp className="w-5 h-5" />
              </motion.div>
              <motion.h3
                className="font-bold text-3xl md:text-4xl text-primary"
                initial={{ scale: 0.8 }}
                animate={isInView ? { scale: 1 } : { scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                {stat.value}
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }
                  }
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="text-primary/70"
                >
                  +
                </motion.span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="text-sm md:text-base text-muted-foreground mt-2 font-medium"
              >
                {stat.label}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
