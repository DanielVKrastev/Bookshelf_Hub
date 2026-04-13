import { Review } from "./review";
import { User } from "./user";

export interface Book {
    _id: string,
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
    imageUrl: string,
    reviewsCount: number,
    averageRating: number,
    created_at: string,
    __v: number
}