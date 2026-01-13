"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import type { Blog } from "@/types/blog";

interface BlogCardProps {
    blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <Link href={`/blog/${blog.slug}`}>
            <motion.article
                className="group h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
            >
                {/* Cover Image */}
                {blog.cover_image && (
                    <div className="relative h-48 w-full bg-muted/20 overflow-hidden">
                        <Image
                            src={blog.cover_image}
                            alt={blog.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="space-y-3">
                        {/* Date */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <FiCalendar className="h-3 w-3" />
                            <time dateTime={blog.created_at}>{formattedDate}</time>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-foreground transition-colors duration-200 group-hover:text-primary line-clamp-2">
                            {blog.title}
                        </h3>

                        {/* Excerpt */}
                        {blog.excerpt && (
                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                {blog.excerpt}
                            </p>
                        )}

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {blog.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {blog.tags.length > 3 && (
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                                        +{blog.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Read More */}
                    <div className="flex items-center gap-2 pt-4 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-200">
                        Read more
                        <FiArrowRight className="h-4 w-4" />
                    </div>
                </div>
            </motion.article>
        </Link>
    );
};

export default BlogCard;
