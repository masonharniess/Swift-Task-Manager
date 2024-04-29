// projects/page.tsx

'use client';

import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";
import {isAuthenticated} from "@/app/services/authService";
import NavBar from "@/app/components/layout/NavBar/NavBar";
import Sidebar from "@/app/components/layout/Sidebar/Sidebar";

const ProjectsPage = () => {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
        }
    }, [router]);

    if (!isAuthenticated()) {
        return null; // or return <LoadingIndicator />;
    }

    return (
        <>
            <NavBar/>
            <Sidebar/>
        </>
    );
};

export default ProjectsPage;
