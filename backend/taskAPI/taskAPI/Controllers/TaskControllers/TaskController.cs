// TaskController.cs

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using taskAPI.Models.DTOs;
using taskAPI.Services.TaskItem;
using Microsoft.AspNetCore.Mvc;
using taskAPI.Entities;

namespace taskAPI.Controllers.TaskControllers;

[Route("api")]
[ApiController]
[Authorize]
public class TaskController : BaseController
{
    private readonly ITaskItemService _taskItemService;

    public TaskController(ITaskItemService taskItemService)
    {
        _taskItemService = taskItemService;
    }
    
    [HttpGet("tasks")]
    public async Task<IActionResult> GetTasks()
    {
        Guid userId = GetCurrentUserId();
        IEnumerable<TaskItem> tasks = await _taskItemService.GetTaskItemsForUserAsync(userId);
        return Ok(tasks);
    }

    [HttpPost("task")]
    public async Task<IActionResult> CreateTask([FromBody] TaskCreateDTO taskDto)
    {
        Guid userId = GetCurrentUserId();
        TaskItem newTask = await _taskItemService.CreateTaskItemsAsync(userId, taskDto);
        return CreatedAtAction(nameof(GetTaskById), new { taskItemId = newTask.Id }, newTask);
    }

    [HttpGet("task/{taskItemId}")]
    public async Task<IActionResult> GetTaskById(Guid taskItemId)
    {
        Guid userId = GetCurrentUserId(); 
        TaskItem? task = await _taskItemService.GetTaskItemsByIdAsync(taskItemId, userId);
        
        if (task == null)
        {
            return NotFound();
        }
        
        return Ok(task);
    }

    [HttpPut("task/{taskItemId}")]
    public async Task<IActionResult> UpdateTask(Guid taskItemId, [FromBody] TaskUpdateDTO taskDto)
    {
        Guid userId = GetCurrentUserId(); 
        try
        {
            await _taskItemService.UpdateTaskItemAsync(taskItemId, taskDto, userId);
            return NoContent(); 
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
        catch (UnauthorizedAccessException)
        {
            return Unauthorized("Access denied.");
        }
    }
    
    [HttpPatch("task/{taskItemId}")]
    public async Task<IActionResult> PatchTask(Guid taskItemId, [FromBody] JsonPatchDocument<TaskUpdateDTO> patchDoc)
    {
        if (patchDoc == null)
        {
            return BadRequest("Patch document is empty");
        }

        Guid userId = GetCurrentUserId(); 
        try
        {
            TaskItem? taskToUpdate = await _taskItemService.GetTaskItemsByIdAsync(taskItemId, userId);
            if (taskToUpdate == null)
            {
                return NotFound();
            }

            TaskUpdateDTO taskDto = new TaskUpdateDTO 
            { 
                Name = taskToUpdate.Name, 
                IsCompleted = taskToUpdate.IsCompleted, 
                IsArchived = taskToUpdate.IsArchived
            };
            patchDoc.ApplyTo(taskDto); 

            await _taskItemService.UpdateTaskItemAsync(taskItemId, taskDto, userId);
            return NoContent(); 
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
        catch (UnauthorizedAccessException)
        {
            return Unauthorized("Access denied.");
        }
    }

    [HttpDelete("task/{taskItemId}")]
    public async Task<IActionResult> DeleteTask(Guid taskItemId)
    {
        Guid userId = GetCurrentUserId();
        try
        {
            await _taskItemService.DeleteTaskItemAsync(taskItemId, userId);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
        catch (UnauthorizedAccessException)
        {
            return Unauthorized("Access denied.");
        }
    }
}