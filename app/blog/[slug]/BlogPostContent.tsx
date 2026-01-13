"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { FiArrowLeft, FiCalendar, FiClock } from "react-icons/fi";
import type { Blog } from "@/types/blog";

interface BlogPostContentProps {
    blog: Blog;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ blog }) => {
    const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // Estimate reading time (roughly 200 words per minute)
    const wordCount = blog.content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <article className="w-4/5 mx-auto py-8 sm:py-16">
            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Link
                    href="/#blog"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 mb-8"
                >
                    <FiArrowLeft className="h-4 w-4" />
                    Back to all posts
                </Link>
            </motion.div>

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8"
            >
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                    {blog.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <FiCalendar className="h-4 w-4" />
                        <time dateTime={blog.created_at}>{formattedDate}</time>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiClock className="h-4 w-4" />
                        <span>{readingTime} min read</span>
                    </div>
                </div>
            </motion.header>

            {/* Cover Image */}
            {blog.cover_image && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-8"
                >
                    <Image
                        src={blog.cover_image}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 1200px) 100vw, 80vw"
                        className="object-cover"
                        priority
                    />
                </motion.div>
            )}

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="prose prose-lg dark:prose-invert max-w-none"
            >
                {/* Render content - supports basic markdown-like formatting */}
                <div
                    dangerouslySetInnerHTML={{
                        __html: blog.content
                            .split("\n")
                            .map((line) => {
                                // Convert markdown-like headers
                                if (line.startsWith("## ")) {
                                    return `<h2 class="text-2xl font-bold mt-8 mb-4">${line.slice(3)}</h2>`;
                                }
                                if (line.startsWith("### ")) {
                                    return `<h3 class="text-xl font-semibold mt-6 mb-3">${line.slice(4)}</h3>`;
                                }
                                // Convert lists
                                if (line.startsWith("- ")) {
                                    return `<li class="ml-4">${line.slice(2)}</li>`;
                                }
                                // Regular paragraphs
                                if (line.trim()) {
                                    return `<p class="mb-4 text-foreground/90 leading-relaxed">${line}</p>`;
                                }
                                return "";
                            })
                            .join(""),
                    }}
                />
            </motion.div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 pt-8 border-t border-border"
            >
                <Link
                    href="/#blog"
                    className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-200"
                >
                    <FiArrowLeft className="h-4 w-4" />
                    Back to all posts
                </Link>
            </motion.footer>
        </article>
    );
};

export default BlogPostContent;
