import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export default async function PrivatePage() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-black mb-4">Hello {data.user.email}</h1>
                <h2 className="text-xl text-gray-600">This is a protected page and only accessible to logged in users.</h2>
            </div>
        </div>
    )
}