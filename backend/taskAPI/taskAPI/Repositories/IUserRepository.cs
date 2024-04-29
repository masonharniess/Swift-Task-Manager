// IUserRepository.cs

using taskAPI.Models.Model;

namespace taskAPI.Repositories;

public interface IUserRepository
{
    Task<bool> UserExistsAsync(string email);
    Task AddUserAsync(UserModel userModel);
    Task<UserModel> GetUserByEmailAsync(string email);
}