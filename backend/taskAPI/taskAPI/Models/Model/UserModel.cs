// UserModel.cs

namespace taskAPI.Models.Model;

public class UserModel
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    
    public string FirstName { get; set; }
    public string LastName { get; set; }
}