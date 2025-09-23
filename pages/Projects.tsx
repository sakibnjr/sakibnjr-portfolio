"use client";

import React, { useState } from "react";
import { motion } from "framer-motion"; // Note: changed from 'motion/react' to 'framer-motion'
import ProjectCard from "@/components/projects/ProjectCard";
import projectsData from "@/data/projects.json";

interface Project {
  name: string;
  img: string;
  live?: string;
  github?: string;
  description: string;
  techStack: string[];
}

const allProjects: Project[] = projectsData;

const Projects: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-24"
      onMouseMove={handleMouseMove}
    >
      <div>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            <span className="text-primary">My Work</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for
            building.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard
                title={project.name}
                description={project.description}
                imageUrl={project.img}
                liveLink={project.live}
                githubLink={project.github}
                tags={project.techStack}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Cursor Card (optional but adds a nice touch) */}
      <motion.div
        className="hidden md:block fixed z-50 pointer-events-none w-28 h-28 rounded-2xl bg-primary/10 border border-primary/30 backdrop-blur-sm"
        animate={{ x: mousePosition.x - 56, y: mousePosition.y - 56 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </section>
  );
};

export default Projects;
