# T3 App with Panda CSS and Park UI

This project is a modern web application built using the [T3 stack](https://create.t3.gg/), enhanced with Panda CSS and Park UI for styling and component design.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Prisma](https://www.prisma.io/) as ORM
- **API**: [tRPC](https://trpc.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Panda CSS](https://panda-css.com/) and [Park UI](https://park-ui.com/)
- **State Management**: [React Query](https://tanstack.com/query/latest)

## Key Features

1. **Type-safe API**: Using tRPC for end-to-end typesafe APIs.
2. **Authentication**: Implemented with NextAuth.js, supporting various providers.
3. **Database Integration**: PostgreSQL database with Prisma ORM for efficient data management.
4. **Styling Solution**: Panda CSS for atomic CSS-in-JS and Park UI for pre-built components.
5. **Server-side Rendering**: Leveraging Next.js for optimal performance and SEO.

## Project Structure

- `/src`: Main source code directory
  - `/app`: Next.js app router components
  - `/components`: Reusable React components
  - `/server`: Server-side code including API routes and authentication
  - `/trpc`: tRPC setup and API definitions
- `/prisma`: Prisma schema and migrations
- `/public`: Static assets

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables (copy `.env.example` to `.env` and fill in the values)
4. Start the development database: `./start-database.sh`
5. Run database migrations: `npm run db:push`
6. Start the development server: `npm run dev`
