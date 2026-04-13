import { Review } from "./review";
import { User } from "./user";

export interface Book {
    title: string,
    author: string,
    totalPage: number,
    publisher: string,
    publishYear: number,
    category: string,
    language: string,
    country: string,
    ownerId: User,
    favourites: string[],
    reviews: Review[],
    created_at: string,
    __v: number
}