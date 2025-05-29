"use client";
import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiAward } from "react-icons/fi";

export interface CertificationItem {
  url: string;
  certificateTitle: string;
  issuedBy: string;
  issuedDate: string;
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

export function Certifications({ data }: { data: CertificationItem[] }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <motion.article
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="h-full overflow-y-auto custom-scrollbar"
    >
      <div className="space-y-4 md:space-y-6 text-sm sm:text-base">
        {data.map((cert, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative bg-background/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-border/50 hover:border-primary/50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="mt-1">
                <FiAward className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex-1">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="text-md md:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
                >
                  <LinkPreview url={cert.url}>{cert.certificateTitle}</LinkPreview>
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="space-y-1"
                >
                  <p className="text-sm text-muted-foreground">
                    Issued by: <span className="font-medium">{cert.issuedBy}</span>
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    {cert.issuedDate}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.article>
  );
}
