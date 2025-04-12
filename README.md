# PlacementPro

PlacementPro is a Next.js & TypeScript-based Placement Management System designed to streamline the placement process for students and administrators. It allows admins to manage placement details and enables students to track important placement events and add them to their calendars.

## Features

### Admin Features
- Secure Admin Login for managing placement details.
- Add, edit, and delete company details (name, eligibility, package, important dates, etc.).
- Real-time database updates using Prisma with PostgreSQL.

### User Features
- User Registration & Login with NextAuth.
- View placement details in a structured dashboard.
- Add important dates to Google Calendar or Apple Calendar with a single click.

### Security & Performance
- NextAuth for session management.
- PostgreSQL database hosted on Neon.tech.

## Tech Stack
- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Next.js API routes, Prisma ORM
- Database: PostgreSQL (Neon.tech)
- Authentication: NextAuth.js

## Installation & Setup

### 1. Clone the repository
```sh
git clone https://github.com/yourusername/placement-management.git
cd placement-management
```

### 2. Install dependencies
```sh
npm install
```

### 3. Set up environment variables
Create a `.env` file and add the following:
```
DATABASE_URL=your_postgresql_database_url
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_ADMIN_SECRET: it is the secret one needs to access the admin registration as /signup?secret=NEXT_PUBLIC_ADMIN_SECRET

```

### 4. Run the development server
```sh
npm run dev
```
Your app will be running at `http://localhost:3000`

---

PlacementPro – Simplifying the placement process for students and administrators!

