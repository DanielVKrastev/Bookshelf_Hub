import { Book } from "./book";
import { User } from "./user";

export interface Review {
    text: string,
    rating: number,
    ownerId: User,
    bookId: Book,
    created_at: string,
    __v: number
}