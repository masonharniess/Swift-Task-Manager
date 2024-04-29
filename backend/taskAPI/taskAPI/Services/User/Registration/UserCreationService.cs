// UserCreationService.cs

using taskAPI.Models.DTOs;
using taskAPI.Models.Model;
using taskAPI.Repositories;
using taskAPI.Services.User.Password;

namespace taskAPI.Services.User.Registration;

public class UserCreationService : IUserCreationService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHashingService _passwordHashingService;

    public UserCreationService(IUserRepository userRepository, IPasswordHashingService passwordHashingService)
    {
        _userRepository = userRepository;
        _passwordHashingService = passwordHashingService;
    }
    
    public async Task<bool> RegisterUserAsync(RegistrationDTO registrationDto)
    {
        if (await _userRepository.UserExistsAsync(registrationDto.Email))
        {
            return false; // User already exists
        }
        
        string hashedPassword = _passwordHashingService.HashPassword(registrationDto.Password);

        UserModel userDto = new UserModel
        {
            Email = registrationDto.Email,
            Password = hashedPassword,
            FirstName = registrationDto.FirstName,
            LastName = registrationDto.LastName
        };

        await _userRepository.AddUserAsync(userDto);

        return true;
    }
}