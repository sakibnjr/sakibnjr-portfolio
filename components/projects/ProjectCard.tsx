"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  SiNextdotjs,
  SiTailwindcss,
  SiStripe,
  SiMongodb,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiSocketdotio,
  SiPython,
  SiFlask,
  SiOpenai,
  SiChakraui,
  SiFirebase,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiAuth0,
  SiStrapi,
  SiGraphql,
  SiExpo,
} from "react-icons/si";

// Map of tech tag names to their corresponding React Icon components
const techIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  Stripe: SiStripe,
  MongoDB: SiMongodb,
  React: SiReact,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  PostgreSQL: SiPostgresql,
  "Socket.IO": SiSocketdotio,
  Python: SiPython,
  Flask: SiFlask,
  "OpenAI API": SiOpenai,
  "CSS Modules": SiCss3,
  "Auth.js": SiAuth0,
  HTML: SiHtml5,
  CSS: SiCss3,
  JavaScript: SiJavascript,
  "Chakra UI": SiChakraui,
  Firebase: SiFirebase,
  Strapi: SiStrapi,
  GraphQL: SiGraphql,
  "React Native": SiReact,
  Expo: SiExpo,
  // Add more as needed for your projects!
};

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  liveLink?: string;
  githubLink?: string;
  tags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  liveLink,
  githubLink,
  tags,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative bg-card border border-border/50 rounded-lg overflow-hidden shadow-lg group flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />
        {/* Overlay for hover effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <h3 className="text-white text-xl font-bold">{title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-foreground mb-2 sm:hidden">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm flex-grow mb-4">
          {description}
        </p>

        {/* Tech Icons (formerly Tags) */}
        <div className="flex flex-wrap gap-3 mb-4 mt-auto justify-center">
          {tags.map((tag) => {
            const IconComponent = techIcons[tag];
            return IconComponent ? (
              <span
                key={tag}
                className="text-foreground/70 hover:text-primary transition-colors duration-200"
                title={tag} // Add title for accessibility on hover
              >
                <IconComponent />
              </span>
            ) : null; // Don't render if icon not found
          })}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          {liveLink && (
            <Button asChild size="sm" className="flex-1">
              <Link href={liveLink} target="_blank" rel="noopener noreferrer">
                Live Demo
              </Link>
            </Button>
          )}
          {githubLink && (
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={githubLink} target="_blank" rel="noopener noreferrer">
                GitHub
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
