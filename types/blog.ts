export interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    cover_image: string | null;
    published: boolean;
    tags: string[];
    created_at: string;
    updated_at: string;
}
