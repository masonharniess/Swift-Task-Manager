// TaskItem.tsx

import React, { useState } from 'react';
import styles from './TaskItem.module.css';
import Image from 'next/image';
import { TaskItemProps } from '@/app/types/taskTypes';

export const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTaskCompletion, onArchiveTask, onUnarchiveTask,  onEditTask }) => {
    const [isTaskHovered, setIsTaskHovered] = useState(false);
    const [showEditTooltip, setShowEditTooltip] = useState(false);
    const [showArchiveTooltip, setShowArchiveTooltip] = useState(false);
    const [isCheckIconHovered, setIsCheckIconHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(task.name);

    const archiveAction = task.isArchived ? onUnarchiveTask : onArchiveTask;
    const archiveIconSrc = task.isArchived ? "/icons/unarchive.svg" : "/icons/archive.svg";
    const archiveAltText = task.isArchived ? "Unarchive" : "Archive";
    const tooltipText = task.isArchived ? "Unarchive task" : "Archive task";
    const taskNameClass = task.isArchived ? `${styles.taskName} ${styles.archivedTaskName}` : styles.taskName;
    const checkIconClass = task.isArchived ? `${styles.checkIcon} ${styles.archivedCheckIcon}` : styles.checkIcon;


    let iconSrc;
    if (task.isArchived) {
        iconSrc = task.isCompleted ? '/icons/check-done-archived.svg' : '/icons/check-pending-archived.svg';
    } else {
        iconSrc = task.isCompleted ? '/icons/check-done-fill.svg' : '/icons/check-pending.svg';
    }

    if (isCheckIconHovered) {
        iconSrc = '/icons/check-hovered.svg';
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    };


    const finishEditing = () => {
        onEditTask(task.id, editedName);
        setIsEditing(false);
    };

    return (
        <li className={styles.task} onMouseEnter={() => setIsTaskHovered(true)}
            onMouseLeave={() => setIsTaskHovered(false)}>
            <div className={styles.taskContent}>
                <div
                    className={checkIconClass}
                    onClick={() => toggleTaskCompletion(task)}
                    onMouseEnter={() => setIsCheckIconHovered(true)}
                    onMouseLeave={() => setIsCheckIconHovered(false)}>
                    <Image priority src={iconSrc} alt="Check Box Icon" width={18} height={18}/>
                </div>
                {isEditing ? (
                    <input
                        className={styles.taskNameEdit}
                        value={editedName}
                        onChange={handleEditChange}
                        onBlur={finishEditing}
                        onKeyPress={(e) => e.key === 'Enter' && finishEditing()}
                        autoFocus
                    />
                ) : (
                    <div className={taskNameClass}>{task.name}</div>
                )}
            </div>
            {isTaskHovered && (
                <div className={styles.taskButtons}>
                    <div
                        className={`${styles.editIcon} ${styles.iconContainer}`}
                        onClick={handleEditClick}
                        onMouseEnter={() => setShowEditTooltip(true)}
                        onMouseLeave={() => setShowEditTooltip(false)}
                    >
                        <Image priority src="/icons/edit-name.svg" alt="Edit" width={18} height={18} />
                        {showEditTooltip && <div className={styles.tooltip}>Edit task name</div>}
                    </div>
                    <div
                        className={`${styles.archiveIcon} ${styles.iconContainer}`}
                        onClick={() => archiveAction(task.id)}
                        onMouseEnter={() => setShowArchiveTooltip(true)}
                        onMouseLeave={() => setShowArchiveTooltip(false)}
                    >
                        <Image priority src={archiveIconSrc} alt={archiveAltText} width={18} height={18} />
                        {showArchiveTooltip && <div className={styles.tooltip}>{tooltipText}</div>}
                    </div>
                </div>
            )}
        </li>
    );
};
