// TaskItemRepository.cs

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using taskAPI.Data;
using taskAPI.Entities;

namespace taskAPI.Repositories;

public class TaskItemRepository : ITaskItemRepository
{
    private readonly TaskContext _context;

    public TaskItemRepository(TaskContext context)
    {
        _context = context;
    }

    public async Task AddTaskItemAsync(TaskItem taskItem)
    {
        _context.TaskItems.Add(taskItem);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteTaskItemAsync(Guid taskItemId)
    {
        TaskItem? taskItem = await _context.TaskItems.FindAsync(taskItemId);
        if (taskItem != null)
        {
            _context.TaskItems.Remove(taskItem);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<TaskItem> GetTaskItemsByIdAsync(Guid taskItemId)
    {
        return await _context.TaskItems
            .FirstOrDefaultAsync(t => t.Id == taskItemId);
    }

    public async Task<IEnumerable<TaskItem>> GetTaskItemsByUserIdAsync(Guid userId)
    {
        return await _context.TaskItems
            .Where(t => t.UserId == userId)
            .ToListAsync();
    }

    public async Task UpdateTaskItemAsync(TaskItem taskItem)
    {
        _context.TaskItems.Update(taskItem);
        await _context.SaveChangesAsync();
    }
}
