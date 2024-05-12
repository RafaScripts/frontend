"use server";
import { cookies } from 'next/headers'

export default async function getterToken() {
    const cookieStore = cookies()
    const token = cookieStore.get('next-auth.session-token')
    return token;
}