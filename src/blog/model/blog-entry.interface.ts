import { User } from "src/user/models/user.interface";

export interface BlogEntry {
    id?: number;
    title?: string;
    slug?: string;
    descriptiong?: string;
    body?: string;
    createdAt?: Date;
    updatedAt?: Date;
    like?: number;
    author?: User;
    headerImage?: string;
    publishedDate?: Date;
    isPublished?: boolean;
}