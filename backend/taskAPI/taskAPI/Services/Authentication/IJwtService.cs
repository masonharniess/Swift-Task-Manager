// IJwtService.cs

using taskAPI.Models.Model;

namespace taskAPI.Services.Authentication;

public interface IJwtTokenService
{
    string GenerateJwtToken(UserModel user);
}