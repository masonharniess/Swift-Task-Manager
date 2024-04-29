// TaskItemService.cs

using taskAPI.Models.DTOs;
using taskAPI.Repositories;

namespace taskAPI.Services.TaskItem;

public class TaskItemService : ITaskItemService
{
    private readonly ITaskItemRepository _taskItemRepository;

    public TaskItemService(ITaskItemRepository taskItemRepository)
    {
        _taskItemRepository = taskItemRepository;
    }

    public async Task<IEnumerable<Entities.TaskItem>> GetTaskItemsForUserAsync(Guid userId)
    {
        return await _taskItemRepository.GetTaskItemsByUserIdAsync(userId);
    }

    public async Task<Entities.TaskItem> CreateTaskItemsAsync(Guid userId, TaskCreateDTO taskItemDto)
    {
        Entities.TaskItem taskItem = new Entities.TaskItem
        {
            Id = Guid.NewGuid(),
            Name = taskItemDto.Name,
            IsCompleted = false,
            IsArchived = false,
            UserId = userId
        };

        await _taskItemRepository.AddTaskItemAsync(taskItem);
        return taskItem;
    }
    
    public async Task UpdateTaskItemAsync(Guid taskItemId, TaskUpdateDTO taskDto, Guid userId)
    {
        Entities.TaskItem? existingTask = await _taskItemRepository.GetTaskItemsByIdAsync(taskItemId);
        if (existingTask == null)
        {
            throw new KeyNotFoundException("Task not found.");
        }
        
        if (existingTask.UserId != userId)
        {
            throw new UnauthorizedAccessException("User does not have permission for this task.");
        }
        
        existingTask.Name = taskDto.Name;
        existingTask.IsCompleted = taskDto.IsCompleted;
        existingTask.IsArchived = taskDto.IsArchived;
        await _taskItemRepository.UpdateTaskItemAsync(existingTask);
    }

    public async Task DeleteTaskItemAsync(Guid taskItemId, Guid userId)
    {
        Entities.TaskItem? taskItem = await _taskItemRepository.GetTaskItemsByIdAsync(taskItemId);
        if (taskItem == null)
        {
            throw new KeyNotFoundException("Task not found.");
        }

        if (taskItem.UserId != userId)
        {
            throw new UnauthorizedAccessException("User does not have permission for this task.");
        }

        await _taskItemRepository.DeleteTaskItemAsync(taskItemId);
    }

    public async Task<Entities.TaskItem> GetTaskItemsByIdAsync(Guid taskItemId, Guid userId)
    {
        Entities.TaskItem? taskItem = await _taskItemRepository.GetTaskItemsByIdAsync(taskItemId);
        if (taskItem == null || taskItem.UserId != userId)
        {
            throw new UnauthorizedAccessException("User does not have permission for this task.");
        }

        return taskItem;
    }
    

}