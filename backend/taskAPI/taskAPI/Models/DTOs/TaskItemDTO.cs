// TaskItemDTO.cs

namespace taskAPI.Models.DTOs;

public class TaskCreateDTO
{
    public string Name { get; set; }
}

public class TaskUpdateDTO
{
    public string Name { get; set; }
    public bool IsCompleted { get; set; }
    
    public bool IsArchived { get; set; }
}