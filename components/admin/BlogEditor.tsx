"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FiSave, FiX } from "react-icons/fi";
import type { Blog } from "@/types/blog";

interface BlogEditorProps {
    blog?: Blog | null;
    onSave: (blog: Partial<Blog>) => Promise<void>;
    onCancel: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ blog, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        cover_image: "",
        tags: "",
        published: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title,
                slug: blog.slug,
                excerpt: blog.excerpt || "",
                content: blog.content,
                cover_image: blog.cover_image || "",
                tags: blog.tags?.join(", ") || "",
                published: blog.published,
            });
        }
    }, [blog]);

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    const handleTitleChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            title: value,
            slug: blog ? prev.slug : generateSlug(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const tagsArray = formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag);

            await onSave({
                title: formData.title,
                slug: formData.slug,
                excerpt: formData.excerpt || null,
                content: formData.content,
                cover_image: formData.cover_image || null,
                tags: tagsArray,
                published: formData.published,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save blog");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                    {blog ? "Edit Blog" : "Create New Blog"}
                </h2>
                <Button variant="ghost" size="sm" onClick={onCancel}>
                    <FiX className="h-4 w-4" />
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                            Title *
                        </label>
                        <Input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            placeholder="Blog title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                            Slug *
                        </label>
                        <Input
                            type="text"
                            value={formData.slug}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, slug: e.target.value }))
                            }
                            placeholder="blog-url-slug"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Excerpt
                    </label>
                    <Input
                        type="text"
                        value={formData.excerpt}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                        }
                        placeholder="Short description for previews"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Cover Image URL
                    </label>
                    <Input
                        type="text"
                        value={formData.cover_image}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, cover_image: e.target.value }))
                        }
                        placeholder="/projects/image.png or https://..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Tags (comma-separated)
                    </label>
                    <Input
                        type="text"
                        value={formData.tags}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, tags: e.target.value }))
                        }
                        placeholder="Next.js, React, Tutorial"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Content *
                    </label>
                    <Textarea
                        value={formData.content}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, content: e.target.value }))
                        }
                        placeholder="Write your blog content here... (Markdown supported)"
                        rows={12}
                        required
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="published"
                        checked={formData.published}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, published: e.target.checked }))
                        }
                        className="w-4 h-4 rounded border-border"
                    />
                    <label htmlFor="published" className="text-sm text-muted-foreground">
                        Publish immediately
                    </label>
                </div>

                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}

                <div className="flex gap-3 pt-4">
                    <Button type="submit" disabled={isLoading}>
                        <FiSave className="h-4 w-4 mr-2" />
                        {isLoading ? "Saving..." : "Save Blog"}
                    </Button>
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};

export default BlogEditor;
