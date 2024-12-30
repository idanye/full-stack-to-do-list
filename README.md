# To Do List Application

This is a full-stack To Do List application that allows users to create, update, view, and delete tasks. The application is built with modern web development technologies, including React, Node.js, Express, and MongoDB.

## Features

- **Task Management**: Create, edit, delete, and view tasks.
- **Responsive UI**: A user-friendly and responsive interface built with React.
- **Form Validation**: Includes error handling and validation for required fields.
- **API Integration**: Communicates with a backend API to manage tasks in a MongoDB database.
- **Real-Time Updates**: Automatically updates the task list upon any changes.
- **Priority and Status Management**: Set priorities and statuses for each task.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **React Router**: For navigating between pages.
- **CSS**: For styling the application.

### Backend
- **Node.js**: Runtime environment.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing tasks.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.

---

## Project Setup

### Prerequisites

- **Node.js**: Install from [Node.js official site](https://nodejs.org/).
- **MongoDB**: Install locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/full-stack-to-do-list.git
   ```
2. Navigate to the project directory:
   ```bash
   cd full-stack-to-do-list
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your MongoDB connection string:
   ```
   MONGO_URI=your_mongo_connection_string
   PORT=4000
   CLIENT_URL=http://localhost:3000
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:4000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`.

---

## API Endpoints

### Base URL
- `http://localhost:4000`

### Endpoints

| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| GET    | `/api/tasks`       | Fetch all tasks           |
| GET    | `/api/tasks/:id`   | Fetch a specific task     |
| POST   | `/api/tasks`       | Create a new task         |
| PATCH  | `/api/tasks/:id`   | Update an existing task   |
| DELETE | `/api/tasks/:id`   | Delete a specific task    |

---

## Application Structure

### Frontend

```
frontend/
├── public/           # Static files
├── src/
│   ├── components/ # Reusable React components
│   ├── pages/      # Page components
│   ├── hooks/      # Custom React hooks
│   ├── context/    # Context API for state management
│   └── App.js      # Application entry point
```

### Backend

```
backend/
├── models/         # Mongoose models
├── routes/         # Express routes
├── server.js       # Backend entry point
```

---

## Features in Detail

### Task Properties

1. **Title**: A string that represents the task title.
2. **Description**: A detailed description of the task.
3. **Due Date**: The deadline for the task.
4. **Assigned User ID**: ID of the user assigned to the task.
5. **Priority ID**:
   - 1: Low
   - 2: Medium
   - 3: High
   - 4: Urgent
6. **Status ID**:
   - 1: Draft
   - 2: In Progress
   - 3: On Hold
   - 4: Completed
   - 5: Deleted
7. **Create Date**: Timestamp when the task was created.
8. **Update Date**: Timestamp when the task was last updated.