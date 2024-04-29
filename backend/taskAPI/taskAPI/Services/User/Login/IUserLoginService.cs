// IUserLoginService

using taskAPI.Models.Model;

namespace taskAPI.Services.User.Login;

public interface IUserLoginService
{
     Task<UserModel?> ValidateUserAsync(LoginDTO loginDto);
}