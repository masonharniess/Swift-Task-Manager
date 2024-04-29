// TaskItem.cs

namespace taskAPI.Entities;

public class TaskItem
{
    public Guid Id { get; set; }
    
    public string Name { get; set; }
    public bool IsCompleted { get; set; }
    
    public bool IsArchived { get; set; }
    
    public Guid UserId { get; set; }
    
    public User User { get; set; }
}