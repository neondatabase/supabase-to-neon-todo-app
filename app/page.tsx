"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { TodoApp } from "@/components/TodoApp";

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );
    return () => subscription?.unsubscribe();
  }, []);

  if (!session) {
    return (
      <main className="max-w-md mx-auto my-10 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Todo App</h1>
        <p className="text-gray-600 dark:text-gray-400">
          <a href="/login" className="text-blue-500 hover:underline">Sign up or sign in</a> to continue.
        </p>
      </main>
    );
  }

  return <TodoApp user={session.user} />;
}