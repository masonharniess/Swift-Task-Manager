// TaskList.tsx

import React, { useState, useEffect, useRef } from 'react';
import styles from './TaskList.module.css';
import Image from 'next/image';
import {updateTaskCompletion, createTask, deleteTask, updateTaskName, archiveTask, unarchiveTask} from '@/app/services/taskService';
import { Task, TaskListProps } from '@/app/types/taskTypes';
import { TaskItem } from '@/app/components/layout/TasksSidebar/TaskItem/TaskItem';
import { useSidebar } from '@/app/contexts/SidebarContext';

const TaskList: React.FC<TaskListProps> = ({ tasks, fetchTasks }) => {
    const [newTaskName, setNewTaskName] = useState('');
    const [showNewTaskInput, setShowNewTaskInput] = useState(false);
    const [showCompletedTasks, setShowCompletedTasks] = useState<boolean | null>(null);
    const [showArchivedTasks, setShowArchivedTasks] = useState<boolean>(true);
    const [showCompletedCaretTooltip, setShowCompletedCaretTooltip] = useState(false);
    const [showArchivedCaretTooltip, setShowArchivedCaretTooltip] = useState(false);

    const [showSortTooltip, setShowSortTooltip] = useState(false);
    const [showFilterTooltip, setShowFilterTooltip] = useState(false);
    const [showAddTooltip, setShowAddTooltip] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const { isSidebarOpen } = useSidebar();

    const refreshTasks = async () => {
        try {
            await fetchTasks();
        } catch (error) {
            console.error('Failed to refresh tasks:', error);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        await deleteTask(taskId);
        await refreshTasks();
    };

    const handleEditTask = async (taskId: string, newName: string) => {
        try {
            await updateTaskName(taskId, newName);
            await fetchTasks();
        } catch (error) {
            console.error('Failed to edit task name:', error);
        }
    };

    const toggleTaskCompletion = async (task: Task) => {
        await updateTaskCompletion(task.id, !task.isCompleted);
        await refreshTasks();
    };

    const handleAddTask = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTaskName.trim()) {
            await createTask(newTaskName);
            setNewTaskName('');
            await refreshTasks();
        }
    };

    const handleInputBlur = async () => {
        if (newTaskName.trim()) {
            await createTask(newTaskName);
            setNewTaskName('');
            await refreshTasks();
        }
        setShowNewTaskInput(false);
    };


    const handleArchiveTask = async (taskId: string) => {
        try {
            await archiveTask(taskId);
            fetchTasks();
        } catch (error) {
            console.error('Failed to archive task:', error);
        }
    };

    const handleUnarchiveTask = async (taskId: string) => {
        try {
            await unarchiveTask(taskId);
            fetchTasks();
        } catch (error) {
            console.error('Failed to archive task:', error);
        }
    };


    useEffect(() => {
        const savedShowCompletedTasks = JSON.parse(localStorage.getItem('showCompletedTasks') || 'true');
        setShowCompletedTasks(savedShowCompletedTasks)
        ;

        if (showNewTaskInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showNewTaskInput]);

    const toggleShowCompletedTasks = () => {
        const newShowCompletedTasks = !showCompletedTasks;
        setShowCompletedTasks(newShowCompletedTasks);
        localStorage.setItem('showCompletedTasks', JSON.stringify(newShowCompletedTasks));
    };

    const toggleShowArchivedTasks = () => setShowArchivedTasks(!showArchivedTasks);

    const ongoingTasks = tasks.filter(task => !task.isCompleted && !task.isArchived);
    const completedTasks = tasks.filter(task => task.isCompleted && !task.isArchived);
    const archivedTasks = tasks.filter(task => task.isArchived);
    const hasTasks = ongoingTasks.length > 0 || completedTasks.length > 0 || archivedTasks.length > 0;
    const showPadding = hasTasks || showNewTaskInput;
    const hasOngoingTasksOrInputShown = ongoingTasks.length > 0 || showNewTaskInput;
    const hasCompletedTasks = completedTasks.length > 0;
    const hasArchivedTasks = archivedTasks.length > 0;

    return (
        <aside className={`${styles.taskListColumn} ${isSidebarOpen ? styles.taskListShifted : ''}`}>

            <div className={styles.currentTasksHeader}>
                <div className={styles.taskSectionTitle}>
                    ONGOING TASKS ({ongoingTasks.length})
                </div>

                <ul className={styles.headerButtonsWrapper}>
                    <li className={styles.headerButtons}
                        onMouseEnter={() => setShowSortTooltip(true)}
                        onMouseLeave={() => setShowSortTooltip(false)}>
                        <Image priority src="/icons/sort.svg" alt="Sort" width={20} height={20}/>
                        {showSortTooltip && <div className={styles.tooltip}>Sort tasks</div>}
                    </li>
                    <li className={styles.headerButtons}
                        onMouseEnter={() => setShowFilterTooltip(true)}
                        onMouseLeave={() => setShowFilterTooltip(false)}>
                        <Image priority src="/icons/filter.svg" alt="Filter" width={20} height={20}/>
                        {showFilterTooltip && <div className={styles.tooltip}>Filter tasks</div>}
                    </li>
                    <li className={styles.headerButtons}
                        onClick={() => setShowNewTaskInput(true)}
                        onMouseEnter={() => setShowAddTooltip(true)}
                        onMouseLeave={() => setShowAddTooltip(false)}>
                        <Image priority src="/icons/plus.svg" alt="Add" width={20} height={20}/>
                        {showAddTooltip && <div className={styles.tooltip}>Create task</div>}
                    </li>
                </ul>
            </div>

            <ul className={`${styles.taskList} ${!hasOngoingTasksOrInputShown ? styles.noTasksPadding : ''}`}>
                {ongoingTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        toggleTaskCompletion={toggleTaskCompletion}
                        onArchiveTask={handleArchiveTask}
                        onUnarchiveTask={handleUnarchiveTask}
                        onEditTask={handleEditTask}
                    />
                ))}

                {showNewTaskInput && (
                    <input
                        ref={inputRef}
                        className={styles.newTaskInput}
                        type="text"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        placeholder="New task"
                        onKeyPress={handleAddTask}
                        onBlur={handleInputBlur}
                    />
                )}
            </ul>

            <div className={styles.completedTasksHeader} onClick={toggleShowCompletedTasks}>

                <div className={styles.taskSectionTitle}>
                    COMPLETED ({completedTasks.length})
                </div>

                <ul className={styles.headerButtonsWrapper}>
                    <li className={styles.headerButtons}>
                        <div onMouseEnter={() => setShowCompletedCaretTooltip(true)}
                             onMouseLeave={() => setShowCompletedCaretTooltip(false)}>
                            <Image
                                priority
                                src={showCompletedTasks ? "/icons/caret-down.svg" : "/icons/caret-right.svg"}
                                alt="Caret"
                                width={20}
                                height={20}
                            />
                            {showCompletedCaretTooltip && <div className={styles.tooltip}>Toggle completed tasks</div>}
                        </div>

                    </li>

                </ul>
            </div>

            {showCompletedTasks && (
                <ul className={`${styles.taskList} ${!hasCompletedTasks ? styles.noTasksPadding : ''}`}>
                    {completedTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            toggleTaskCompletion={toggleTaskCompletion}
                            onArchiveTask={handleArchiveTask}
                            onUnarchiveTask={handleUnarchiveTask}
                            onEditTask={handleEditTask}

                        />
                    ))}
                </ul>
            )}

            <div className={`${styles.archivedTasksHeader} ${!showCompletedTasks ? styles.archivedHeaderMargin : ''}`}
                 onClick={toggleShowArchivedTasks}>

                <div className={styles.taskSectionTitle}>
                    ARCHIVED ({archivedTasks.length})
                </div>
                <ul className={styles.headerButtonsWrapper}>
                    <li className={styles.headerButtons}>
                        <div onMouseEnter={() => setShowArchivedCaretTooltip(true)}
                             onMouseLeave={() => setShowArchivedCaretTooltip(false)}>
                            <Image
                                priority
                                src={showArchivedTasks ? "/icons/caret-down.svg" : "/icons/caret-right.svg"}
                                alt="Caret"
                                width={20}
                                height={20}
                            />
                            {showArchivedCaretTooltip && <div className={styles.tooltip}>Toggle archived tasks</div>}
                        </div>
                    </li>
                </ul>
            </div>

            {showArchivedTasks && (
                <ul className={`${styles.taskList} ${!hasArchivedTasks ? styles.noTasksPadding : ''}`}>
                    {archivedTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            toggleTaskCompletion={toggleTaskCompletion}
                            onArchiveTask={handleArchiveTask}
                            onUnarchiveTask={handleUnarchiveTask}
                            onEditTask={handleEditTask}
                        />
                    ))}
                </ul>
            )}


        </aside>
    );
};

export default TaskList;