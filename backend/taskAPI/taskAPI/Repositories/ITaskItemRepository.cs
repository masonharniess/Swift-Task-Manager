// ITaskRepository

using taskAPI.Entities;

namespace taskAPI.Repositories;

public interface ITaskItemRepository
{
    Task<IEnumerable<TaskItem>> GetTaskItemsByUserIdAsync(Guid userId);
    Task<TaskItem> GetTaskItemsByIdAsync(Guid taskItemId);
    Task AddTaskItemAsync(TaskItem taskItem);
    Task UpdateTaskItemAsync(TaskItem taskItem);
    Task DeleteTaskItemAsync(Guid taskItemId);
}