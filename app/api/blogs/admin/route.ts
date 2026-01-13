import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
    try {
        // Check authentication for admin endpoint
        const authed = await isAuthenticated();
        if (!authed) {
            return unauthorizedResponse();
        }

        if (!isSupabaseConfigured() || !supabase) {
            return NextResponse.json({ blogs: [] });
        }

        // Return ALL blogs for admin (including unpublished)
        const { data: blogs, error } = await supabase
            .from("blogs")
            .select("*")
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
