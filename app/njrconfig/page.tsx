"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { FiPlus, FiLogOut, FiRefreshCw } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminBlogList from "@/components/admin/AdminBlogList";
import BlogEditor from "@/components/admin/BlogEditor";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import type { Blog } from "@/types/blog";
import { toast, Toaster } from "react-hot-toast";

type ViewMode = "list" | "create" | "edit";

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>("list");
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchBlogs = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/blogs/admin");
            if (response.status === 401) {
                setIsAuthenticated(false);
                return;
            }
            const data = await response.json();
            setBlogs(data.blogs || []);
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
            toast.error("Failed to fetch blogs");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Check auth status on mount using dedicated endpoint
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/admin/check");
                const data = await response.json();

                if (data.authenticated) {
                    setIsAuthenticated(true);
                    fetchBlogs();
                } else {
                    setIsAuthenticated(false);
                }
            } catch {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, [fetchBlogs]);

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            setIsAuthenticated(false);
            setBlogs([]);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleCreateBlog = async (blogData: Partial<Blog>) => {
        const response = await fetch("/api/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to create blog");
        }

        toast.success("Blog created successfully!");
        setViewMode("list");
        fetchBlogs();
    };

    const handleUpdateBlog = async (blogData: Partial<Blog>) => {
        if (!editingBlog) return;

        const response = await fetch(`/api/blogs/${editingBlog.slug}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...blogData,
                newSlug: blogData.slug !== editingBlog.slug ? blogData.slug : undefined,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to update blog");
        }

        toast.success("Blog updated successfully!");
        setViewMode("list");
        setEditingBlog(null);
        fetchBlogs();
    };

    const handleDeleteClick = (blog: Blog) => {
        setBlogToDelete(blog);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!blogToDelete) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/blogs/${blogToDelete.slug}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to delete blog");
            }

            toast.success("Blog deleted successfully!");
            setIsDeleteModalOpen(false);
            setBlogToDelete(null);
            fetchBlogs();
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error(error instanceof Error ? error.message : "Failed to delete blog");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleTogglePublish = async (blog: Blog) => {
        try {
            const response = await fetch(`/api/blogs/${blog.slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ published: !blog.published }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to update blog");
            }

            toast.success(blog.published ? "Blog unpublished" : "Blog published");
            fetchBlogs();
        } catch (error) {
            console.error("Toggle publish failed:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update blog");
        }
    };

    const handleEdit = (blog: Blog) => {
        setEditingBlog(blog);
        setViewMode("edit");
    };

    // Loading state
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
            </div>
        );
    }

    // Login form
    if (!isAuthenticated) {
        return (
            <AdminLogin
                onSuccess={() => {
                    setIsAuthenticated(true);
                    fetchBlogs();
                }}
            />
        );
    }

    // Dashboard
    return (
        <div className="min-h-screen p-4 md:p-8">
            <Toaster position="top-center" />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage your blog posts</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={fetchBlogs}
                            disabled={isLoading}
                        >
                            <FiRefreshCw
                                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                            />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <FiLogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </motion.header>

                {/* Content */}
                {viewMode === "list" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">
                                All Posts ({blogs.length})
                            </h2>
                            <Button onClick={() => setViewMode("create")}>
                                <FiPlus className="h-4 w-4 mr-2" />
                                New Post
                            </Button>
                        </div>

                        <AdminBlogList
                            blogs={blogs}
                            onEdit={handleEdit}
                            onDelete={handleDeleteClick}
                            onTogglePublish={handleTogglePublish}
                        />
                    </motion.div>
                )}

                {viewMode === "create" && (
                    <BlogEditor
                        onSave={handleCreateBlog}
                        onCancel={() => setViewMode("list")}
                    />
                )}

                {viewMode === "edit" && editingBlog && (
                    <BlogEditor
                        blog={editingBlog}
                        onSave={handleUpdateBlog}
                        onCancel={() => {
                            setViewMode("list");
                            setEditingBlog(null);
                        }}
                    />
                )}

                <DeleteConfirmModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDeleteConfirm}
                    title="Delete Blog Post"
                    itemName={blogToDelete?.title || ""}
                    isLoading={isDeleting}
                />
            </div>
        </div>
    );
}
