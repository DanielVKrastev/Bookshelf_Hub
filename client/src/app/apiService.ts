import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from './types/review';
import { Book } from './types/book';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getReviews(limit?: number) {

    let url = `/api/reviews`;
    if (limit) {
      url += `?limit=${limit}`;
    }
    return this.http.get<Review[]>(url);
  }

  getBooks(limit?: number) {

    let url = `/api/books`;
    if (limit) {
      url += `?limit=${limit}`;
    }

    return this.http.get<Book[]>(url);
  }

  getSingleBook(id: string) {
    return this.http.get<Book>(`/api/books/${id}`);
  }

  createBook(
    author: string, 
    category: string,
    country: string, 
    description: string, 
    imageUrl: string, 
    language: string, 
    publishYear: number, 
    publisher: string, 
    title: string, 
    totalPage: number) {
    const payload = { author, category, country, description, imageUrl, language, publishYear, publisher, title, totalPage }
    return this.http.post<Book>(`/api/books`, payload);
  }

    editBook(
    bookId: string,
    author: string, 
    category: string,
    country: string, 
    description: string, 
    imageUrl: string, 
    language: string, 
    publishYear: number, 
    publisher: string, 
    title: string, 
    totalPage: number) {
    const payload = { author, category, country, description, imageUrl, language, publishYear, publisher, title, totalPage }
    return this.http.put<Book>(`/api/books/${bookId}`, payload);
  }

    //Delete book - http.delete book ID
  deleteBook(bookId: string) {
    return this.http.delete<Book>(`/api/books/${bookId}`);
  }

  //CRUD operations
  //Update book
  createReviewForBook(bookId: string, rating: number, text: string) {
    const payload = { rating, text }
    return this.http.post<Book>(`/api/books/${bookId}`, payload);
  }

  favouriteForBook(bookId: string, ownerId: string) {
    const payload = { ownerId }
    return this.http.put<Book>(`/api/books/${bookId}/favourite`, payload);
  }

  //Update Review book
  updateReview(bookId: string, reviewId: string, text: string, rating: number) {
    const payload = { text, rating }
    return this.http.put<Review>(`/api/books/${bookId}/reviews/${reviewId}`, payload);
  }

  //Delete review from book - http.delete book ID review ID
  deleteReview(bookId: string, reviewId: string,) {
    return this.http.delete<Review>(`/api/books/${bookId}/reviews/${reviewId}`);
  }
}
