# Task-management-BE

Task Management Backend

A simple task management backend API built with Node.js, Express, and TypeScript, using PostgreSQL as the database and Sequelize as the ORM.

# Features

- TypeScript for type safety and better maintainability.

- Express.js for building RESTful API endpoints.

- PostgreSQL for relational data storage.

- Sequelize ORM for database modeling, migrations, and seeders.

# Prerequisites

Before you begin, ensure you have the following installed:

Node.js (v21.x or higher)

npm (v10.x or higher)

PostgreSQL (v17.x or higher)

sequelize-cli (globally or via npx)

# Getting Started

Clone the repository
```bash
git clone https://github.com/<your-username>/task-management-BE.git
cd task-management-BE

# Install dependencies
npm install

# Environment Variables
Copy the example file and fill in your credentials:

cp .env.example .env

Update the following variables in .env:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_db_username
DB_PASSWORD=your_db_password

# Database Initialization
You can set up the database in two ways:

Option A: Using Raw SQL

If you prefer to run the provided db.sql directly:

psql -h $DB_HOST -U $DB_USER -d $DB_NAME -f ./db.sql

Option B: Using Sequelize CLI

# Create the database (if not created already):
npx sequelize-cli db:create

# Run migrations to build tables:
npx sequelize-cli db:migrate

# Run seeders to populate initial data:
npx sequelize-cli db:seed:all

# Running the Development Server
Start the API in watch mode so it restarts on file changes:

npm run dev

# API Endpoints
Method | Endpoint               |  Description 

POST   | /api/auth/register     |  Register
POST   | /api/auth/login        |  Login


GET    | /api/tasks             |  List all tasks
POST   | /api/tasks/            |  Create a new task
PUT    | /api/tasks/:id         |  Update an existing task
DELETE | /api/tasks/:id         |  Delete a task


GET    | /api/categories        |  List all categories


# Scripts
npm run dev: Run the server in development mode (with ts-node-dev).

npx sequelize-cli db:migrate: Run all pending migrations.

npx sequelize-cli db:seed:all: Run all seeders.

npx sequelize-cli db:create: Create the database specified in .env.

# Project Structure
├── src
│   ├── controllers    # Route handlers
│   ├── middleware     # Middleware
│   ├── models         # Sequelize models
│   ├── routes         # API route definitions
│   ├── types          # Types
│   ├── utils          # Utils
│   └── index.ts       # Application entry point
│   └── app.ts         # Route and DB connection
│   └── database.ts    # DB connection
├── .env.example       # Example environment variables
├── migrations         # Migration scripts
├── seeders            # Data seed scripts
├── db.sql             # Raw SQL schema and seed data
├── package.json
├── tsconfig.json
└── README.md          # Project documentation