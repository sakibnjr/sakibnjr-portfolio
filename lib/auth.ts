import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function isAuthenticated(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const authCookie = cookieStore.get("admin_auth");
        return authCookie?.value === "authenticated";
    } catch {
        return false;
    }
}

export function unauthorizedResponse() {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
