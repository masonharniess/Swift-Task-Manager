// ITaskItemService.cs

using taskAPI.Models.DTOs;

namespace taskAPI.Services.TaskItem;

public interface ITaskItemService
{
    Task<IEnumerable<Entities.TaskItem>> GetTaskItemsForUserAsync(Guid userId);
    Task<Entities.TaskItem> CreateTaskItemsAsync(Guid userId, TaskCreateDTO taskDto);
    Task UpdateTaskItemAsync(Guid taskItemId, TaskUpdateDTO taskDto, Guid userId);
    Task DeleteTaskItemAsync(Guid taskItemId, Guid userId); 
    Task<Entities.TaskItem> GetTaskItemsByIdAsync(Guid taskItemId, Guid userId);

}