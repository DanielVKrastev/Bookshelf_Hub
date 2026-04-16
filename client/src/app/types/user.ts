import { Book } from "./book";
import { Review } from "./review";

export interface User {
    _id: string,
    books: Book[],
    reviews: Review[],
    email: string,
    username: string,
    password: string,
    description: string,
    imageUrl: string,
    created_at: string,
    updatedAt: string,
    __v: number
}

export interface UserForAuth extends User {
    username: string;
    email: string;
    password: string;
    id: string;
}

export interface ProfileDetails{
    username: string,
    email: string,
    imageUrl: string,
    description: string,
    books: Book[],
    reviews: Review[]
}