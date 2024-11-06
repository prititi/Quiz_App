# Quiz Application

## Overview

This quiz application allows users to create, manage, and take quizzes. The app provides an admin panel for creating quizzes, and users can take quizzes without logging in. After completing a quiz, users can view a performance report that includes their score, correct answers, and time taken to finish.

## Frontend Features

### Landing Page
- **Introduction**: A brief overview of the app's purpose and functionality.
- **Navigation**: Easy access to quizzes and admin panel (for authorized users).

### Admin Panel
- **Admin Login**: Secure login for admins using JWT-based authentication.
- **Quiz Management**: Admins can create, read, update, and delete quizzes. Each quiz includes at least 5 questions, and each question has multiple-choice answers (with at least 4 options).
- **Quiz Creation**: Admins can create quizzes with a title, description, and questions.
- **Edit/Delete Quizzes**: Admins can modify or remove quizzes.

### User Quiz Interface
- **Quiz Navigation**: Users can navigate between questions and submit answers.
- **Name Entry**: Users can enter their name before taking a quiz.
- **Multiple-Choice Questions**: Users select answers from multiple-choice options.

### Quiz Reporting
- **Performance Report**: After submission, users can view their quiz results, including:
  - User answers and correct answers.
  - Total score and percentage.
  - Time taken to complete the quiz.

## Backend Features

### Admin Authentication
- **JWT Authentication**: Admins can log in securely.
- **Protected Routes**: Only admins can access certain routes (e.g., quiz management).

### User Login/SignUp API
- **Register**: POST `/api/auth/register`
- **Login**: GET `/api/auth/login`


### Quiz Management API
- **Create Quiz**: POST `/api/quizzes` – Admin can create a quiz.
- **Get All Quizzes**: GET `/api/quizzes` – Retrieve all available quizzes.
- **Get Quiz by ID**: GET `/api/quizzes/:id` – Get quiz details by quiz ID.
- **Update Quiz**: PUT `/api/quizzes/:id` – Admin can update a quiz.
- **Delete Quiz**: DELETE `/api/quizzes/:id` – Admin can delete a quiz.

### User Quiz API
- **Submit Quiz**: POST `/api/quizzes/:id/submit` – Submit user answers for a specific quiz.
- **Quiz Report**: GET `/api/quizzes/:id/submissions` – Retrieve the quiz report for a user.


## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management.
- MongoDB for database storage.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/quiz-app.git
    cd quiz-app
    ```

2. Install dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

3. Set up environment variables:
   - Create a `.env` file with the following:
     ```sh
     PORT=8000
     MONGODB_URI=your_mongodb_uri
     ```

4. Start the development server:
    ```sh
    npm run dev
    ```

5. Run tests for components:
    ```sh
    npx vitest run
    ```

### Deployment

To deploy the application, follow the instructions for your hosting service (e.g., Vercel, Netlify, AWS). Ensure both frontend and backend are deployed and linked.

1. Backend deployment link:
    ```sh
    https://dummy-q-server.onrender.com
    ```

2. Frontend deployment link:  [https://quiz-app-delta-bay.vercel.app/](https://quiz-app-delta-bay.vercel.app/)
   


## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

For any questions or suggestions, please contact us at support@quiz.com.

---

Thank you for using our quiz application!
