import type { Metadata } from "next";
import { ThemeProvider } from "@/components/core/theme-provider";

export const metadata: Metadata = {
    title: "Admin Dashboard | Sakib Nahid",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="min-h-screen bg-background">
                {children}
            </div>
        </ThemeProvider>
    );
}
