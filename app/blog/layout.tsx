import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Sakib Nahid",
    description: "Read my thoughts on web development, tutorials, and technology.",
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            {children}
        </div>
    );
}
