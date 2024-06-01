

export type LoginType = {
    username: string;
    password: string;
}

export type SignUpType = {
    username: string;
    email: string;
    password: string;
}

export type ServiceType = {
    id: number;
    title: string;
    description: string;
}

export type BlogType = {
    id: number;
    title: string;
    description: string;
    content: string;
    category_title?: string;
    username?: string;
    image?: string;
    fileId: number;
    userId: string;
    categoryId: string;
};


export const ImageUrl = "http://localhost:5171/MyImages/";

