// tasks/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/app/services/authService";
import dynamic from 'next/dynamic';
import { fetchTasks as fetchTasksService } from "@/app/services/taskService";
import { SidebarProvider } from '@/app/contexts/SidebarContext';

const NavBar = dynamic(() => import('@/app/components/layout/NavBar/NavBar'), { ssr: false });
const Sidebar = dynamic(() => import('@/app/components/layout/Sidebar/Sidebar'), { ssr: false });
const TaskList = dynamic(() => import('@/app/components/layout/TasksSidebar/TaskList'), { ssr: false });

const TasksPage = () => {
    const router = useRouter();
    const [tasks, setTasks] = useState([]);
    const [clientSide, setClientSide] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setClientSide(true);
            if (!isAuthenticated()) {
                router.push('/login');
            } else {
                fetchTasks();
            }
        }
    }, [router]);

    const fetchTasks = async () => {
        try {
            const fetchedTasks = await fetchTasksService();
            setTasks(fetchedTasks);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    if (!clientSide) {
        return null;
    }

    return (
        <SidebarProvider>
            <>
                <NavBar />
                <Sidebar />
                <TaskList tasks={tasks} fetchTasks={fetchTasks} />
            </>
        </SidebarProvider>
    );
};

export default TasksPage;