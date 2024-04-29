// Program.cs

using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using taskAPI.Data;
using taskAPI.Repositories;
using taskAPI.Services.Authentication;
using taskAPI.Services.TaskItem;
using taskAPI.Services.User.Password;
using taskAPI.Services.User.Registration;
using taskAPI.Services.User.Login;

namespace taskAPI;

public class Program
{
    public static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
        
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"])),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true, 
                    ClockSkew = TimeSpan.Zero
                };
            });
        
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("MyCorsPolicy", policy =>
            {
                policy.WithOrigins("http://localhost:3000") 
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });
        builder.Services.AddControllers().AddNewtonsoftJson();
        
        builder.Services.AddDbContext<TaskContext>(opt 
            => opt.UseSqlite(builder.Configuration["ConnectionStrings:DefaultConnection"]));
        
        builder.Services.AddScoped<IPasswordHashingService, PasswordHashingService>();
        builder.Services.AddScoped<IUserCreationService, UserCreationService>(); 
        builder.Services.AddScoped<IUserLoginService, UserLoginService>();
        builder.Services.AddScoped<IUserRepository, UserRepository>(); 
        builder.Services.AddScoped<IJwtTokenService, JwtTokenService>(); 
        builder.Services.AddScoped<ITaskItemRepository, TaskItemRepository>();
        builder.Services.AddScoped<ITaskItemService, TaskItemService>();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        
        WebApplication app = builder.Build();
        
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        
        app.UseCors("MyCorsPolicy");;

        app.UseHttpsRedirection();

        app.MapControllers();
        
        try
        {
            MigrateDb.InitDb(app);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

        app.Run();
    }
}