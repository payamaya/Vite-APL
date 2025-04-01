# E-Learning Platform Frontend

This is the frontend of the **E-Learning Platform**, built using **React Vite with TypeScript**. The platform facilitates online learning by allowing **admins, teachers, and students** to interact within a structured system.

## Features

### Authentication & Authorization
- User authentication with login functionality.
- Role-based access control (Admin, Teacher, Student).

### Admin Features
- Create and manage **teachers, students, and courses**.
- Assign teachers to courses.

### Teacher Features
- Add and manage **courses**.
- Create **modules, activities, and activity details** within courses.
- View and grade **student-submitted activities** (quizzes, assignments, etc.).

### Student Features
- Access only the courses assigned by **teachers or admins**.
- View course content and submit **quizzes and assignments**.

## Technology Stack
- **Frontend:** React Vite (TypeScript)
- **Styling:** Bootstrap
- **Navigation:** React Router

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to Run the Application

1. **Clone the repository:**
   ```sh
   git clone https://github.com/payamaya/Vite-APL.git
   cd e-learning-frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   The application should now be running at `http://localhost:5173/` (default Vite port).

## Deployment

### Build for Production
To create an optimized production build, run:
```sh
npm run build
# or
yarn build
```
This will generate a `dist/` folder with the optimized static assets.

### Deploying to a Hosting Service
You can deploy the built files to any static hosting provider (e.g., Vercel, Netlify, Firebase Hosting, GitHub Pages, etc.).

Example deployment with **Vercel**:
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy the project:
   ```sh
   vercel
   ```
Follow the CLI instructions to complete the deployment.

## Contribution
If you would like to contribute to this project, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

