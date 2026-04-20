# 📚 Bookshelf_Hub - Book Forum Application (SoftUni Project)
A modern Angular-based application that allows users to explore, share and discuss books. <br />
Users can register, login, browse book catalogs, view detailed information, and create or manage their own book content.
<br />
The project uses an Express server with MongoDB for backend operations and data management.

## 🚀 Features
- User authentication (Register / Login / Logout)
- Browse books catalog
- View book details
- Create, edit and delete books and reviews
- Favourites Book
- User profile with personal books
- Error handling and validation

## 🛠️ Technologies Used
<b>Frontend</b>
- Angular 21
- TypeScript
- HTML / CSS
- RxJS
<b>Backend</b>
- Node.js
- Express
- MongoDB (Mongoose)

## ⚙️ Getting Started

Follow these steps to run the project locally:

1. Clone the repository:
```sh
git clone https://github.com/DanielVKrastev/Bookshelf_Hub.git
```

2. Navigate to <b>"client"</b> folder, install dependencies and run the app:
```sh
cd client
npm install
npm start
```

3. Open a new terminal windows and navigate to <b>"rest-api"</b> folder, install dependencies, and start the server:

```sh
cd rest-api
npm install
npm start
```

Server runs on: 
http://localhost:3000

<p>Important: Do not shutting down the terminal where the app (the client) is running.</p>

4. Open the app (rental-a-motorcycle terminal):
Go to <a href="http://localhost:4200/">http://localhost:4200</a> (or the displayed port) in your browser.

5. Database Setup
Make sure MongoDB is running locally:
mongod
If you have a dump: 
```sh
mongorestore -d bookshelf ./bookshelf
```

## 🧪 Test User

You can use the following test account to explore the application:

Email: test2026@test.com
Password: test2026

## 🌐 Application URLs
Frontend: http://localhost:4200
Backend: http://localhost:3000

## 📁 Project Structure
📁 Project Structure
client/ <br />
 ├── src/ <br />
 │   ├── app/ <br />
 │   │   ├── core/ <br />
 │   │   ├── user/ <br />
 │   │   ├── books/ <br />
 │   │   ├── shared/ <br />
 │   │   └── types/ <br />
 │   └── assets/ <br />
 └── ... <br />
<br />
 rest-api/ <br />
 ├── controllers/ <br />
 ├── models/ <br />
 ├── routes/ <br />
 ├── index.js <br />
 └── ... <br />

## 🎯 Future Improvements
- Ratings system
- Comments on books
- Responsive UI improvements

### Navigations
- **Home**: Redirects to the Home page.  
- **Books**: Redirects to the Books Catalog page.  

#### **User Authentication Links:**
- **Guest** (not logged in):
  - **Log In**: Redirects to the Login page.  
  - **Register**: Redirects to the Registration page.

- **User** (logged in):
  - **Add Book**: Redirects to the Add book.  
  - **My Profile**: Redirects to the Profile page *(edit profile)*.  
  - **My Books**: Redirects to the My Books page *(edit, delete books)*.  
  - **My Reviews**: Redirects to the My Reviews page *(edit, delete reviews)*.  
  - **Logout**: Logs the user out.

  <div>
   <h4>Guest navigation</h4>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/guest-navbar.png">
</div>
<div>
   <h4>User navigation</h4>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/user-navbar.png">
</div>

#### **Home page:**
<div>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/home-page.png">
</div>

#### **Books catalog:**
<div>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/books-catalog-page.png">
</div>

#### **Current Book:**
<div>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/current-book-page.png">
</div>

#### **Login Page:**
<div>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/login-page.png">
</div>

#### **Register Page:**
<div>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/register-page.png">
</div>
<div>
    <h4>Register page with validation </h4>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/register-page-validation.png">
</div>

#### **My Profile Page:**
<div>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/my-profile-page.png">
</div>
<div>
    <h4>Edit profile </h4>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/edit-profile.png">
</div>

#### **My Books Page:**
<div>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/my-books-page.png">
</div>
<div>
    <h4>Edit book </h4>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/my-books-page-edit.png">
</div>

#### **My Reviews Page:**
<div>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/my-reviews-page.png">
</div>
<div>
    <h4>Edit review </h4>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/my-reviews-page-edit.png">
</div>

#### **Add Book Page:**
<div>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/add-book-page.png">
</div>
<div>
    <h4>Validation inputs </h4>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/add-book-page-validation.png">
</div>

#### **Add review in Current Book Page:**
<div>
    <h4>Write review </h4>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/write-review.png">
</div>
<div>
    <h4>Display review </h4>
   <img src="https://raw.githubusercontent.com/DanielVKrastev/bookshelf_hub/main/client/screenshots/show-review.png">
</div>

## 👨‍💻 Author
Daniel Krastev

## 📌 Notes
Make sure MongoDB is running before starting the backend. <br />
If you encounter errors, check API connection and ports.
