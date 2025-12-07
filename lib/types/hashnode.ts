// Hashnode API Types
export interface HashnodeTag {
    name: string;
}

export interface HashnodeCoverImage {
    url: string;
}

export interface HashnodePost {
    id: string;
    title: string;
    brief: string;
    url: string;
    slug: string;
    publishedAt: string;
    readTimeInMinutes: number;
    coverImage?: HashnodeCoverImage;
    tags?: HashnodeTag[];
}

export interface HashnodePostDetail extends HashnodePost {
    subtitle?: string;
    content: {
        html: string;
    };
}
