"use client";

import { useUser } from '@stackframe/stack';
import { TodoApp } from "@/components/TodoApp";
import Link from 'next/link';

export default function Page() {
  const user = useUser();

  if (!user) {
    return (
      <main className="max-w-md mx-auto my-10 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Todo App</h1>
        <p className="text-gray-600 dark:text-gray-400">
          <Link href="/handler/login" className="text-blue-500 hover:underline">Sign up or sign in</Link> to continue.
        </p>
      </main>
    );
  }

  return <TodoApp user={user} />;
}