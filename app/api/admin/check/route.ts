import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
    try {
        const authed = await isAuthenticated();
        return NextResponse.json({ authenticated: authed });
    } catch (error) {
        console.error("Auth check error:", error);
        return NextResponse.json({ authenticated: false });
    }
}
