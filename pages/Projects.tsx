// components/Projects.tsx
"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "@/components/projects/ProjectCard"; // Import the ProjectCard component
import { Button } from "@/components/ui/button"; // Assuming Shadcn Button
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// --- DUMMY DATA ---
interface Project {
  id: string; // Added ID for better keying
  title: string;
  description: string;
  imageUrl: string;
  liveLink?: string;
  githubLink?: string;
  tags: string[];
}

const allProjects: Project[] = [
  {
    id: "proj-1",
    title: "EcoConnect E-commerce Platform",
    description:
      "A full-stack e-commerce platform promoting sustainable products with a user-friendly interface, secure payment gateway, and robust inventory management.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWNvbW1lcmNlfGVufDB8fDB8fHww",
    liveLink: "#",
    githubLink: "#",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "MongoDB", "Auth.js"],
  },
  {
    id: "proj-2",
    title: "TaskFlow Productivity App",
    description:
      "A minimalist task management application featuring drag-and-drop reordering, due dates, and real-time synchronization across devices.",
    imageUrl:
      "https://images.unsplash.com/photo-1603468620905-8de7d86b781e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdGl2aXR5fGVufDB8fDB8fHww",
    liveLink: "#",
    githubLink: "#",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Socket.IO"],
  },
  {
    id: "proj-3",
    title: "AI Recipe Generator",
    description:
      "Leveraging advanced AI to generate unique culinary recipes based on user-inputted ingredients and dietary preferences. Features include recipe saving and sharing.",
    imageUrl:
      "https://images.unsplash.com/photo-1722886689077-d22d8fc2a305?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVjZWlwZXxlbnwwfHwwfHx8MA%3D%3D",
    liveLink: "#",
    githubLink: "#",
    tags: ["Python", "Flask", "OpenAI API", "React", "CSS Modules"],
  },
  {
    id: "proj-4",
    title: "Personal Portfolio v2",
    description:
      "The second iteration of my personal portfolio, built with modern web technologies and a focus on performance and animations. This showcases my latest design and development skills.",
    imageUrl:
      "https://images.unsplash.com/photo-1545665277-5937489579f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydGZvbGlvfGVufDB8fDB8fHww",
    liveLink: "#",
    githubLink: "#",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
  },
  {
    id: "proj-5",
    title: "Real-time Chat Application",
    description:
      "A responsive chat application supporting multiple rooms, user authentication, and real-time messaging with push notifications for instant communication.",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    liveLink: "#",
    githubLink: "#",
    tags: ["React", "Firebase", "Socket.IO", "Chakra UI"],
  },
  {
    id: "proj-6",
    title: "Weather Dashboard",
    description:
      "A user-friendly web application that fetches and displays current weather data based on user location or city search, providing accurate forecasts and conditions.",
    imageUrl:
      "https://images.unsplash.com/photo-1596773539167-27b9195b06a0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    liveLink: "#",
    githubLink: "#",
    tags: ["HTML", "CSS", "JavaScript", "OpenWeather API"],
  },
  {
    id: "proj-7",
    title: "Portfolio CMS Integration",
    description:
      "A custom CMS solution for managing portfolio content, allowing dynamic updates without code changes.",
    imageUrl:
      "https://images.unsplash.com/photo-1616712135003-86103328e192?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    liveLink: "#",
    githubLink: "#",
    tags: ["Strapi", "Next.js", "GraphQL"],
  },
  {
    id: "proj-8",
    title: "Mobile Game Companion App",
    description:
      "A cross-platform mobile app to enhance the experience of a popular online game with real-time stats and guides.",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb3ad5804de?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    liveLink: "#",
    githubLink: "#",
    tags: ["React Native", "Firebase", "Expo"],
  },
];
// --- END DUMMY DATA ---

// Animation variants for the project cards
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Projects: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [startIndex, setStartIndex] = useState(0);

  const currentProjects = allProjects.slice(startIndex, startIndex + 4);

  const handleNextProjects = () => {
    const nextIndex = startIndex + 4;
    if (nextIndex < allProjects.length) {
      setStartIndex(nextIndex);
    } else {
      setStartIndex(0); // Wrap around
    }
  };

  const handlePrevProjects = () => {
    const prevIndex = startIndex - 4;
    if (prevIndex >= 0) {
      setStartIndex(prevIndex);
    } else {
      // Wrap around to the end (or closest full set if not a multiple of 4)
      setStartIndex(
        Math.max(0, allProjects.length - (allProjects.length % 4 || 4))
      );
    }
  };

  return (
    <section
      id="projects"
      className="container mx-auto pt-12 min-h-screen flex flex-col justify-center"
    >
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-3"
        >
          Crafting Digital
          <span className="text-primary"> Experiences</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          A showcase of my journey in creating innovative web solutions that
          combine technical excellence with creative design.
        </motion.p>
      </div>

      <div className="relative">
        {/* Navigation Buttons - Desktop */}
        <div className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 z-10">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              onClick={handlePrevProjects}
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg hover:bg-background/90 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={startIndex === 0}
            >
              <FiChevronLeft className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 min-h-[600px]"
        >
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{
                ...cardVariants.visible.transition,
                delay: index * 0.15,
              }}
              className="h-full"
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Buttons - Desktop */}
        <div className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 z-10">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              onClick={handleNextProjects}
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg hover:bg-background/90 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                startIndex + 4 >= allProjects.length &&
                (allProjects.length % 4 === 0 ||
                  startIndex + 4 > allProjects.length)
              }
            >
              <FiChevronRight className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>

        {/* Navigation Buttons - Mobile */}
        {allProjects.length > 4 && (
          <div className="lg:hidden flex justify-center gap-3 mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-full max-w-[200px]"
            >
              <Button
                onClick={handlePrevProjects}
                variant="outline"
                size="lg"
                className="w-full"
                disabled={startIndex === 0}
              >
                <FiChevronLeft className="mr-2 h-5 w-5" />
                Previous
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-full max-w-[200px]"
            >
              <Button
                onClick={handleNextProjects}
                size="lg"
                className="w-full"
                disabled={
                  startIndex + 4 >= allProjects.length &&
                  (allProjects.length % 4 === 0 ||
                    startIndex + 4 > allProjects.length)
                }
              >
                Next
                <FiChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
