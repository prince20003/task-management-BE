-- db.sql

-- 1. Create database if it doesn't exist
CREATE DATABASE task_manager;
\connect task_manager

-- 2. Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. Users table (login via email/password)
CREATE TABLE IF NOT EXISTS users (
  id            UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          VARCHAR(255) NOT NULL UNIQUE,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Index on email for quick lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 4. Categories table
CREATE TABLE IF NOT EXISTS categories (
  id         UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);

-- 5. Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id          UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  priority    VARCHAR(255) NOT NULL,
  completed   BOOLEAN NOT NULL DEFAULT FALSE,
  due_date    TIMESTAMPTZ,
  user_id     UUID    NOT NULL,
  category_id UUID    NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_tasks_user
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE,

  CONSTRAINT fk_tasks_category
    FOREIGN KEY(category_id)
      REFERENCES categories(id)
      ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id    ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_category_id ON tasks(category_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date   ON tasks(due_date);