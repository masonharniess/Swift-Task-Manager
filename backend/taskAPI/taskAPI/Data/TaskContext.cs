// TaskContext.cs

using Microsoft.EntityFrameworkCore;
using taskAPI.Entities;

namespace taskAPI.Data;

public class TaskContext : DbContext
{
    public TaskContext(DbContextOptions<TaskContext> options) : base(options) {}
    
    public DbSet<User> Users { get; set; }
    public DbSet<TaskItem> TaskItems { get; set; }
}