<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://neon.com/brand/neon-logo-dark-color.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://neon.com/brand/neon-logo-light-color.svg">
  <img width="250px" alt="Neon Logo fallback" src="https://neon.com/brand/neon-logo-dark-color.svg">
</picture>

### Supabase to Neon Migration example

This repository is the companion to our guide on migrating a full-stack application from Supabase to Neon.

> [!NOTE]
> You are on the `neon` branch.
>
> This branch contains the final Next.js application **after** it has been successfully migrated to the Neon stack. It uses Neon Auth for authentication and connects to a Neon Postgres database via the Neon Data API.
>
> To see the original application running on Supabase, check out the **[`supabase` branch](https://github.com/neondatabase-labs/supabase-to-neon-todo-app/tree/supabase)**.

---

### Technology Stack

*   **Framework**: Next.js (App Router)
*   **Database**: **Neon Postgres**
*   **Authentication**: **Neon Auth (`@stackframe/stack`)**
*   **Data Access**: **Neon Data API (via `postgrest-js`)**
*   **Styling**: Tailwind CSS

### 🚀 Get Started

To run this version of the application locally, you'll need a Neon project with Neon Auth and the Data API enabled.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/neondatabase-labs/supabase-to-neon-todo-app.git
    cd supabase-to-neon-todo-app
    ```
    *(You will be on the `neon` branch by default.)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Copy the example environment file:
        ```bash
        cp .env.example .env.local
        ```
    -   Open `.env.local` and add your Neon Data API URL and Neon Auth credentials. You can find these in your Neon project dashboard.
        ```env
        # Found in the Neon Data API page
        NEXT_PUBLIC_DATA_API_URL=YOUR_NEON_DATA_API_URL

        # Found in the Neon Auth > Configuration page
        NEXT_PUBLIC_STACK_AUTH_URL=YOUR_STACK_AUTH_URL
        NEXT_PUBLIC_STACK_PROJECT_ID=YOUR_STACK_PROJECT_ID
        STACK_SECRET_SERVER_KEY=YOUR_STACK_SECRET_SERVER_KEY
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

### The Migration Story

This application is the final result of the migration process. Key changes from the `supabase` branch include:
-   Removal of all Supabase client libraries (`@supabase/ssr`).
-   Integration of the Neon Auth SDK (`@stackframe/stack`) for user authentication, session management, and route protection.
-   Replacement of the Supabase data client with `postgrest-js` to interact with the Neon Data API.

The complete, line-by-line code changes can be reviewed in the project's pull request:

➡️ **[View the Supabase to Neon Migration PR](https://github.com/neondatabase-labs/supabase-to-neon-todo-app/pull/3/files)**

### 📚 Read the Full Guide

For a step-by-step walkthrough of the entire migration process, including data transfer, user remapping, and RLS policy updates, read the full guide on the Neon documentation.

**[The Complete Supabase to Neon Database & Auth Migration Guide](https://neon.com/guides/complete-supabase-migration)**
