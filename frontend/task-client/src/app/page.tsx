// app/page.tsx

'use client'

import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";
import {isAuthenticated} from "@/app/services/authService";

const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!isAuthenticated()) {
                router.push('/login');
            }
            else {
                router.push('/dashboard')
            }
        }
    }, [router]);

    return null;
}

export default HomePage;