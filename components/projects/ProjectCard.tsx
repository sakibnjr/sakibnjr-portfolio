"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiReact,
  SiExpress,
  SiTypescript,
  SiVite,
  SiCloudinary,
  SiJsonwebtokens,
  SiGooglegemini,
  SiRust,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiExpo,
  SiPython,
} from "react-icons/si";

const techIcons: {
  [key: string]: {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  };
} = {
  NextJS: { icon: SiNextdotjs, color: "text-black dark:text-white" },
  "Next.js": { icon: SiNextdotjs, color: "text-black dark:text-white" },
  TailwindCSS: { icon: SiTailwindcss, color: "text-cyan-500" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "text-cyan-500" },
  MongoDB: { icon: SiMongodb, color: "text-green-500" },
  React: { icon: SiReact, color: "text-blue-500" },
  "React Native": { icon: SiReact, color: "text-blue-500" },
  ExpressJs: { icon: SiExpress, color: "text-gray-600 dark:text-gray-400" },
  Express: { icon: SiExpress, color: "text-gray-600 dark:text-gray-400" },
  TypeScript: { icon: SiTypescript, color: "text-blue-600" },
  Vite: { icon: SiVite, color: "text-purple-600" },
  Cloudinary: { icon: SiCloudinary, color: "text-blue-500" },
  JWT: { icon: SiJsonwebtokens, color: "text-gray-600 dark:text-gray-400" },
  Gemini: { icon: SiGooglegemini, color: "text-blue-500" },
  "Tauri v2": { icon: SiRust, color: "text-orange-600" },
  HTML: { icon: SiHtml5, color: "text-orange-600" },
  CSS: { icon: SiCss3, color: "text-blue-500" },
  JavaScript: { icon: SiJavascript, color: "text-yellow-500" },
  "Vanilla JS": { icon: SiJavascript, color: "text-yellow-500" },
  Expo: { icon: SiExpo, color: "text-black dark:text-white" },
  Python: { icon: SiPython, color: "text-yellow-500" },
  "Framer Motion": { icon: SiReact, color: "text-purple-500" },
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
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      {/* Image Section */}
      <div className="relative h-48 w-full bg-muted/20">
        <Image
          src={imageUrl}
          alt={`Image of the ${title} project`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.slice(0, 5).map((tag) => {
              const tech = techIcons[tag];
              return (
                <div
                  key={tag}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/30 bg-muted/30 transition-all duration-200 hover:scale-110 hover:bg-muted/50"
                  title={tag}
                >
                  {tech && (
                    <tech.icon
                      className={`h-4 w-4 transition-colors duration-200 ${tech.color}`}
                    />
                  )}
                </div>
              );
            })}
            {tags.length > 5 && (
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/30 bg-muted/50 text-xs font-medium text-muted-foreground">
                +{tags.length - 5}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 pt-6">
          {liveLink && (
            <Button asChild size="sm" className="flex-1">
              <Link href={liveLink} target="_blank" rel="noopener noreferrer">
                <FiExternalLink className="h-4 w-4 mr-2" />
                Live
              </Link>
            </Button>
          )}
          {githubLink && (
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={githubLink} target="_blank" rel="noopener noreferrer">
                <FiGithub className="h-4 w-4 mr-2" />
                Code
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
