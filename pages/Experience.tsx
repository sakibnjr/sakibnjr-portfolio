"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import experienceData from "@/data/experience.json";
import { FiBriefcase, FiCalendar } from "react-icons/fi";

interface ExperienceItem {
    company: string;
    position: string;
    period: string;
    description: string;
    skills: string[];
}

const TimelineItem = ({ item, index }: { item: ExperienceItem; index: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]);
    const x = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -50 : 50, 0, 0]);

    return (
        <div ref={ref} className="relative mb-12 md:mb-24 last:mb-0">
            {/* Dot on the timeline */}
            <motion.div
                style={{ scale: scrollYProgress, opacity: scrollYProgress }}
                className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)] z-20"
            />

            <div className={`flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                {/* Content Card */}
                <motion.div
                    style={{ opacity, scale, x }}
                    className={`w-full md:w-[45%] p-6 rounded-2xl bg-card border border-border shadow-xl hover:border-rose-500/50 transition-colors group relative overflow-hidden`}
                >
                    {/* Subtle Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-rose-500 mb-2">
                            <FiBriefcase className="h-4 w-4" />
                            <span className="text-sm font-semibold tracking-wider uppercase">{item.company}</span>
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-rose-500 transition-colors">
                            {item.position}
                        </h3>

                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                            <FiCalendar className="h-3 w-3" />
                            <span>{item.period}</span>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill: string) => (
                                <span
                                    key={skill}
                                    className="px-2 py-1 text-[10px] font-medium rounded-md bg-secondary text-secondary-foreground border border-border"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Spacer for MD screens */}
                <div className="hidden md:block w-[10%]" />
                <div className="hidden md:block w-[45%]" />
            </div>
        </div>
    );
};

const Experience = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Glowing line color transformation
    const glowOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    return (
        <section id="experience" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col items-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-foreground text-center"
                    >
                        Work <span className="text-rose-500">Experience</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-base sm:text-lg text-muted-foreground mt-4 text-center max-w-2xl mx-auto"
                    >
                        A timeline of my professional career and the impact I&apos;ve made at each stop along the way.
                    </motion.p>
                </div>

                <div ref={containerRef} className="relative max-w-5xl mx-auto pl-8 md:pl-0">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-border z-0" />

                    {/* Animated Glowing Line */}
                    <motion.div
                        style={{
                            scaleY: pathLength,
                            opacity: glowOpacity,
                            originY: 0
                        }}
                        className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.4)] z-10"
                    />

                    {/* Timeline Items */}
                    <div className="relative z-20">
                        {experienceData.map((item, index) => (
                            <TimelineItem
                                key={`${item.company}-${index}`}
                                item={item}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
