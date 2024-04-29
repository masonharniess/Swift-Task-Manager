// IPasswordHashingService.cs

namespace taskAPI.Services.User.Password;

public interface IPasswordHashingService
{
    string HashPassword(string password);
    bool VerifyPasswordHash(string password, string passwordHash);
}