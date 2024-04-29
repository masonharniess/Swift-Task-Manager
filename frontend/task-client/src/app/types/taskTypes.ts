// taskTypes.ts

export interface Task {
    id: string;
    name: string;
    isCompleted: boolean;
    isArchived: boolean;
}

export interface TaskItemProps {
    task: Task;
    toggleTaskCompletion: (task: Task) => void;
    // onDeleteTask: (taskId: string) => void;
    onEditTask: (taskId: string, newName: string) => void;
    onArchiveTask: (taskId: string) => void;
    onUnarchiveTask: (taskId: string) => void;
}

export interface TaskListProps {
    tasks: Task[];
    fetchTasks: () => Promise<void>;
}