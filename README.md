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

## Screenshots

### Home Page
![Home Page](https://media.discordapp.net/attachments/1165275866897580074/1282409832451936256/Screenshot_2024-09-08_235554.png?ex=66df40ba&is=66ddef3a&hm=6107eeaa72ba166a6656d6b14481f99b55fed8c311f9279b98fd645eacf8e63c&=&format=webp&quality=lossless&width=1396&height=778)

### Admin Login / Registration
![Admin Login](https://media.discordapp.net/attachments/1165275866897580074/1282409886491086889/Screenshot_2024-09-09_000648.png?ex=66df40c6&is=66ddef46&hm=91e3409defe70ccbe139b44d40eef1877479e71cb369be08417f329896d817eb&=&format=webp&quality=lossless&width=1389&height=778)

![Admin Registration](https://media.discordapp.net/attachments/1165275866897580074/1282409887804162088/Screenshot_2024-09-09_000636.png?ex=66df40c7&is=66ddef47&hm=11b8257c5dadf39702e98a8acca583bf2a1ca6b54d23be56399195373506935a&=&format=webp&quality=lossless&width=1392&height=778)

### Quiz Update and Delete
![Quiz Update](https://media.discordapp.net/attachments/1165275866897580074/1282409887472550009/Screenshot_2024-09-09_000002.png?ex=66df40c7&is=66ddef47&hm=5a1275171af0f69c23d33d3219d2ecc71d5b1591cf5b7d8c52781e24a817df77&=&format=webp&quality=lossless&width=1399&height=778)


### Quiz Creation
![Quiz Creation](https://media.discordapp.net/attachments/1165275866897580074/1282409886969364520/Screenshot_2024-09-08_235945.png?ex=66df40c7&is=66ddef47&hm=5c92b25c2c241f1d6e4694550f78e629bb8dcf26825ac50019374df5f6a06b0c&=&format=webp&quality=lossless&width=1395&height=778)

### User View Quizzes
![User View Quizzes](https://media.discordapp.net/attachments/1165275866897580074/1282409832787345449/Screenshot_2024-09-08_235613.png?ex=66df40ba&is=66ddef3a&hm=dcc275505e22181ea1b8a59a2f6dff3965f267955613cf871b3d6cf5cc1112de&=&format=webp&quality=lossless&width=1395&height=778)

### Quiz Taking
![Quiz Taking](https://media.discordapp.net/attachments/1165275866897580074/1282409833835921471/Screenshot_2024-09-08_235711.png?ex=66df40ba&is=66ddef3a&hm=f639500316bdd5f08ee5ffe530c0a7d0463f607514830ab300c59a6fe54e62f5&=&format=webp&quality=lossless&width=1389&height=778)

### Quiz Report
![Quiz Report](https://media.discordapp.net/attachments/1165275866897580074/1282409834150367262/Screenshot_2024-09-08_235734.png?ex=66df40ba&is=66ddef3a&hm=35a1a5e0cd30beca5609c8f85d6f182ef437a7a98b0411378f9718e343419241&=&format=webp&quality=lossless&width=1395&height=778)

### Quiz Leader Board
![Quiz Leader Board](https://media.discordapp.net/attachments/1165275866897580074/1282409834440036476/Screenshot_2024-09-08_235749.png?ex=66df40ba&is=66ddef3a&hm=dda18c2830ab0c39baa2d90e864c7de0282c76e5bab135b99d9eda924745e13b&=&format=webp&quality=lossless&width=1395&height=778)

### Quiz Chart Report
![Quiz Chart Report](https://media.discordapp.net/attachments/1165275866897580074/1282409834792222740/Screenshot_2024-09-08_235803.png?ex=66df40ba&is=66ddef3a&hm=448ce761ca26f4c12a228c376175297343bf607cb99437adb10a9ab2ec251aeb&=&format=webp&quality=lossless&width=1396&height=778)

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
