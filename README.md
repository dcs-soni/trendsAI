# trendsAI 🌟

<img src="https://raw.githubusercontent.com/dcs-soni/trendsAI/refs/heads/main/public/logo.png?token=GHSAT0AAAAAAC5EEBE6CSXXGPXXVHYZJ2OIZ6S2L7A" alt="trendsAI Logo" width="100%">




## Introduction

Welcome to **trendsAI**, a web application designed to serve as a comprehensive directory for innovative AI applications and models. Whether you're a developer, a non-technical person, researcher, or AI enthusiast, trendsAI provides a platform to explore, engage, and discover the latest advancements in artificial intelligence.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Code Explanation](#code-explanation)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

## Features 🚀

- **User Authentication**: Secure sign-in options using Google, GitHub, or traditional email/password.
- **Explore AI Tools**: Browse a curated list of AI applications and models, complete with descriptions and website links.
- **Voting System**: Engage with the community by liking your favorite applications and models.
- **Admin Dashboard**: A private dashboard (accessible only to me, for now 🫣) for managing AI applications, models, and user accounts.
- **Responsive Design**: Enjoy a seamless experience on both desktop and mobile devices.
- **Interactive UI**: Smooth animations and transitions enhance user experience.

## Tech Stack 🛠️

- **Frontend**:

  - [Next.js](https://nextjs.org/) - A React framework for building server-side rendered applications.
  - [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.

- **Backend**:

  - [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 engine.
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - API routes for server-side logic.

- **Database**:

  - [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source relational database.
  - [Prisma](https://www.prisma.io/) - A modern ORM for Node.js and TypeScript.

- **Authentication**:

  - [NextAuth.js](https://next-auth.js.org/) - A complete open-source authentication solution for Next.js applications.
  - [bcrypt](https://www.npmjs.com/package/bcrypt) - A library for securely hashing passwords.

- **State Management**:
  - [Zustand](https://github.com/pmndrs/zustand) - A small, fast, and scalable bearbones state-management solution.

## Architecture 🏗️

The architecture of trendsAI is designed to be modular and scalable. The application is structured into several key components:

- **Frontend**: Built with Next.js, the frontend handles user interactions and displays data fetched from the backend.
- **Backend**: The API routes handle requests and responses, interacting with the database through Prisma.
- **Database**: PostgreSQL stores user data, AI applications, models, and votes.

## Installation ⚙️

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL

### Clone the Repository

```bash
git clone https://github.com/yourusername/trendAI.git
cd trendAI
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
DATABASE_URL=your_database_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

### Run Migrations

```bash
npx prisma migrate dev --name init
```

### Seed the Database

```bash
npx prisma db seed
```

### Start the Development Server

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Usage 🧑‍💻

1. **Sign Up / Sign In**: Create an account or sign in using OAuth.
2. **Explore AI Tools**: Browse through the list of AI applications and models.
3. **Like and Comment**: Engage with the tools by liking and commenting on them.
4. **Admin Features**: Access the admin dashboard to manage content.

## Code Explanation 📝

### Key Components

#### 1. **User Authentication**

The authentication system is powered by NextAuth.js, which simplifies the process of adding authentication to Next.js applications. Here's a snippet from the `auth.config.ts` file that sets up the authentication providers:

```typescript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // Additional configuration options
};
```

This configuration allows users to sign in using their Google or GitHub accounts, enhancing user experience and security.

#### 2. **Data Fetching with Prisma**

The application uses Prisma to interact with the PostgreSQL database. For example, in the `AdminDashboard.tsx`, we fetch AI applications and models:

```typescript
const [aiApps, aiModels, users] = await Promise.all([
  prisma.aIApp.findMany({
    include: {
      _count: {
        select: {
          votes: true,
        },
      },
    },
  }),
  prisma.aIModel.findMany({
    include: {
      _count: {
        select: {
          votes: true,
        },
      },
    },
  }),
  prisma.user.count(),
]);
```

This code retrieves all AI applications and models, along with the total number of users, allowing the admin to have a comprehensive overview of the platform.

## Screenshots 📸

![Dashboard Overview](https://example.com/dashboard-screenshot.png)
_Dashboard Overview_

![AI Applications](https://example.com/ai-apps-screenshot.png)
_AI Applications List_

## Contributing 🤝

Contributions are welcome! To get started:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## Acknowledgments 🙏

- [Next.js](https://nextjs.org/) for providing a powerful framework.
- [Prisma](https://www.prisma.io/) for simplifying database interactions.
- [NextAuth.js](https://next-auth.js.org/) for seamless authentication.
- [Tailwind CSS](https://tailwindcss.com/) for beautiful UI components.

---

Feel free to reach out if you have any questions or suggestions! Let's build something amazing together! 🚀
