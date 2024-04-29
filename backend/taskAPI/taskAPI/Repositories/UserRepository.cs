// UserRepository.cs

using Microsoft.EntityFrameworkCore;
using taskAPI.Data;
using taskAPI.Entities;
using taskAPI.Models.Model;

namespace taskAPI.Repositories;

public class UserRepository : IUserRepository
{
    private readonly TaskContext _context;

    public UserRepository(TaskContext context)
    {
        _context = context;
    }

    public async Task<bool> UserExistsAsync(string email)
    {
        return await _context.Users.AnyAsync(u => u.Email == email);
    }

    public async Task AddUserAsync(UserModel userModel)
    {
        User user = new User
        {
            Id = userModel.Id,
            Email = userModel.Email,
            FirstName = userModel.FirstName,
            LastName = userModel.LastName,
            Password = userModel.Password
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }
    
    public async Task<UserModel> GetUserByEmailAsync(string email)
    {
        User? user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) return null;

        return new UserModel
        {
            Id = user.Id,
            Email = user.Email,
            Password = user.Password,
            FirstName = user.FirstName,
            LastName = user.LastName
        };
    }
}