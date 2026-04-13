import { Book } from "./book";
import { User } from "./user";

export interface Review {
    _id: string,
    text: string,
    rating: number,
    ownerId: User,
    bookId: Book,
    created_at: string,
    __v: number
}