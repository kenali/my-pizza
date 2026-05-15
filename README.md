# 🛒 Modern E-commerce / Product Platform

A full-stack web application built with **Next.js (App Router)**, focused on modern product architecture, authentication, database-driven logic, and scalable UI patterns.

The project demonstrates real-world frontend engineering with server actions, authentication flows, advanced routing, and full integration with database and email services.

---

## 🚀 Key Features

### 🔎 Product System
- Server-side rendering (SSR) for product pages
- Advanced product filtering system
- URL-based filter persistence (query params)
- Clean and optimized data fetching flow

### 🛒 Shopping Experience
- Add / remove products from cart
- Persistent cart state using global state management
- Smooth UX with real-time UI updates
- Product viewing via:
  - Dedicated pages
  - Modal views
  - Parallel Routes (Next.js App Router)

---

### 🔐 Authentication System
- NextAuth-based authentication
- Support for:
  - Credentials login
  - GitHub OAuth
  - Google OAuth
- Secure session handling
- Protected routes and user-specific data access

---

### 👤 User Features
- User profile management
- Editable personal data
- Persistent user state connected to database

---

### 💳 Payments System
- Stripe integration for secure payments
- Order creation and payment confirmation flow
- Real-time payment status handling
- Fully server-driven checkout process

---

### 📧 Email System
Powered by **Resend**
- Email verification after registration
- Account activation via confirmation link
- Transactional emails:
  - User registration
  - Order creation
  - Payment success notifications

---

### 🧩 Advanced UI / UX
- Modern UI built with **TailwindCSS + shadcn/ui**
- Form handling with validation
- Optimistic UI updates
- Toast notifications system
- Loading states with top loader

---

## 🗄 Database Architecture

- **PostgreSQL** as primary database
- **Prisma ORM** for schema modeling and queries
- Structured relational design for:
  - Users
  - Products
  - Orders
  - Sessions
  - Payments

- Server-side business logic implemented via:
  - Server Actions
  - API Routes (Route Handlers)

---

## 🛠 Tech Stack

### Framework
- Next.js (App Router)
  - Parallel Routes
  - Route Groups
  - Server Actions
  - API Routes

### Language
- TypeScript

### UI / Styling
- TailwindCSS
- shadcn/ui
- lucide-react

### State Management
- Zustand
- react-use

### Forms & Validation
- React Hook Form
- Zod

### Backend / DB
- Prisma ORM
- PostgreSQL

### Authentication
- NextAuth.js

### Email Service
- Resend

### UI Utilities
- react-hot-toast
- nextjs-toploader
- react-insta-stories

---

## 🧠 Architecture Overview

This project follows a modern Next.js full-stack architecture:

- Server Components for data fetching
- Server Actions for mutations
- Client Components for interactive UI
- Prisma ORM for database layer abstraction
- Authentication handled via NextAuth
- Stripe for payment processing
- Resend for transactional email workflows

The system is designed to minimize client-side complexity while keeping business logic server-driven where possible.

---

## 📦 Getting Started

### Install dependencies

```bash
npm install