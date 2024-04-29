// PasswordHashingService.cs

using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace taskAPI.Services.User.Password;

public class PasswordHashingService : IPasswordHashingService
{
    private const int SaltSize = 128 / 8;
    private const int HashSize = 256 / 8;
    private const int IterationCount = 100000;
    
    public string HashPassword(string password)
    {
        byte[] salt = GenerateSalt(SaltSize);
        string hashed = Hash(password, salt, IterationCount, HashSize);
        return $"{Convert.ToBase64String(salt)}.{hashed}";
    }
    
    public bool VerifyPasswordHash(string hashedPasswordWithSalt, string passwordToCheck)
    {
        string[] parts = hashedPasswordWithSalt.Split('.', 2);
        if (parts.Length != 2)
        {
            throw new FormatException("The stored password is not in the expected format.");
        }

        byte[] salt = Convert.FromBase64String(parts[0]);
        string storedHash = parts[1];
        string hashed = Hash(passwordToCheck, salt, IterationCount, HashSize);
        
        return hashed == storedHash;
    }
    
    private byte[] GenerateSalt(int size)
    {
        byte[] salt = new byte[size];
        using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }
        return salt;
    }
    
    private string Hash(string password, byte[] salt, int iterationCount, int numBytesRequested)
    {
        return Convert.ToBase64String(KeyDerivation.Pbkdf2
            (
                password: password, 
                salt: salt, 
                prf: KeyDerivationPrf.HMACSHA256, 
                iterationCount: iterationCount, 
                numBytesRequested: numBytesRequested
            )
        );
    }
}