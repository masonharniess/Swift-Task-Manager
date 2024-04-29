// IUserCreationService.cs

using taskAPI.Models.DTOs;

namespace taskAPI.Services.User.Registration;

public interface IUserCreationService
{
    Task<bool> RegisterUserAsync(RegistrationDTO registrationDto);
}