// components/Footer.tsx
"use client"; // If you plan to add client-side interactivity like animations or current year logic

import React from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa"; // Example icon for "Made with Love"
import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi"; // Social icons

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }} // Only animate when 50% in view, once
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-card border-t border-border/50 py-8 text-center text-muted-foreground text-sm dark:bg-background dark:border-gray-100/50"
    >
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Copyright & Made With */}
        <p>
          &copy; {currentYear} Sakib Nahid. All rights reserved.
          <br className="sm:hidden" /> {/* Line break on small screens */}
          <span className="hidden sm:inline-block md:inline-block mx-1">
            •
          </span>{" "}
          {/* Separator on larger screens */}
          Made with <FaHeart className="inline-block text-rose-500 mx-1" /> and
          Passion.
        </p>

        {/* Social Links (Optional - align with your contact section or just display prominent ones) */}
        <div className="flex space-x-4">
          <a
            href="mailto:sakibnjr@proton.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Email"
          >
            <FiMail className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/sakibnjr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/sakibnjr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="GitHub"
          >
            <FiGithub className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
