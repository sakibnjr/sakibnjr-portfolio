"use client";

import React from "react";
import { motion } from "motion/react";
import { FiEdit2, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import type { Blog } from "@/types/blog";

interface AdminBlogListProps {
    blogs: Blog[];
    onEdit: (blog: Blog) => void;
    onDelete: (blog: Blog) => void;
    onTogglePublish: (blog: Blog) => void;
}

const AdminBlogList: React.FC<AdminBlogListProps> = ({
    blogs,
    onEdit,
    onDelete,
    onTogglePublish,
}) => {
    if (blogs.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                No blogs yet. Create your first blog post!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {blogs.map((blog, index) => (
                <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">
                                {blog.title}
                            </h3>
                            <span
                                className={`px-2 py-0.5 text-xs rounded-full ${blog.published
                                        ? "bg-green-500/10 text-green-500"
                                        : "bg-yellow-500/10 text-yellow-500"
                                    }`}
                            >
                                {blog.published ? "Published" : "Draft"}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                            /{blog.slug}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {new Date(blog.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onTogglePublish(blog)}
                            title={blog.published ? "Unpublish" : "Publish"}
                        >
                            {blog.published ? (
                                <FiEyeOff className="h-4 w-4" />
                            ) : (
                                <FiEye className="h-4 w-4" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(blog)}
                            title="Edit"
                        >
                            <FiEdit2 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(blog)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                            title="Delete"
                        >
                            <FiTrash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default AdminBlogList;
