// MigrateDb.cs

using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace taskAPI.Data;

public class MigrateDb
{
    public static void InitDb(WebApplication app)
    {
        int reattempt = 5;

        while (reattempt > 0)
        {
            try
            {
                using IServiceScope scope = app.Services.CreateScope();
                TaskContext? dbContext = scope.ServiceProvider.GetService<TaskContext>();
                dbContext?.Database.Migrate();
                dbContext?.Database.EnsureCreated();
                break;
            }
            catch (SqliteException e)
            {
                reattempt -= 1;
                Console.WriteLine("Sqlite connection failed. Reattempts left: " + reattempt);
                Thread.Sleep(3000);
            }
        }
    }
}