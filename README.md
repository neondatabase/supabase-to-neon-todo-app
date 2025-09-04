<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://neon.com/brand/neon-logo-dark-color.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://neon.com/brand/neon-logo-light-color.svg">
  <img width="250px" alt="Neon Logo fallback" src="https://neon.com/brand/neon-logo-dark-color.svg">
</picture>

### Supabase to Neon Migration example

This repository is the companion to our guide on migrating a full-stack application from Supabase to Neon.

> [!NOTE]
> You are on the `supabase` branch.
> This branch contains the original Next.js application **before** the migration. It is fully functional and runs on the Supabase stack, using Supabase Auth and the Supabase data client.
>
> To see the final, migrated application running on Neon, check out the **[`neon` branch](https://github.com/neondatabase-labs/supabase-to-neon-todo-app/tree/neon)**.

---

### Technology Stack

*   **Framework**: Next.js (App Router)
*   **Database**: Supabase Postgres
*   **Authentication**: Supabase Auth (`@supabase/ssr`)
*   **Data Access**: Supabase Client (`@supabase/ssr`)
*   **Styling**: Tailwind CSS

### 🚀 Get Started

To run this version of the application locally, you'll need a Supabase project.

1.  **Clone the repository and check out this branch:**
    ```bash
    git clone https://github.com/neondatabase-labs/supabase-to-neon-todo-app.git
    cd supabase-to-neon-todo-app
    git checkout supabase
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Copy the example environment file:
        ```bash
        cp .env.example .env.local
        ```
    -   Open `.env.local` and add your Supabase Project URL and Anon Key. You can find these in your Supabase project dashboard under **Project Settings > API**.
        ```env
        NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
        NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

### Migration overview

This application represents the starting point for the migration detailed in our comprehensive guide. The goal is to move this entire stack: database, auth, and application code to Neon.

The complete, line-by-line code changes required for the migration can be reviewed in the project's pull request:

➡️ **[View the Supabase to Neon Migration PR](https://github.com/neondatabase-labs/supabase-to-neon-todo-app/pull/3/files)**

### 📚 Read the Full Guide

For a step-by-step walkthrough of the entire migration process, including data transfer, user remapping, and RLS policy updates, read the full guide on the Neon documentation.

**[The Complete Supabase to Neon Database & Auth Migration Guide](https://neon.com/guides/complete-supabase-migration)**
