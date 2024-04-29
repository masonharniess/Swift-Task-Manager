// MigrateDb.cs

using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace taskAPI.Data;

public class MigrateDb
{
    public static void InitDb(WebApplication app)
    {
        int retry = 10;

        while (retry > 0)
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
                retry -= 1;
                Console.WriteLine("Sqlite connection failed. Attempting to connect in 5 seconds. Retries left: " + retry);
                Thread.Sleep(5000);
            }
        }
    }
}