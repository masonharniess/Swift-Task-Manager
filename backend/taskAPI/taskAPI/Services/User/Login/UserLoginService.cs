// UserLoginService.cs

using taskAPI.Models.Model;
using taskAPI.Repositories;
using taskAPI.Services.User.Password;

namespace taskAPI.Services.User.Login;

public class UserLoginService : IUserLoginService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHashingService _passwordHashingService;

    public UserLoginService(IUserRepository userRepository, IPasswordHashingService passwordHashingService)
    {
        _userRepository = userRepository;
        _passwordHashingService = passwordHashingService;
    }

    public async Task<UserModel?> ValidateUserAsync(LoginDTO loginDto)
    {
        UserModel? user = await _userRepository.GetUserByEmailAsync(loginDto.Email);
        if (user == null || !_passwordHashingService.VerifyPasswordHash(user.Password, loginDto.Password))
        {
            return null; // User not found or password does not match
        }

        return user; // Return the user model if validation is successful
    }
}