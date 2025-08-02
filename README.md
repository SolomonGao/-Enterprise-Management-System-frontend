# 🌐 Enterprise Management System Frontend

This is the **frontend application** for the Enterprise Management System, built with [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/).  
It is designed to provide a modern, responsive, and efficient interface for managing users, orders, materials, and more in a real-world business environment.

> ⚙️ Fully integrated with the [Express.js backend](https://github.com/SolomonGao/server), and ready for cloud deployment.

![Next.js](https://img.shields.io/badge/Next.js-Production%20Ready-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-Strong%20Typing-blue?logo=typescript)
![License](https://img.shields.io/github/license/SolomonGao/-Enterprise-Management-System-frontend)

---

## ✨ Features

- ⚡ **Fast and responsive UI** built with React and Next.js
- 🎨 **Modern styling** using Tailwind CSS and minimal UI components
- 🔐 **Integrated authentication** with Google OAuth and JWT support
- 🧩 **Modular structure** for pages, components, hooks, and utilities
- 🧠 **Smart state management** using context and hooks
- 🔄 **Full API integration** with the backend system for real-time data
- 🧪 **Built for scale**: easily extendable and production-ready

---

## 🛠 Tech Stack

| Technology      | Purpose                            |
|------------------|------------------------------------|
| **Next.js**       | Server-side rendering, routing     |
| **React**         | UI components and state            |
| **TypeScript**    | Static typing                      |
| **Tailwind CSS**  | Styling and design system          |
| **JWT**           | Secure user sessions               |
| **Google OAuth**  | Third-party login integration      |
| **React Hook Form** | Form management                 |

---

## 📁 Project Structure

```txt
frontend/
├── app/                  # Next.js 13+ App directory
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── ...               # Other route-based pages
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions (API clients, etc.)
├── styles/               # Global styles
├── public/               # Static assets
├── .env.local            # Local environment config
├── tailwind.config.ts    # Tailwind setup
├── next.config.js        # Next.js configuration
└── tsconfig.json         # TypeScript configuration

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
