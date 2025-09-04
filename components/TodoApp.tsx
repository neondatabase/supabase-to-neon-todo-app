"use client";

import { createClient } from "@/lib/supabase/client";
import { Todo } from "@/types/Todo";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

export const TodoApp = ({ user }: { user: User }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTitle, setNewTitle] = useState("");
    const supabase = createClient();
    const userId = user.id;
    const userName = user.user_metadata?.name || user.email || "User";

    useEffect(() => {
        loadTodos();
    }, [userId]);

    async function loadTodos() {
        const { data, error } = await supabase
            .from("todos")
            .select("*")
            .order("inserted_at", { ascending: false });

        if (error) {
            console.error(error);
            return;
        }
        setTodos(data ?? []);
    }

    async function addTodo(e: React.FormEvent) {
        e.preventDefault();
        const title = newTitle.trim();
        if (!title) return;

        const { data, error } = await supabase
            .from("todos")
            .insert([{ title, user_id: userId }])
            .select()
            .single();

        if (error) {
            alert(error.message);
            return;
        }

        setTodos((prev) => (data ? [data as Todo, ...prev] : prev));
        setNewTitle("");
    }

    async function toggleComplete(todo: Todo) {
        const { data, error } = await supabase
            .from("todos")
            .update({ is_complete: !todo.is_complete })
            .eq("id", todo.id)
            .select()
            .single();

        if (error) {
            alert(error.message);
            return;
        }

        setTodos((prev) => prev.map((t) => (t.id === todo.id ? (data as Todo) : t)));
    }

    async function renameTodo(todo: Todo, title: string) {
        const trimmed = title.trim();
        if (!trimmed || trimmed === todo.title) return;

        const { data, error } = await supabase
            .from("todos")
            .update({ title: trimmed })
            .eq("id", todo.id)
            .select()
            .single();

        if (error) {
            alert(error.message);
            return;
        }

        setTodos((prev) => prev.map((t) => (t.id === todo.id ? (data as Todo) : t)));
    }

    async function deleteTodo(todo: Todo) {
        const { error } = await supabase.from("todos").delete().eq("id", todo.id);
        if (error) {
            alert(error.message);
            return;
        }
        setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    }

    return (
        <main className="max-w-4xl mx-auto my-10 p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Todos</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Welcome, {userName}!</p>
                    <Link href="/protected" className="inline-block mt-2 px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-600 transition-all duration-200">Open Protected Page</Link>
                </div>
                <button onClick={() => supabase.auth.signOut()} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200">Sign out</button>
            </header>

            <form onSubmit={addTodo} className="flex gap-3 mb-6">
                <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Add a new todo..."
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-200"
                />
                <button type="submit" className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200">+ Add Todo</button>
            </form>

            <ul className="space-y-2">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md"
                    >
                        <input
                            type="checkbox"
                            checked={todo.is_complete}
                            onChange={() => toggleComplete(todo)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-700 transition-all duration-200"
                        />
                        <input
                            defaultValue={todo.title}
                            onBlur={(e) => renameTodo(todo, e.currentTarget.value)}
                            className={`flex-1 bg-transparent text-gray-800 dark:text-white ${todo.is_complete ? 'line-through text-gray-500' : ''} transition-all duration-200`}
                            aria-label="Edit title"
                        />
                        <button onClick={() => deleteTodo(todo)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200" aria-label="Delete">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
}