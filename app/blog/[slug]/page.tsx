import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPostContent from "./BlogPostContent";
import type { Blog } from "@/types/blog";

interface BlogPageProps {
    params: Promise<{ slug: string }>;
}

async function getBlog(slug: string): Promise<Blog | null> {
    if (!isSupabaseConfigured() || !supabase) {
        return null;
    }

    const { data: blog, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

    if (error || !blog) {
        return null;
    }

    return blog;
}

export async function generateMetadata({
    params,
}: BlogPageProps): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        return {
            title: "Blog Not Found | Sakib Nahid",
        };
    }

    return {
        title: `${blog.title} | Sakib Nahid`,
        description: blog.excerpt || blog.title,
        openGraph: {
            title: blog.title,
            description: blog.excerpt || blog.title,
            type: "article",
            publishedTime: blog.created_at,
            images: blog.cover_image ? [blog.cover_image] : [],
        },
    };
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    return <BlogPostContent blog={blog} />;
}
