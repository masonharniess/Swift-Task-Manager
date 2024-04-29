// BaseController.cs

using Microsoft.AspNetCore.Mvc;
using taskAPI.Services.Authentication;

namespace taskAPI.Controllers;

public abstract class BaseController : ControllerBase
{
    protected Guid GetCurrentUserId()
    {
        string? userIdClaim = User.FindFirst(CustomClaimTypes.UserId)?.Value;
        if (!string.IsNullOrEmpty(userIdClaim) && Guid.TryParse(userIdClaim, out Guid userId))
        {
            return userId;
        }
        else
        {
            throw new UnauthorizedAccessException("User ID is not valid.");
        }
    }
}
