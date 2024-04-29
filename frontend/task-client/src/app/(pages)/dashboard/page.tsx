// dashboard/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { isAuthenticated } from '@/app/services/authService';
import {SidebarProvider} from "@/app/contexts/SidebarContext";
import {fetchTasks, fetchTasks as fetchTasksService} from "@/app/services/taskService";


const Sidebar = dynamic(() => import('@/app/components/layout/Sidebar/Sidebar'), { ssr: false });
const NavBar = dynamic(() => import('@/app/components/layout/NavBar/NavBar'), { ssr: false });
const TaskList = dynamic(() => import('@/app/components/layout/TasksSidebar/TaskList'), { ssr: false });

const DashboardPage = () => {

    const router = useRouter();
    const [tasks, setTasks] = useState([]);
    const [clientSide, setClientSide] = useState(false);
    const [isTaskListVisible, setIsTaskListVisible] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setClientSide(true);
            if (!isAuthenticated()) {
                router.push('/login');
            } else {
                fetchTasks()
            }
        }
    }, [router]);

    const toggleTaskListVisibility = () => {
        setIsTaskListVisible(!isTaskListVisible);
    };


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
                <Sidebar onTasksButtonClick={toggleTaskListVisibility} />
                {isTaskListVisible && <TaskList tasks={tasks} fetchTasks={fetchTasks} />}
            </>
        </SidebarProvider>
    );
};

export default DashboardPage;