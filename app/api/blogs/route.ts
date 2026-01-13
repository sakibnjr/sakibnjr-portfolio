import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
    try {
        if (!isSupabaseConfigured() || !supabase) {
            return NextResponse.json({ blogs: [] });
        }

        const { data: blogs, error } = await supabase
            .from("blogs")
            .select("*")
            .eq("published", true)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ blogs: [] });
        }

        return NextResponse.json({ blogs: blogs || [] });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ blogs: [] });
    }
}

export async function POST(req: Request) {
    try {
        // Check authentication
        const authed = await isAuthenticated();
        if (!authed) {
            return unauthorizedResponse();
        }

        if (!isSupabaseConfigured() || !supabase) {
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 500 }
            );
        }

        const body = await req.json();
        const { title, slug, excerpt, content, cover_image, published, tags } = body;

        // Validate required fields
        if (!title || !slug || !content) {
            return NextResponse.json(
                { error: "Title, slug, and content are required" },
                { status: 400 }
            );
        }

        const { data: blog, error } = await supabase
            .from("blogs")
            .insert({
                title,
                slug,
                excerpt: excerpt || null,
                content,
                cover_image: cover_image || null,
                published: published || false,
                tags: tags || [],
            })
            .select()
            .single();

        if (error) {
            console.error("Supabase error:", error);
            if (error.code === "23505") {
                return NextResponse.json(
                    { error: "A blog with this slug already exists" },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { error: "Failed to create blog" },
                { status: 500 }
            );
        }

        return NextResponse.json({ blog }, { status: 201 });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
